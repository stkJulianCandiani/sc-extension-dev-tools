/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('OutOfStockNotification.PDP.View', [
    'OutOfStockNotification.Helper',
    'out_of_stock_notification_pdp.tpl',
    'SC.Configuration',
    'Backbone',
    'jQuery',
    'Utils',
    'underscore'
], function OutOfStockNotificationPDPView(
    OutOfStockNotificationHelper,
    OutOfStockNotificationPDPTpl,
    Configuration,
    Backbone,
    jQuery,
    Utils,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: OutOfStockNotificationPDPTpl,

        outOfStockData: {},

        outOfStockConfiguration: {},

        initialize: function initialize(options) {
            var self = this;

            if (options.item) {
                this.item = options.item;
                this.getOutOfStockData(this.item);

                this.item.on('change:quantity', function onQtyChange() {
                    self.getOutOfStockData(self.item);
                    self.processRequestedQuantity();
                    self.render();
                });

                this.once('afterViewRender', function afterViewRender() {
                    self.processRequestedQuantity();
                });
            }
        },

        getRequestedQuantityFromInput: function getRequestedQuantityFromInput($quantityInput) {
            return parseInt($quantityInput.val(), 10);
        },

        processRequestedQuantity: function processRequestedQuantity() {
            var self = this;
            var $fullViewElement = this.parentView.$('.product-details-full');
            var $quickViewElement = this.parentView.$('.product-details-quickview');
            var $pdpElement = $fullViewElement.length ? $fullViewElement : $quickViewElement;
            var $cartElement = jQuery('button.cart-add-to-cart-button-button').length
                ? jQuery('button.cart-add-to-cart-button-button')
                : this.parentView.$('button.cart-add-to-cart-button-button');

            if (this.outOfStockData.showOutOfStock) {
                if (!$pdpElement.hasClass('quantity-alert-enabled')) {
                    $pdpElement.addClass('quantity-alert-enabled');
                }

                _.defer(function setCartToDisabled() {
                    if (!Utils.isPageGenerator()) {
                        $cartElement = jQuery('button.cart-add-to-cart-button-button').length
                            ? jQuery('button.cart-add-to-cart-button-button')
                            : self.parentView.$('button.cart-add-to-cart-button-button');

                        $cartElement.prop('disabled', true);
                    }
                });
            } else {
                $pdpElement.removeClass('quantity-alert-enabled');
                $cartElement.prop('disabled', false);
            }
        },

        getOutOfStockData: function getOutOfStockData(contextLineData) {
            this.outOfStockData = OutOfStockNotificationHelper.getOutOfStockData(contextLineData);
        },

        getContext: function getContext() {
            var context;

            this.getOutOfStockData(this.item);

            context = {
                outOfStockData: this.outOfStockData,
                pdpOutOfStockMessage: Configuration.get('quantityalert.pdptext')
            };

            return context;
        }
    });
});
