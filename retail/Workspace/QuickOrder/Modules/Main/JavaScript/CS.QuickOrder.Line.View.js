/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.Line.View', [
    'Backbone',
    'ProductViews.Price.View',
    'Backbone.CompositeView',
    'quickorder_line.tpl',
    'underscore'
], function CSQuickOrderLineView(
    Backbone,
    ProductViewsPriceView,
    BackboneCompositeView,
    quickOrderLineTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: quickOrderLineTpl,

        initialize: function initialize() {
            BackboneCompositeView.add(this);

            this.noresults = !this.model.get('suggestedResults') ||
            (!this.model.get('suggestedResults').isNew() &&
            this.model.get('suggestedResults').length === 0);
            this.suggestions = this.model.get('suggestedResults');
            this.index = this.model.get('internalid');
            this.query = this.model.get('query');
            this.referenceline = this.model.get('referenceLine');
            this.addedToCart = this.model.get('addedToCart');
            this.addedToCartCode = this.model.get('cartCode');
        },

        childViews: {
            'Item.Price': function ItemPrice() {
                return new ProductViewsPriceView({ model: this.model.get('item') });
            }
        },

        getContext: function getContext() {
            var item = this.model.get('item');
            var qty = item.get('quantity');
            var amount = item.getPrice().price;

            if (qty > 1) {
                amount = (qty * item.getPrice().price);
            }
            return {
                index: this.index,
                referenceline: this.referenceline,
                addedToCart: this.addedToCart,
                minQtyAlert: (item.get('quantity') < item.get('_minimumQuantity')) && this.addedToCartCode !== '',
                query: this.query,
                quantity: item.get('quantity'),
                minquantityvalue: item.get('_minimumQuantity'),
                minquantity: (item.get('_minimumQuantity') > 1),
                isinstock: item.get('isinstock') && !!item.get('_isPurchasable'),
                name: item.get('_name'),
                sku: item.get('_sku'),
                linkAttributes: item.get('_linkAttributes'),
                thumbnailURL: item.get('_thumbnail').url,
                thumbnailAltImageText: item.get('_thumbnail').altimagetext,
                isNavigable: !!item.get('_isPurchasable'),
                itemSelected: !!item.get('_name'),
                resultsFound: !!this.suggestions.length && !item.get('_name'),
                results: this.suggestions.map(function map(result) {
                    return {
                        internalid: result.get('internalid'),
                        name: result.get('displayname'),
                        sku: result.get('_sku')
                    };
                }),
                noResults: this.noresults,
                newline: this.model.get('suggestedResults').isNew(),
                amount: _.formatCurrency(amount),
                quantityAvailable: item.get('quantityavailable')
            };
        }
    });
});
