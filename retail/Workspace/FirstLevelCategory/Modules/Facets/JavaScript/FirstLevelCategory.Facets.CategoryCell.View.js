/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Facets.CategoryCell.View', [
    'Facets.CategoryCell.View',
    'Categories',
    'firstlevelcategory_facets_category_cell.tpl',
    'underscore'
], function FirstLevelCategoryFacetsCategoryCellView(
    FacetsCategoryCellView,
    Categories,
    firstLevelCategoryTpl,
    _
) {
    'use strict';

    var viewPrototype = FacetsCategoryCellView.prototype;

    _(viewPrototype).extend({
        initialize: function initialize() {
            var firstLevelCategories = Categories.getTopLevelCategoriesUrlComponent();
            if (firstLevelCategories) {
                this.template = firstLevelCategoryTpl;
            }
        },

        getContext: function getContext() {
            return {
                index: this.options.index,
                name: this.model.get('name'),
                url: this.model.get('fullurl'),
                image: this.model.get('thumbnailurl')
            };
        }

    });
});
