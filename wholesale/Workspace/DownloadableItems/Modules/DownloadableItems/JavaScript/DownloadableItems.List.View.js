define('DownloadableItems.List.View', [
    'DownloadableItems.Item.View',
    'SC.Configuration',
    'GlobalViews.Pagination.View',
    'GlobalViews.ShowingCurrent.View',
    'ListHeader.View',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'Handlebars',
    'downloadable_items.tpl',

    'Backbone',
    'underscore',
    'jQuery'
], function DownloadableItemsView(
    DownloadableItemsItemView,

    Configuration,
    GlobalViewsPaginationView,
    GlobalViewsShowingCurrentView,

    ListHeaderView,
    BackboneCompositeView,
    BackboneCollectionView,
    Handlebars,

    downloadableItemsTpl,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: downloadableItemsTpl,
        title: _('My Downloads').translate(),
        className: 'DownloadableItemsListView',
        page_header: _('My Downloads').translate(),
        attributes: {
            'class': 'DownloadableItemsListView'
        },
        events: {
            'click [data-download]': 'decrementDownload'
        },
        getSelectedMenu: function () {
            return 'purchases';
        },
        getBreadcrumbPages: function () {
            return {
                text: _('My Downloads').translate(),
                href: '/downloadableitems'
            };
        },
        initialize: function (options) {
            this.application = options.application;
            this.collection = options.collection;

            this.listenCollection();

            // Manages sorting and filtering of the collection
            this.listHeader = new ListHeaderView({
                view: this,
                application: this.application,
                collection: this.collection,
                hidePagination: false
            });

            BackboneCompositeView.add(this);
        },
        decrementDownload: function decrementDownload(e) {
            var $target = jQuery(e.target);
            var fileId = $target.data('fileId');
            var model = this.collection.findWhere({ file: fileId });
            var remainingdownloads = model.get('remainingdownloads');
            if (remainingdownloads !== null) {
                remainingdownloads = parseInt(remainingdownloads, 10);
                model.set('remainingdownloads', (remainingdownloads - 1));
            }
            this.render();
        },

        listenCollection: function () {
            this.setLoading(true);

            this.collection.on({
                request: jQuery.proxy(this, 'setLoading', true),
                reset: jQuery.proxy(this, 'setLoading', false)
            });
        },
        setLoading: function (value) {
            this.isLoading = value;
        },
        childViews: {
            'ListHeader': function ListHeader() {
                return this.listHeader;
            },
            'GlobalViews.Pagination': function () {
                return new GlobalViewsPaginationView(_.extend({
                    totalPages: Math.ceil(this.collection.totalRecordsFound / this.collection.recordsPerPage)
                }, Configuration.defaultPaginationSettings));
            },
            'GlobalViews.ShowCurrentPage': function () {
                return new GlobalViewsShowingCurrentView({
                    items_per_page: this.collection.recordsPerPage,
                    total_items: this.collection.totalRecordsFound,
                    total_pages: Math.ceil(this.collection.totalRecordsFound / this.collection.recordsPerPage)
                });
            },
            'DownloadableItems.List': function DownloadableItemsResults() {
                return new BackboneCollectionView({
                    childView: DownloadableItemsItemView,
                    collection: this.collection,
                    viewsPerRow: 1,
                    cellTemplate: null,
                    rowTemplate: null
                });
            }
        },
        getContext: function () {
            return {
                pageHeader: this.page_header,
                collectionLengthGreaterThan0: this.collection.length > 0,
                isLoading: this.isLoading,
                showPagination: !!(this.collection.totalRecordsFound && this.collection.recordsPerPage),
                showCurrentPage: this.options.showCurrentPage
            };
        }
    });
});
