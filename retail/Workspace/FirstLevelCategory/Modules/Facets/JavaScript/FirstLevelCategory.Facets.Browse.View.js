/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Facets.Browse.View', [
    'Facets.Browse.View',
    'underscore'
], function FirstLevelCategoryFacetsBrowseView(
    FacetsBrowseView,
    _
) {
    'use strict';

    var viewPrototype = FacetsBrowseView.prototype;

    _(viewPrototype).extend({
        getContext: _.wrap(viewPrototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var category = this.model.get('category');
            var environment = this.options.container.getComponent('Environment');
            var enabled = environment.getConfig('firstLevelCategory.enabled');
            if (category && !category.get('parenturl')) {
                context.isFirstLevel = enabled;
            }

            return context;
        })
    });
});
