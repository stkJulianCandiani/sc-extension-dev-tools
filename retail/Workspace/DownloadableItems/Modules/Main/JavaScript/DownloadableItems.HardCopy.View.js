/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.HardCopy.View', [
    'LiveOrder.Model',
    'LiveOrder.Line.Model',
    'Cart.Confirmation.Helpers',
    'downloadable_items_hardcopy.tpl',
    'Backbone',
    'underscore'
], function DownloadableItemsHardCopyView(
    LiveOrderModel,
    LiveOrderLineModel,
    CartConfirmationHelpers,
    downloadableItemsHardcopyTpl,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: downloadableItemsHardcopyTpl,

        events: {
            'click [data-type="add-to-cart-download"]': 'addToCartHardCopy'
        },

        initialize: function initialize(options) {
            this.container = options.container;
            this.parentItem = options.parentItem;
            this.item = this.model.getItem();
            this.cart = LiveOrderModel.getInstance();

            this.item.on('sync', _.bind(this.render, this));
        },

        addToCartHardCopy: function addToCartHardCopy(e) {
            var cart = this.container.getComponent('Cart');
            var cartPromise;
            var line;

            e.preventDefault();

            this.model.set('quantity', this.parentItem.get('quantity'));

            line = LiveOrderLineModel.createFromProduct(this.model);

            cartPromise = cart.addLine({
                line: {
                    quantity: this.parentItem.get('quantity'),
                    item: {
                        internalid: this.item.get('internalid')
                    },
                    options: [{ // The following option is used to save the parent item url to use it later from the cart
                        'cartOptionId': 'custcol_downloadable_item_url',
                        'value': {
                            internalid: this.parentItem.get('item').get('urlcomponent')
                        }
                    }]
                }
            });

            CartConfirmationHelpers.showCartConfirmation(
                cartPromise,
                line,
                this.container
            );
        },

        getContext: function getContext() {
            return {
                price: this.item.getPrice().price_formatted
            };
        }
    });
});
