define('RedirectPages.Model', [
    'SC.Model',
    'underscore'
], function RedirectPagesModel(
    SCModel,
    _
) {
    'use strict';

    var session = nlapiGetWebContainer().getShoppingSession();
    return SCModel.extend({
        name: 'RedirectPages',

        get: function get(url) {
            var redirectUrl = '';
            if (url) {
                redirectUrl = session.getRedirectURL(url);
            }
            return { redirectUrl: redirectUrl };
        }
    });
});
