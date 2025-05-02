/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.ServiceController', [
    'ServiceController',
    'CS.QuickOrder.Model'
], function CSQuickOrderServiceController(
    ServiceController,
    QuickOrderModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'CS.QuickOrder.ServiceController',

        get: function get() {
            var keyword = this.request.getParameter('keyword');
            this.sendContent(QuickOrderModel.get(keyword, this.request), {
                'cache': response.CACHE_DURATION_MEDIUM
            });
        }
    });
});
