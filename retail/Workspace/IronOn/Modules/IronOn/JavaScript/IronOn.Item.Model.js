/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.Item.Model', [
    'Backbone',
    'underscore',
    'Utils'
], function IronOnItemModel(
    Backbone,
    _,
    Utils
) {
    'use strict';

    return Backbone.Model.extend({

        // @method initialize
        // @return {Void}
        initialize: function initialize(options) {
            // Wires the config options to the URL of the model
            // todo use own fieldset
            this.searchApiMasterOptions = options.container.getComponent('Environment').getConfig('searchApiMasterOptions.itemDetails');
            this.searchApiMasterOptions.fieldset = 'ironon';
        },

        url: function url() {
            var urlRoot = Utils.addParamsToUrl(
                '/api/items',
                this.searchApiMasterOptions
            );

            return urlRoot;
        }
    });
});
