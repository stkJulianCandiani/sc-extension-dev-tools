/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.StoreLocator.Main.Shopping', [
    'StoreLocator.Footer',
    'StoreLocator.Location.VenueDetails.View',
    'StoreLocator.StoreLocator.Main.View',
    'StoreLocator.StoreLocator.Details.View',
    'StoreLocator.StoreLocator.List.View',
    'StoreLocator.StoreLocator.Results.View',
    'StoreLocator.StoreLocator.Search.View',
    'StoreLocator.StoreLocator.Tooltip.View',
    'StoreLocator.ReferenceMap'
], function CSStoreLocatorMainShopping(
    StoreLocatorFooter
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            StoreLocatorFooter.mountToApp(container);
        }
    };
});
