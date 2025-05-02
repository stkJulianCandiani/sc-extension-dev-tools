/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('CS.Salesforce.Collect.Checkout', [
    'Salesforce.Collect',
    'Salesforce.Collect.LoginRegister.Login.View',
    'Salesforce.Collect.LoginRegister.Register.View'
], function CSSalesforceCollectCheckout(
    SalesforceCollect
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            SalesforceCollect.startSalesforceCollection(container);
        }
    };
});
