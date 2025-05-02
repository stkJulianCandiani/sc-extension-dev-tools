/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('CS.Salesforce.Collect.Shopping', [
    'Salesforce.Collect',
    'Salesforce.Collect.Cart.Detailed.View',
    'Salesforce.Collect.Newsletter.View'
], function CSSalesforceCollectShopping(
    SalesforceCollect
    ) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            SalesforceCollect.startSalesforceCollection(container);
        }
    };
});
