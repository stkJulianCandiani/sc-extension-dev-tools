define('CS.FreeShipping.Modal.View', [
    'Backbone',
    'freeshipping_popup.tpl',
    'underscore',
    'Utils'
], function CSFreeShippingModalView(
    Backbone,
    freeShippingPopupTpl,
    _

) {
    'use strict';

    return Backbone.View.extend({
        template: freeShippingPopupTpl,

        title: _.translate('Free Shipping'),

        modalClass: 'free-shipping-popup',

        initialize: function initialize(options) {
            this.threshold = options.threshold;
        },

        getContext: function getContext() {
            return {
                threshold: _.formatCurrency(this.threshold)
            };
        }
    });
});
