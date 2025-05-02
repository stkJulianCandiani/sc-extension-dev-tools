/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.Footer.Model', [
    'Backbone.CachedModel',
    'underscore'
], function StoreLocatorFooterModel(
    CachedModel,
    _
) {
    'use strict';

    return CachedModel.extend({
        // eslint-disable-next-line no-undef
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/StoreLocator.Footer.Service.ss'))
    });
});
