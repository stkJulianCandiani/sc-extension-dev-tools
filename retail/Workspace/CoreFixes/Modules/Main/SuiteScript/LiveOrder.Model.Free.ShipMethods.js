/*
    © 2021 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('LiveOrder.Model.Free.ShipMethods', [
    'Application',
    'underscore'
], function LiveOrderModelFreeShipMethods(
    Application,
    _
) {
    'use strict';

    Application.on('after:LiveOrder.getShipMethods', function afterLiveOrderGetShipMethods(model, ret) {
        _.each(ret, function eachShipMethop(shipMethod) {
            shipMethod.rate_formatted = shipMethod.rate === 0 ? 'Free!' : shipMethod.rate_formatted;
        });

        return ret;
    });
});
