function service(request, response) {
    'use strict';
    try {
        require('DownloadableItems.ServiceController').handle(request, response);
    } catch (ex) {
        console.log('DownloadableItems.ServiceController ', ex);
        var controller = require('ServiceController');
        controller.response = response;
        controller.request = request;
        controller.sendError(ex);
    }
}
