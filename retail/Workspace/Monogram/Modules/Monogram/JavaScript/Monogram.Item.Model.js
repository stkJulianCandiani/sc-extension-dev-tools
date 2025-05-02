define('Monogram.Item.Model', [
    'Backbone',
    'underscore',
    'Utils'
], function MonogramItemModel(
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
