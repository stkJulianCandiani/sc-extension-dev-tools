/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
*/

define('QuickOrder.Collection', [
    'Backbone',
    'Item.Model',
    'underscore',
    'Utils'
], function QuickOrderCollection(
    Backbone,
    Model,
    _
) {
    'use strict';
    return Backbone.Collection.extend({
        url: _.getAbsoluteUrl('services/Quickorder.Service.ss'),
        // isNew is used to mark empty item model (new line)
        _isNew: true,
        initialize: function initialize() {
            this.on('sync', function(collection) {
                collection._isNew = false;
            });
        },
        model: Model,
        parse: function parse(response) {
            return response.items;
        },
        isNew: function isNew() {
            return this._isNew;
        }
    });
});

