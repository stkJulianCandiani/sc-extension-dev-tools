define('CS.PriceStrikeThrough.Main', [
    'PriceStrikeThrough.ItemKeyMapping'
], function CSPriceStrikeThroughMain(
      PriceStrikeThroughItemKeyMapping
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            PriceStrikeThroughItemKeyMapping.changeComparePrice();
        }
    };
});
