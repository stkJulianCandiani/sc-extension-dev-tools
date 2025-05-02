/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Categories', [
    'Categories',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function CouncilCategories(
    Categories,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var reSortCategories = function reSortCategories(memo) {
        var categories = memo;

        if (!memo) {
            categories = SC.CATEGORIES;
        }

        categories = _.sortBy(categories, function sortCategories(category) {
            return parseInt(category.sequencenumber, 10);
        });

        _.each(categories, function eachCategory(category) {
            if (category.categories && category.categories.length) {
                category.categories = reSortCategories(category.categories);
            }
        });

        return categories;
    };

    return _(Categories).extend({

        makeNavigationTab: function makeNavigationTab(categories) {
            var result = [];
            var self = this;

            _.each(categories, function eachCategory(category) {
                var href = category.fullurl;
                var color = category.custrecord_color_category;
                var tab;
                var largeWords;
                var extraClass = '';

                largeWords = jQuery.trim(category.name).split(' ').length;

                if (largeWords > 1) {
                    extraClass = 'multiple-words';
                }

                if (color && color !== 'None') {
                    color = color.replace(/([A-Z])/g, '-$1').toLowerCase();
                } else {
                    color = null;
                }

                color = (color && color[0] !== '-') ? '-' + color : color;

                tab = {
                    'href': href,
                    'text': category.name,
                    'data': {
                        hashtag: '#' + href,
                        touchpoint: 'home'
                    },
                    'class': 'header-menu-level' + category.level + '-anchor ' + extraClass,
                    'color': color,
                    'thumbnailurl': category.thumbnailurl,
                    'description': category.description,
                    'data-type': 'commercecategory',
                    'data-sequencenumber': category.sequencenumber
                };

                if (category.categories) {
                    tab.categories = self.makeNavigationTab(category.categories);
                }

                result.push(tab);
            });

            return result;
        },

        mountToApp: function mountToApp(application) {
            var self = this;
            var categories = reSortCategories();

            if (Configuration.get('categories')) {
                this.application = application;
                this.application.waitForPromise(this.categoriesPromise);

                _.each(categories, function eachCategories(category) {
                    self.topLevelCategories.push(category.fullurl);
                });

                // Filter council categories
                categories = _.reject(categories, function reject(category) {
                    return category.custrecord_council_category === 'T';
                });

                this.addToNavigationTabs(categories);
                this.categoriesPromise.resolve();
            }
        }
    });
});
