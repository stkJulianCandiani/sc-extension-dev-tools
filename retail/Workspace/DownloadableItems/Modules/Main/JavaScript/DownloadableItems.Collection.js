/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Collection', [
    'DownloadableItems.Model',
    'Backbone',
    'underscore'
], function DownloadableItemsCollection(
    DownloadableItemsModel,
    Backbone,
    _
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    return Backbone.Collection.extend({
        model: DownloadableItemsModel,

        url: _.getAbsoluteUrl(getExtensionAssetsPath('services/DownloadableItems.Service.ss')),

        parse: function parse(response) {
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;

            return response.records;
        },

        update: function update(options) {
            var data = { page: options.page };

            this.fetch({
                data: data,
                reset: true,
                killerId: options.killerId
            });
        }
    });
});
