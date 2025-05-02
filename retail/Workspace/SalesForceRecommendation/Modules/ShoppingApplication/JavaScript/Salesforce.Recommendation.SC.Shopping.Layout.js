/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Recommendation.SC.Shopping.Layout', [
    'SC.Shopping.Layout',
    'salesforce_recommendation_shopping_layout.tpl',
    'underscore'
], function SalesforceRecommendationSCShoppingLayout(
    SCShoppingLayout,
    customTpl,
    _) {
    'use strict';

    _.extend(SCShoppingLayout.prototype, {
        template: customTpl
    });
});
