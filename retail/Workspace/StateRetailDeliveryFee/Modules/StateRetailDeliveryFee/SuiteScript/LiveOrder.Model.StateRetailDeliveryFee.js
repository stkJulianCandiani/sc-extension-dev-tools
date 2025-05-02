define('LiveOrder.Model.StateRetailDeliveryFee', [
    'Application',
    'StateRetailDeliveryFee.Helper',
    'underscore',
    'LiveOrder.Model',
    'RedirectPages.ServiceController',
], function LiveOrderModelStateRetailDeliveryFee(
    Application,
    Helper,
    _,
    LiveOrderModel
) {
    'use strict';

    /* eslint-disable global-require, no-console */
    var Configuration;
    try {
        Configuration = require('Configuration');
    } catch (e) {
        console.warn('[Configuration]', e);
    }
    /* eslint-enable global-require, no-console */
    var order = nlapiGetWebContainer().getShoppingSession().getOrder();
    var items = order.getItems(['internalid']);
    var deliveryFeeList;
    var isCustomerTaxable = Helper.isCustomerTaxable(order);
    if (Configuration) {
        deliveryFeeList = Configuration.get('stateRetailDeliveryFee.list');
    }
    Helper.removeItems(deliveryFeeList, items, order);

    Application.on('after:LiveOrder.update', function afterGet() {
        var shippingAddress;
        var state;
        var isFeeApplicable;
        var hasFeeApplied;
        var liveOrder;
        var lines;
        var allItemsExempt;
        if (!Helper.isShopping()) {
            shippingAddress = order.getShippingAddress();
            state = shippingAddress && shippingAddress.state;
            isFeeApplicable = Helper.stateFeeApplicable(state, deliveryFeeList);
            hasFeeApplied = isFeeApplicable && _.findWhere(items, { 'internalid': isFeeApplicable.itemID });
            liveOrder = LiveOrderModel.get();
            lines = liveOrder.lines;
            allItemsExempt = Helper.allItemsAreExempt(lines);
            if (shippingAddress && !_.isEmpty(isFeeApplicable) && isCustomerTaxable) {
                if (!hasFeeApplied && !allItemsExempt) {
                    Helper.addItem(isFeeApplicable.itemID, order);
                }
            }
            if (shippingAddress && _.isEmpty(isFeeApplicable) && isCustomerTaxable) {
                if (deliveryFeeList && items) {
                    Helper.removeItems(deliveryFeeList, items, order, 'checkout');
                }
            }
        }
    });
});
