define('Council.Facets.Browse.View', [
    'Council.Model',
    'Council.Categories.View',
    'Categories',
    'Categories.Model',
    'Facets.Browse.View',
    'Facets.Model',
    'Facets.Helper',
    'LiveOrder.Model',
    'Profile.Model',
    'AjaxRequestsKiller',
    'jQuery',
    'Backbone',
    'underscore',
    'Utils'
], function CouncilFacetsBrowseView(
    CouncilModel,
    CouncilCategoriesView,
    Categories,
    CategoriesModel,
    FacetsBrowseView,
    FacetsModel,
    FacetsHelper,
    LiveOrderModel,
    ProfileModel,
    AjaxRequestsKiller,
    jQuery,
    Backbone,
    _
) {
    'use strict';

    var statuses = (window.statuses = {});
    var collapsableElements = (window.collapsable_elements = {});

    _.extend(FacetsBrowseView.prototype, {
        initialize: function initialize(options) {
            var fullurl;
            var url;
            var categoryModel;

            this.options = options;
            this.application = options.application;
            this.statuses = statuses;
            this.collapsable_elements = collapsableElements;
            this.translatorConfig = this.application.translatorConfig;

            fullurl = Backbone.history.fragment;
            url = fullurl.split('?')[0];

            this.categoriesTopLevelUrl = Categories.getTopLevelCategoriesUrlComponent();
            this.isCategoryPage = !!_.find(this.categoriesTopLevelUrl, function findCategoryPage(categoryUrl) {
                var caturl;
                var newCategoryUrl = _.correctURL(categoryUrl);

                caturl = _.correctURL(url);

                return caturl.indexOf(newCategoryUrl) === 0;
            });

            this.model = new FacetsModel();
            this.translator = FacetsHelper.parseUrl(
                fullurl,
                this.translatorConfig,
                this.isCategoryPage
            );
            this.router = this.constructor.router;

            this.setOptionsTranslator();

            this.model.options = {
                data: this.translator.getApiParams(),
                killerId: AjaxRequestsKiller.getKillerId(),
                pageGeneratorPreload: true
            };

            if (this.isCategoryPage) {
                categoryModel = new CategoriesModel();

                categoryModel.options = {
                    data: { fullurl: this.translator.getCategoryUrl() },
                    killerId: AjaxRequestsKiller.getKillerId()
                };

                this.model.set('category', categoryModel);
            }

            this.itemsDisplayOptions = _.deepCopy(
                this.application.getConfig('itemsDisplayOptions')
            );

            this.resultsPerPage = _.deepCopy(this.application.getConfig('resultsPerPage'));
            this.sortOptions = _.deepCopy(this.application.getConfig('sortOptions'));

            _.each(this.resultsPerPage, function eachResultPerPage(perPage) {
                perPage.id = String(perPage.items);
            });

            this.cart = LiveOrderModel.getInstance();

            this.collapsable_elements['facet-header'] = this.collapsable_elements['facet-header'] || {
                selector: 'this.collapsable_elements["facet-header"]',
                collapsed: false
            };
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();
            var self = this;
            var models;
            var categoryModel;
            var councilModel;

            // if prices aren't to be shown we take out price related facet
            // and clean up the url
            if (ProfileModel.getInstance().hidePrices()) {
                this.translator = this.translator.cloneWithoutFacetId('onlinecustomerprice');
            }

            models = [this.model];
            categoryModel = this.model.get('category');

            if (categoryModel) {
                models.push(categoryModel);
                // Define council model and join as model in queue.
                councilModel = new CouncilModel();
                models.push(councilModel);
            }

            jQuery.when
                .apply(null, _.invoke(models, 'fetch', {}))
                .then(function onThen(facetResponseParameter) {
                    var unaliasedUrl;
                    var facetResponse = categoryModel ? facetResponseParameter[0] : facetResponseParameter;

                    if (facetResponse.corrections && facetResponse.corrections.length > 0) {
                        unaliasedUrl = self.router.unaliasUrl(null, facetResponse.corrections);
                        promise.reject();

                        if (SC.ENVIRONMENT.jsEnvironment === 'server') {
                            nsglobal.statusCode = 301;
                            nsglobal.location = '/' + unaliasedUrl;
                        } else {
                            Backbone.history.navigate('#' + unaliasedUrl, { trigger: true });
                        }
                    } else {
                        self.translator.setLabelsFromFacets(self.model.get('facets') || []);
                        if (councilModel && councilModel.get('iscouncil')) {
                            // self.model.set('councilModel', councilModel);
                            self.options.model = self.model;
                            self.options.councilModel = councilModel;
                            _(self).extend(CouncilCategoriesView.prototype);
                            self.constructor.beforeInitialize.executeAllWithContext(self);
                            CouncilCategoriesView.prototype.initialize.call(self);
                        }
                        promise.resolve();
                    }
                })
                .fail(function onFail(jqXhr) {
                    promise.reject();

                    if (jqXhr.status + '' === '404') {
                        self.application.getLayout().notFound();
                    }
                });

            return promise;
        }
    });
});
