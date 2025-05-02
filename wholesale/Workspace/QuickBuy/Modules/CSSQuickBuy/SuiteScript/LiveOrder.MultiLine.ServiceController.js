define('LiveOrder.MultiLine.ServiceController', [
    'ServiceController',
    'Application',
    'Models.Init',
    'LiveOrder.Model',
    'underscore'
], function ItemBadgesServiceController(
    ServiceController,
    Application,
    CommerceAPI,
    LiveOrderModel,
    _
) {

    'use strict';

    return ServiceController.extend({
        name:'LiveOrder.MultiLine.ServiceController',

        post: function() {
            if (!~this.request.getURL().indexOf('https') || CommerceAPI.session.isLoggedIn()) {
                LiveOrderModel.addMultipleItems(_.isArray(this.data) ? this.data : [this.data]);

                this.sendContent(LiveOrderModel.get() || {});
            }
        }
    });
});
