/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.StoreLocator.Search.View', [
    'StoreLocator.Search.View',
    'store_locator_search_custom.tpl',
    'underscore'
], function StoreLocatorStoreLocatorSearchView(
    StoreLocatorSearchView,
    storeLocatorSearchCustomTpl,
    _
) {
    'use strict';

    _.extend(StoreLocatorSearchView.prototype, {
        template: storeLocatorSearchCustomTpl
    });
});
