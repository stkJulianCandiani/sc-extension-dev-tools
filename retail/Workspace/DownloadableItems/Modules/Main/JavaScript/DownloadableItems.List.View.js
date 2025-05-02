/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

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

        getSelectedMenu: function getSelectedMenu() {
            return 'downloadableitems';
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return {
                text: _('My Downloads').translate(),
                href: '/downloadableitems'
            };
        },

        initialize: function initialize(options) {
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
            var $target = jQuery(e.currentTarget);
            var fileId = $target.data('fileId');
            var model = this.collection.findWhere({ file: fileId });
            var remainingdownloads = model.get('remainingdownloads');
            var self = this;

            if (!this.isProcessing) {
                self.isProcessing = true;

                // This was done because as we can't determine when the file
                // is actually downloaded (there is no ajax call), then we have
                // to simulate that we block the button while we wait for the file to
                // download (3 seconds aprox....)
                if (!SC.isPageGenerator()) {
                    _.delay(function delayedDownload() {
                        self.isProcessing = false;
                        if (remainingdownloads !== null) {
                            remainingdownloads = parseInt(remainingdownloads, 10);
                            model.set('remainingdownloads', (remainingdownloads - 1));
                        }

                        self.renderCompositeView();
                    }, 3000);
                }
            }
        },

        listenCollection: function listenCollection() {
            this.setLoading(true);

            this.collection.on({
                request: jQuery.proxy(this, 'setLoading', true, false),
                reset: jQuery.proxy(this, 'setLoading', false, true),
                sync: jQuery.proxy(this, 'setLoading', false, true)
            });
        },

        setLoading: function setLoading(value, render) {
            this.isLoading = value;

            if (render) {
                this.render();
            }
        },

        childViews: {
            'ListHeader': function ListHeader() {
                return this.listHeader;
            },

            'GlobalViews.Pagination': function GlobalViewsPagination() {
                return new GlobalViewsPaginationView(_.extend({
                    totalPages: Math.ceil(this.collection.totalRecordsFound / this.collection.recordsPerPage)
                }, Configuration.defaultPaginationSettings));
            },

            'GlobalViews.ShowCurrentPage': function GlobalViewsShowCurrentPage() {
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

        getContext: function getContext() {
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
