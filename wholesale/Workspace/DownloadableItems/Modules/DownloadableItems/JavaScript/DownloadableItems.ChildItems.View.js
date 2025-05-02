define('DownloadableItems.ChildItems.View', [
    'Backbone',
    'jQuery',
    'underscore',
    'Utils',
    'downloadable_items_item_details.tpl'
], function (
    Backbone,
    jQuery,
    _,
    Utils,
    downloadableItemsItemDetailsTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: downloadableItemsItemDetailsTpl,

        getContext: function getContext() {
            var items = this.collection.models;
            var displayItems = (this.collection.models && this.collection.models.length);

            return {
                items: items,
                displayItems: displayItems
            };
        }
    });
});
