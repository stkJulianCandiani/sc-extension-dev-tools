/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.ProductViews.Price.View', [
    'ProductViews.Price.View',
    'SC.Configuration',
    'underscore',
    'Utils'
], function IronOnProductViewsPriceView(
    ProductViewsPriceView,
    Configuration,
    _,
    Utils
) {
    'use strict';

    // @class ACS.IronOn.IronOn.View @extends Backbone.View
    return _.extend(ProductViewsPriceView.prototype, {

        getContext: _.wrap(ProductViewsPriceView.prototype.getContext, function wrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var hasNumeralCost;
            var newPrice;
            var newPriceFormatted;
            var ironOnConfiguration;
            if (this.options && this.options.origin === 'PDPFULL') {
                try {
                    ironOnConfiguration = Configuration.get('extensions').ironon;
                    hasNumeralCost = parseFloat(this.model.get(ironOnConfiguration.troopNumeralItemCostOption), 10);
                    if (!isNaN(hasNumeralCost) && hasNumeralCost > 0) {
                        newPrice = context.price + hasNumeralCost;
                        newPriceFormatted = Utils.formatCurrency(newPrice);
                        _.extend(context, {
                            price: newPrice,
                            priceFormatted: newPriceFormatted
                        });
                    }
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(e);
                }
            }
            return context;
        })
    });
});
