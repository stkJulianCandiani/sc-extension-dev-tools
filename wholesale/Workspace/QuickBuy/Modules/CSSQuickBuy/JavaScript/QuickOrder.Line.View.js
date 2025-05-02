/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
*/

define('QuickOrder.Line.View', [
    'Backbone',
    'ProductViews.Price.View',
    'Backbone.CompositeView',
    'quickorder_line_add.tpl',
    'underscore',
    'Utils'
], function QuickOrderLineView(
    Backbone,
    ItemViewsPriceView,
    BackboneCompositeView,
    quickorder_line_tpl,
    _,
    Utils
  ) {
    'use strict';
    return Backbone.View.extend({

        template: quickorder_line_tpl,
        initialize: function initialize(options) {
            BackboneCompositeView.add(this);
            
            this.noresults = false
            this.suggestions = this.model.get('suggestedResults');
            this.index = this.model.get('internalid');
            this.query = this.model.get('query');
            this.referenceline = this.model.get('referenceLine');
            this.addedToCart = this.model.get('addedToCart');
            this.addedToCartCode = this.model.get('cartCode');
            
        },
        childViews: {
            'Item.Price': function ItemPrice() {
                return new ItemViewsPriceView({model: this.model.get('item')});
            }
        },
        getContext: function getContext() {
            var item = this.model.get('item');
            
            return {
                amount: item && item.get("onlinecustomerprice_detail")?Utils.formatCurrency(item.get("onlinecustomerprice_detail").onlinecustomerprice * item.get("quantity"),"$"):"",
                index: this.index,
                quantityTabIndex:  this.index + 0.5,
                referenceline: this.referenceline,
                addedToCart: this.addedToCart,
                minQtyAlert: (item.get('quantity') < item.get('_minimumQuantity')) && this.addedToCartCode !== '',
                query: this.query || item.get("query"),
                quantity: item.get('quantity'),
                quantityavailable: item.get('quantityavailable'),
                minquantityvalue: item.get('_minimumQuantity'),
                minquantity: (item.get('_minimumQuantity') > 1),
                isinstock: item.get('isinstock') && !!item.get('_isPurchasable'),
                name: item.get('_name'),
                sku: item.get('_sku'),
                linkAttributes: item.get('_linkAttributes'),
                thumbnailURL: item.get('_thumbnail').url.indexOf("no_image_available.jpeg")>=0?(item.get("parentImage") && item.get("parentImage").length>0?item.get('parentImage')[0].url:item.get('_thumbnail').url):item.get('_thumbnail').url,
                thumbnailAltImageText: item.get('_thumbnail').altimagetext,
                isNavigable: !!item.get('_isPurchasable'),
                itemSelected: !!item.get('_name'),
                resultsFound: !!this.suggestions.length && !item.get('_name'),
                results: this.suggestions.map(function map(result) {
                    return {
                        internalid: result.get('internalid'),
                        name: result.get('_name'),
                        sku: result.get('_sku')
                    };
                }),
                noResults: this.query && this.model.get("suggestedResults").length==0,
                newline: false,
                focus: this.query && this.query !=""
            };
        }

    });
});
