define('IronOn.ItemPrice', [
    'ironon_item_price.tpl',
    'Backbone',
    'underscore',
    'Utils'
], function IronOnPatchesAndPinsView(
    irononItemPriceTpl,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: irononItemPriceTpl,

        getContext: function getContext() {
            var pdp = this.options.container.getComponent('PDP');
            var itemInfo = pdp.getItemInfo();
            var selectedChild = pdp.getSelectedMatrixChilds();
            var itemPrice;
            var itemPriceWIronOn;
            if (selectedChild && selectedChild.length === 1) {
                itemPrice = selectedChild[0].onlinecustomerprice_detail.onlinecustomerprice
            } else {
                itemPrice = itemInfo.item.onlinecustomerprice
            }
            itemPriceWIronOn = parseFloat(this.options.parent.ironOnPrice, 10) ? itemPrice + parseFloat(this.options.parent.ironOnPrice, 10) : itemPrice;
            return {
                itemPrice: _.formatCurrency(itemPriceWIronOn)
            };
        }
    });
});
