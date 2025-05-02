/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.LiveOrder.MultiLine.ServiceController', [
    'ServiceController',
    'Application',
    'Models.Init',
    'LiveOrder.Model',
    'underscore'
], function CSQuickOrderLiveOrderMultiLineServiceController(
    ServiceController,
    Application,
    CommerceAPI,
    LiveOrderModel,
    _
) {
    'use strict';

    return ServiceController.extend({
        name: 'CS.QuickOrder.LiveOrder.MultiLine.ServiceController',

        post: function post() {
            // eslint-disable-next-line no-bitwise
            if ((this.request.getURL().indexOf('https') >= 0) || CommerceAPI.session.isLoggedIn2()) {
                LiveOrderModel.addMultipleItems(_.isArray(this.data) ? this.data : [this.data]);

                this.sendContent(LiveOrderModel.get() || {});
            }
        }
    });
});
