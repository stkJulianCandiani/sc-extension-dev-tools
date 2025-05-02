define('DownloadableItems.Router', [
    'DownloadableItems.Collection',
    'DownloadableItems.List.View',
    'Backbone'
], function DownloadableItemsRouter(
    Collection,
    View,
    Backbone
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'downloadableitems': 'showDownloadableItems',
            'downloadableitems?:options': 'showDownloadableItems'
        },
        initialize: function initialize(application) {
            this.application = application;
        },
        showDownloadableItems: function showDownloadableItems() {
            var collection = new Collection();
            var view = new View({
                application: this.application,
                collection: collection
            });

            collection
                .on('reset change add', view.showContent, view);

            view.showContent();
        }
    });
});
