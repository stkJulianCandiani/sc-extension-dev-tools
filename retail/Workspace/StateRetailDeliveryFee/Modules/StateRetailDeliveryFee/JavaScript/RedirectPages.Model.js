define('RedirectPages.Model', [
    'Utils',
    'Backbone'
], function RedirectPagesModel(
    Utils,
    Backbone
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/RedirectPages.Service.ss'))
    });
});
