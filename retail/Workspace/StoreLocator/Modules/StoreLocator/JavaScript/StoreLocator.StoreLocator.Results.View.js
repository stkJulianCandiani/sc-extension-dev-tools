/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.StoreLocator.Results.View', [
    'StoreLocator.Results.View',
    'store_locator_results_custom.tpl',
    'underscore'
], function StoreLocatorStoreLocatorResultsView(
    StoreLocatorResultsView,
    storeLocatorResultsCustomTpl,
    _
) {
    'use strict';

    _.extend(StoreLocatorResultsView.prototype, {
        template: storeLocatorResultsCustomTpl
    });
});
