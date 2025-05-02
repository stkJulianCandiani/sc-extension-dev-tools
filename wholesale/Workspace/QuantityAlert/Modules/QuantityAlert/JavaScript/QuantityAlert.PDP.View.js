define('QuantityAlert.PDP.View',
    [
        'quantityAlertPdp.tpl',
        'SC.Configuration',
        'Backbone',
        'jQuery',
        'underscore'
    ],
    function QuantityAlertPDPView(
        QuantityAlertPdpTpl,
        Configuration,
        Backbone,
        jQuery,
        _
    ) {
        'use strict';

        return Backbone.View.extend({

            template: QuantityAlertPdpTpl,

            initialize: function initialize(options) {
                var self = this;
                var pdpComponent = options.pdpComponent;
                this.itemInformation = this.getItemInformation(pdpComponent.getItemInfo());
                this.on('afterViewRender', function afterQuantityAlertViewRender() {
                    setTimeout(function setTimeout() {
                    var $quantityBox = jQuery('.product-details-quantity-container #quantity');
                    var requestedQuantity = self.getRequestedQuantityFromInput($quantityBox);
                    self.processRequestedQuantity(requestedQuantity, false);
                    $quantityBox.on('blur change paste keyup', function quantityInputChange(e) {
                        requestedQuantity = self.getRequestedQuantityFromInput($quantityBox);
                        self.processRequestedQuantity(requestedQuantity, e);
                    });
                    }, 0);
                });
            },

            getRequestedQuantityFromInput: function getRequestedQuantityFromInput($quantityInput) {
                return parseInt($quantityInput.val(), 10);
            },

            processRequestedQuantity: function processRequestedQuantity(requestedQuantity, event) {
                var self = this; 
                var $pdpElement = jQuery('.product-details-full');
                var $addToCartButtonElement = jQuery('.cart-add-to-cart-button button[type="submit"]');
                var $addToCartButtonOverlay = jQuery('.cart-add-to-cart-button-overlay');
                if (this.showQuantityAlert(requestedQuantity)) {
                    if (!$pdpElement.hasClass('quantity-alert-enabled')) $pdpElement.addClass('quantity-alert-enabled');
                    if (!$addToCartButtonElement.prop('disabled')) $addToCartButtonElement.prop('disabled', 'disabled');
                    if (!$addToCartButtonOverlay.hasClass('add-to-cart-enabled')) $addToCartButtonOverlay.addClass('add-to-cart-enabled');
                    if (event) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    }
                } else {
                    $pdpElement.removeClass('quantity-alert-enabled');
                    $addToCartButtonOverlay.removeClass('add-to-cart-enabled');
                    $addToCartButtonElement.removeProp('disabled', false);
                }
            },

            getItemInformation: function getItemInformation(itemInformation) {
                var rawItemInformation = (itemInformation) ? itemInformation.item : {};
                return {
                    quantityAvailable: rawItemInformation.quantityavailable,
                    isBackorderable: rawItemInformation.isbackorderable,
                    hasDoNotReorderFlag: rawItemInformation.custitem_do_not_reorder_flag
                };
            },

            showQuantityAlert: function showQuantityAlert(requestedQuantity) {
                return ((!this.itemInformation.isBackorderable && this.itemInformation.hasDoNotReorderFlag) && Configuration.get('quantityalert.showquantityalert') && requestedQuantity > this.itemInformation.quantityAvailable);
            },

            getContext: function getContext() {
                return {
                    showQuantityAlert: this.showQuantityAlert(),
                    quantityAlertMessage: Configuration.get('quantityalert.pdptext')
                };
            }
        });
    });
