define('FAQ.Collection', [
    'Backbone',
    'underscore',
    'Utils'
], function FAQModel(
    Backbone,
    _
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    return Backbone.Collection.extend({
        url: _.getAbsoluteUrl(getExtensionAssetsPath('services/FAQ.Service.ss'))
    });
});
