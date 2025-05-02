/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
*/

define('LiveOrder.Model.MultiLine', [
    'LiveOrder.Model',
    'Application',
    'underscore'
], function LiveOrderModelMultiLine(
    LiveOrderModel,
    Application,
    _
) {
    'use strict';

    _.extend(LiveOrderModel, {
        addMultipleItems: function addMultipleItems(linesData) {
            var responses = {};
            var i = 0;

            _.each(linesData, function (lineData) {
                var lineId;
                var error;

                try {
                    lineId = order.addItem({
                        internalid: lineData.item.internalid.toString(),
                        quantity: _.isNumber(lineData.quantity) ? parseInt(lineData.quantity, 10) : 1,
                        options: lineData.options || {}
                    });
                } catch (e) {
                    // error = e;
                    if (e instanceof nlobjError) {
                        error = {
                            code: e.getCode(),
                            message: e.getDetails()
                        };
                    } else {
                        error = {
                            code: 500,
                            message: 'Unknown'
                        };
                    }
                }

                responses[lineData.referenceLine] = lineId || error;
            });
            Application.on('after:LiveOrder.get', function(Model, response) {
                response.multilineResponse = responses;
            });
        }
    });
});
