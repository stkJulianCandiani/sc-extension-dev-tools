/*
	© 2021 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

define('FirstLevelCategory.Facets.Browse.CategoryHeading.View', [
    'Facets.Browse.CategoryHeading.View',
    'underscore'
], function FirstLevelCategoryFacetsBrowseCategoryHeadingView(
    FacetsBrowseCategoryHeadingView,
    _
) {
    'use strict';

    var viewPrototype = FacetsBrowseCategoryHeadingView.prototype;

    _(viewPrototype).extend({

        getContext: _.wrap(viewPrototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.metadescription = this.model.get('metadescription');
            return context;
        })
    });
});
