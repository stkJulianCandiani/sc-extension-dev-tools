/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Router', [
    'Council.Shop.View',
    'Backbone',
    'underscore'
], function CouncilRouter(
    CouncilShopView,
    Backbone,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');

            pageType.registerPageType({
                name: _.translate('Find your Council'),
                routes: ['shop-your-council'],
                view: CouncilShopView
            });
        }
    };
});
