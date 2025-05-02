define('Council.Categories.View', [
    'Council.Categories.MarketingSpace.View',
    'Council.Categories.SliderItems.View',

    'council_categories.tpl',
    'council_categories_marketing_spaces_collection.tpl',
    'council_categories_marketing_spaces_cell.tpl',
    'council_categories_marketing_spaces_row.tpl',

    'Council.Categories.Configuration',

    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'Backbone',
    'jQuery',
    'Utils',
    'underscore'
], function CouncilCategoriesView(
    CouncilCategoriesMarketingSpaceView,
    CouncilCategoriesSliderItemsView,

    councilCategoriesTemplate,
    councilCategoriesMarketingSpacesCollectionTemplate,
    councilCategoriesMarketingSpacesCellTemplate,
    councilCategoriesMarketingSpacesRowTemplate,

    Configuration,

    BackboneCompositeView,
    BackboneCollectionView,
    Backbone,
    jQuery,
    Utils,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: councilCategoriesTemplate,

        attributes: {
            'id': 'category-council',
            'class': 'view category-council'
        },

        events: {
            'click [data-section]': 'goToSection'
        },

        initialize: function initialize() {
            var self = this;

            BackboneCompositeView.add(this);

            this.title = _(this.options.councilModel.get('_name')).translate();
            this.page_header = _(this.options.councilModel.get('_name')).translate();

            this.on('afterViewRender', function onAfterViewRender() {
                _(function initBxSlider() {
                    Utils.initBxSlider(self.$('[data-slider]'), {
                        slideMargin: 0,
                        controls: false,
                        auto: true,
                        pause: 5000,
                        useCSS: true,
                        slideWidth: '1500',
                        maxSlides: 1
                    });
                }).defer();
            });
        },

        goToSection: function goToSection(e) {
            var $target = jQuery(e.currentTarget);
            var section = $target.data('section');
            var $anchor = jQuery('[data-section-area="' + section + '"]');
            e.preventDefault();
            jQuery('html, body').stop().animate({
                scrollTop: $anchor.offset().top
            }, 500);
        },

        isProperlyConfigured: function isProperlyConfigured(image) {
            return (image.indexOf(Configuration.councilImageUrl) > -1);
        },

        getSliderItems: function getSliderItems() {
            var model = this.options.councilModel;
            var slider = model.get('_slider');
            var sliderItems = [];
            var self = this;

            _.each(slider, function forEachSlide(item) {
                if (item && item.image) {
                    if (!self.isProperlyConfigured(item.image)) {
                        item.image = Configuration.councilImageUrl + item.image;

                        if (item.mobileImage) {
                            item.mobileImage = Configuration.councilImageUrl + item.mobileImage;
                        }
                    }
                    sliderItems.push(item);
                }
            });

            return sliderItems;
        },

        childViews: {
            'MarketingSpaces': function MarketingSpaces() {
                var model = this.options.councilModel;
                var collection = model.get('_marketing_spaces');
                return new BackboneCollectionView({
                    childView: CouncilCategoriesMarketingSpaceView,
                    collection: collection,
                    viewsPerRow: 'infinite',
                    template: councilCategoriesMarketingSpacesCollectionTemplate,
                    cellTemplate: councilCategoriesMarketingSpacesCellTemplate,
                    rowTemplate: councilCategoriesMarketingSpacesRowTemplate
                });
            },

            'CategorySliderItemView': function CategorySliderItemView() {
                return new CouncilCategoriesSliderItemsView({
                    application: this.options.application,
                    model: this.model,
                    items: this.model.get('items') && this.model.get('items').models
                });
            }
        },

        getContext: function getContext() {
            var model = this.options.councilModel;
            var slider = this.getSliderItems();
            var currentCategory = this.options.model.get('category');
            var shopAllCouncilCategory;

            if (currentCategory && currentCategory.get('categories') && currentCategory.get('categories').length) {
                shopAllCouncilCategory = _.first(currentCategory.get('categories'));
            }

            return {
                name: model.get('_name') || model.get('_category_info'),
                description: model.get('_description'),
                storeInfo: model.get('_store_info'),
                storeDescription: model.get('_store_description'),
                showStoreData: (model.get('_store_info') || model.get('_store_description')),
                slider: slider,
                hasSliderItems: (slider.length),
                showSlider: (slider.length > 1),
                siteUrl: model.get('_corporate_link'),
                shopAllCouncilUrl: (shopAllCouncilCategory) ? shopAllCouncilCategory.fullurl : null
            };
        }
    });
});
