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
        name: 'DownlodableItems.ServiceController',
        options: {
            common: {
                requireLogin: true
            }
        },
        get: function get() {
            var id = this.request.getParameter('id');
            var page = this.request.getParameter('page');
            var fileData;

            if (id) {
                fileData = DownlodableItemsModel.get(id);
                this.response.setContentType(
                    fileData.file.getType(),
                    fileData.file.getName(),
                    'attachment'
                );
                this.response.write(fileData.file);
                DownlodableItemsModel.finishDownload(fileData);
                return null; // to avoid controller returning json
            }
            return DownlodableItemsModel.list({ page: page || 1 });
        }
    });
});
