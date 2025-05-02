define('StateRetailDeliveryFee.Helper', [
    'SC.Configuration',
    'underscore'
], function StateRetailDeliveryFeeHelper(
    Configuration,
    _
) {
    'use strict';

    /* globals request, nlapiGetWebContainer */

    return {
        taxFeeinformation: function taxFeeinformation(lines) {
            var items;
            var feeList = Configuration.get('stateRetailDeliveryFee.list');
            var feeinformation = {};
            if (lines && lines.length > 0) {
                items = lines.models;
                _.each(items, function iterateItems(item) {
                    _.each(feeList, function eachFeeItetation(list) {
                        if (parseInt(list.itemID, 10) === parseInt(item.get('item').get('internalid'), 10)) {
                            feeinformation = {
                                state: item.get('item').get('custitem_surcharge_state_name'),
                                msg: item.get('item').get('custitem_surcharge_summary_message'),
                                value: item.get('item').get('custitem_surcharge_amount'),
                                feeApplied: true
                            }
                        }
                    });
                })
            }
            return JSON.stringify(feeinformation);
        }
    }
});
