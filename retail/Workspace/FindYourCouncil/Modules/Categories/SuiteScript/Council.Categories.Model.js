/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Categories.Model', [
    'Application',
    'underscore'
], function CouncilCategoriesModel(
    Application,
    _
) {
    'use strict';

    function collectCategoriesIds(categoriesIds, category) {
        if (category) {
            categoriesIds.push(category.internalid);

            if (category.categories) {
                _(category.categories).forEach(function forEachSubCategory(subCategory) {
                    collectCategoriesIds(categoriesIds, subCategory);
                });
            }

            if (category.siblings) {
                _(category.siblings).forEach(function forEachSiblingCategory(siblingCategory) {
                    collectCategoriesIds(categoriesIds, siblingCategory);
                });
            }
        }
        return categoriesIds;
    }

    function collectCategoryCustomFields(categoriesIds) {
        var categoriesCustomFieldsByCategory = {};
        var categoriesData = nlapiSearchRecord('commercecategory', null, [
            ['internalid', 'anyof', categoriesIds]
        ], [
            new nlobjSearchColumn('custrecord_council_category'),
            new nlobjSearchColumn('custrecord_color_category'),
            new nlobjSearchColumn('metadescription')
        ]);

        _(categoriesData).reduce(function reducer(memo, current) {
            categoriesCustomFieldsByCategory[current.getId()] = {
                custrecord_council_category: current.getValue('custrecord_council_category'),
                custrecord_color_category: current.getText('custrecord_color_category'),
                metadescription: current.getValue('metadescription')
            };
            return categoriesCustomFieldsByCategory;
        }, categoriesCustomFieldsByCategory);

        return categoriesCustomFieldsByCategory;
    }

    function fixCategory(category, categoriesCustomFieldsByCategory) {
        if (category) {
            _(category).extend({
                custrecord_council_category: categoriesCustomFieldsByCategory[category.internalid].custrecord_council_category,
                custrecord_color_category: categoriesCustomFieldsByCategory[category.internalid].custrecord_color_category,
                metadescription: categoriesCustomFieldsByCategory[category.internalid].metadescription
            });

            if (category.categories) {
                _(category.categories).forEach(function forEachSubCategory(subCategory) {
                    fixCategory(subCategory, categoriesCustomFieldsByCategory);
                });
            }

            if (category.siblings) {
                _(category.siblings).forEach(function forEachSiblingCategory(siblingCategory) {
                    fixCategory(siblingCategory, categoriesCustomFieldsByCategory);
                });
            }
        }
    }

    Application.on('after:Category.get', function afterCategoryGet(model, result) {
        var categoryId = result ? result.internalid : null;
        var categoriesIds = [];
        var categoriesCustomFieldsByCategory;

        try {
            if (categoryId) {
                collectCategoriesIds(categoriesIds, result);
                categoriesCustomFieldsByCategory = collectCategoryCustomFields(categoriesIds);
                fixCategory(result, categoriesCustomFieldsByCategory);
            }
        } catch (e) {
            nlapiLogExecution('error', '[FindYourCouncil] Error after:Category.get', e.message);
        }
    });

    Application.on('after:Category.getCategoryTree', function afterCategoryGetCategoryTree(model, result) {
        var categoriesIds = [];
        var categoriesCustomFieldsByCategory;

        try {
            _(result).forEach(function forEachCategory(category) {
                collectCategoriesIds(categoriesIds, category);
            });

            categoriesCustomFieldsByCategory = collectCategoryCustomFields(categoriesIds);

            _(result).forEach(function forEachCategory(category) {
                fixCategory(category, categoriesCustomFieldsByCategory);
            });
        } catch (e) {
            nlapiLogExecution('error', '[FindYourCouncil] Error after:Category.getCategoryTree', e.message);
        }
    });
});
