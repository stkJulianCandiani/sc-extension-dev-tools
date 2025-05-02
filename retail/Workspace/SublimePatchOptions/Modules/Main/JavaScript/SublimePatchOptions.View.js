/* eslint-disable max-len */
/*
© 2023 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

define('SublimePatchOptions.View', [
    'sublimePatchOptions.tpl',
    'Backbone',
    'jQuery',
    'underscore',
    'Utils'
], function SublimePatchOptionsView(
    sublimePatchOptionsTpl,
    Backbone,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: sublimePatchOptionsTpl,

        events: {
            'change [data-action="add-patch-message"]': 'changeMessage',
            'click [data-action="information-confirmation"]': 'confirmSelection'
        },

        initialize: function initialize(options) {
            this.pdp = options.container.getComponent('PDP');
            this.cart = options.container.getComponent('Cart');
            this.environment = options.container.getComponent('Environment');
        },

        contextDataRequest: ['item'],

        changeMessage: function changeMessage(e) {
            var message = jQuery(e.target).val();
            this.pdp.setOption('custcol_sublim_patch_freeform_text', message);
        },

        findPatchOptions: function findPatchOptions(option) {
            var item = this.contextData.item();
            return _.find(item.itemoptions_detail.fields, function (itemOption) {
                return itemOption.internalid === option;
            });
        },

        findMessageLabel: function findMessageLabel() {
            var itemOptionsConfig = this.environment.getConfig('ItemOptions').optionsConfiguration;
            return _.find(itemOptionsConfig, function (itemOption) {
                return itemOption.cartOptionId === 'custcol_sublim_patch_freeform_text';
            });
        },

        getContext: function getContext() {
            var showPatchesSection = this.findPatchOptions('custcol_sublim_patch_tagline');
            var customMessageOption = this.findMessageLabel();
            var customMessageValue = Utils.getParameterByName(window.location.href, customMessageOption ? customMessageOption.urlParameterName : '');
            var sublimePatchOptions = this.environment.getConfig('sublimePatchOptions');
            var customMessageLength = sublimePatchOptions ? sublimePatchOptions.customMessageLength : 13;
            return {
                showPatchesSection: showPatchesSection,
                customMessageLabel: customMessageOption ? customMessageOption.label : '',
                customMessageValue: customMessageValue,
                customMessageLength: customMessageLength
            };
        }
    });
});
