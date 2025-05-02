/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.DownloadableItems.Main', [
    'DownloadableItems.Router',
    'DownloadableItems',
    'DownloadableItems.ProductDetails.Full.View',
    'DownloadableItems.Cart.AddToCart.Button.View',
    'DownloadableItems.Cart.Lines.View'
], function CSDownloadableItemsMain(
    DownloadableItemsRouter,
    DownloadableItems
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            DownloadableItemsRouter.mountToApp(container);
            DownloadableItems.mountToApp(container);
        }
    };
});
