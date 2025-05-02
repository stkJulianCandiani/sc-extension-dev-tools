define('DownloadableItems.Collection', [
    'DownloadableItems.Model',
    'Backbone',
    'Utils'
], function DownloadableItemsCollection(
    Model,
    Backbone,
    Utils
) {
    'use strict';

    return Backbone.Collection.extend({
        model: Model,
        url: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/DownloadableItems.Service.ss')),
        parse: function (response) {
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;

            return response.records;
        },
        update: function (options) {
            var data = { page: options.page };

            this.fetch({
                data: data,
                reset: true,
                killerId: options.killerId
            });
        }
    });
});
