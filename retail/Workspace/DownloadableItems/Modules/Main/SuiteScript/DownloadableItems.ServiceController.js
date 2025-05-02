/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.ServiceController', [
    'ServiceController',
    'Models.Init',
    'DownloadableItems.Model'
], function DownlodableItemsServiceController(
    ServiceController,
    ModelsInit,
    DownlodableItemsModel
) {
    'use strict';

    // Controller needs Elevated permission to access DOCUMENTS and CUSTOMER
    return ServiceController.extend({
        name: 'DownloadableItems.ServiceController',

        options: {
            common: {
                requireLogin: true
            }
        },

        get: function get() {
            var id = this.request.getParameter('id');
            var page = this.request.getParameter('page');
            var fileData;
            var ret;

            if (id) {
                fileData = DownlodableItemsModel.get(id);

                if (fileData) {
                    this.response.setContentType(
                        fileData.file.getType(),
                        fileData.file.getName(),
                        'attachment'
                    );
                    this.response.write(fileData.file);

                    DownlodableItemsModel.finishDownload(fileData);
                } else {
                    ret = {
                        error: 'There are no remaining downloads for this file'
                    };
                }
            } else {
                ret = DownlodableItemsModel.list({ page: page || 1 });
            }

            return ret;
        }
    });
});
