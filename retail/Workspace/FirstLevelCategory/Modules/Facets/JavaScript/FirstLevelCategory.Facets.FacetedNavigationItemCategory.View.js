/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Facets.FacetedNavigationItemCategory.View', [
    'Facets.FacetedNavigationItemCategory.View',
    'underscore'
], function FirstLevelCategoryFacetsFacetedNavigationItemCategoryView(
    FacetsFacetedNavigationItemCategoryView,
    _
) {
    'use strict';

    var viewPrototype = FacetsFacetedNavigationItemCategoryView.prototype;

    _(viewPrototype).extend({
        initialize: _.wrap(viewPrototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));

            // Categories different than level 1 should not display the subcategories list
            // if it has parenturl it means it is a child category
            if (this.model.get('parenturl')) {
                this.categories = [];
            }
        }),

        getContext: _.wrap(viewPrototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var categoriesData = _.findWhere(SC.CATEGORIES, { fullurl: this.model.get('fullurl') });
            var subcategoriesData;
            var i;

            for (i = 0; i < context.displayValues.length; i++) {
                subcategoriesData = _.findWhere(categoriesData.categories, { fullurl: context.displayValues[i].link });
                context.displayValues[i].subcategories = subcategoriesData.categories;
            }

            for (i = 0; i < context.extraValues.length; i++) {
                subcategoriesData = _.findWhere(categoriesData.categories, { fullurl: context.extraValues[i].link });
                context.extraValues[i].subcategories = subcategoriesData.categories;
            }

            return context;
        })
    });
});
