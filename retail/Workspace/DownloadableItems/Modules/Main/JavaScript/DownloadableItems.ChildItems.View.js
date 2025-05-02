/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.ChildItems.View', [
    'Backbone',
    'downloadable_items_item_details.tpl',
    'underscore'
], function DownloadableItemsChildItemsView(
    Backbone,
    downloadableItemsItemDetailsTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: downloadableItemsItemDetailsTpl,

        initialize: function initialize(options) {
            this.collection = options.collection;
            this.collection.on('sync', _.bind(this.render, this));
        },

        getContext: function getContext() {
            return {
                downloadableItems: this.collection,
                showDownloadableItems: this.collection && this.collection.length
            };
        }
    });
});
