define('PriceStrikeThrough.ItemKeyMapping', [
    'SC.Configuration'
], function PriceStrikeThroughItemKeyMapping(
    Configuration
) {
    'use strict';

    Configuration.itemKeyMapping = Configuration.itemKeyMapping || {};
    return {
        changeComparePrice: function changeComparePrice() {
           // eslint-disable-next-line no-underscore-dangle
            Configuration.itemKeyMapping._comparePriceAgainst = function _comparePriceAgainst(item) {
                var prices = item.get('_priceDetails');

                if (prices) {
                    if (prices.priceschedule) {
                        return prices.priceschedule[0].price;
                    }
                }
                return item.get('pricelevel8');
            };
            // @property {String} _comparePriceAgainstFormated This method a formatted version of the method _comparePriceAgainst
            // eslint-disable-next-line no-underscore-dangle
            Configuration.itemKeyMapping._comparePriceAgainstFormated = function _comparePriceAgainstFormated(item) {
                var prices = item.get('_priceDetails');

                if (prices) {
                    if (prices.priceschedule) {
                        return prices.priceschedule[0].price_formatted;
                    }
                }
                return item.get('pricelevel8_formatted');
            };
        }
    };
});
