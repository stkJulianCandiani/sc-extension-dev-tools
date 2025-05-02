/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.Collection', [
    'Backbone',
    'Item.Model',
    'underscore'
], function CSQuickOrderCollection(
    Backbone,
    ItemModel,
    _
) {
    'use strict';

    return Backbone.Collection.extend({
        // eslint-disable-next-line no-undef
        url: _.getAbsoluteUrl(getExtensionAssetsPath('services/CS.QuickOrder.Service.ss')),

        // isNew is used to mark empty item model (new line)
        _isNew: true,

        model: ItemModel,

        initialize: function initialize() {
            this.on('sync', function onSync(collection) {
                // eslint-disable-next-line no-underscore-dangle
                collection._isNew = false;
            });
        },

        parse: function parse(response) {
            return response.items;
        },

        isNew: function isNew() {
            return this._isNew;
        }
    });
});
