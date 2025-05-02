/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('CS.FirstLevelCategory.Main', [
    'FirstLevelCategory.Helper',
    'FirstLevelCategory.Facets.CategoryCell.View',
    'FirstLevelCategory.Facets.FacetedNavigationItemCategory.View',
    'FirstLevelCategory.Facets.Browse.View',
    'FirstLevelCategory.Merchandising.View',
    'FirstLevelCategory.Facets.Browse.CategoryHeading.View'
], function CSFirstLevelCategoryPageMain(
    FirstLevelCategoryHelper
) {
    'use strict';

    return {

        mountToApp: function mountToApp(container) {
            FirstLevelCategoryHelper.registerMerchZonesEvent(container);
        }
    };
});
