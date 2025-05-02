define('StateRetailDeliveryFee.Helper', [
    'Application',
    'underscore'
], function StateRetailDeliveryFeeHelper(
    Application,
    _
) {
    'use strict';

    /* globals request, nlapiGetWebContainer */

    return {
        isShopping: function isShopping() {
            return nlapiGetWebContainer().getShoppingSession().isShoppingSupported() && (request.getHeader('X-SC-Touchpoint') === 'shopping' ||
                request.getParameter('X-SC-Touchpoint') === 'shopping');
        },

        isCustomerTaxable: function isCustomerTaxable(order) {
            var customFields = order.getCustomFields();
            var taxCustomField = _.findWhere(customFields, { name: 'custbody_is_customer_taxable'} );
            var isCustomerTaxable = taxCustomField && taxCustomField.value;
            return isCustomerTaxable && isCustomerTaxable === 'T';
        },

        addItem: function addItem(itemID, order) {
            order.addItem({ internalid: itemID, quantity: 1 });
        },

        allItemsAreExempt: function allItemsAreExempt(lines) {
            return _.all(lines, function allLines(item) {
                return item.itemtype === 'Service' || item.itemtype === 'GiftCert' || item.itemtype === 'DwnLdItem';
            });
        },

        stateFeeApplicable: function stateFeeApplicable(state, deliveryFeeList) {
            var stateFee = [];
            if (deliveryFeeList) {
                _.each(deliveryFeeList, function eachDeliveryFee(fee) {
                    if (fee.stateCode.toUpperCase() === state) {
                        stateFee = fee;
                    }
                })
            }
            return stateFee;
        },

        removeItems: function removeItems(deliveryFeeList, items, order, instance) {
            var shouldRemove = instance && instance === 'checkout';
            if (( this.isShopping() || shouldRemove) && deliveryFeeList && items) {
                _.each(items, function eachItemIteration(item) {
                    var removedItems = [];
                    _.each(deliveryFeeList, function eachFeeItetation(state) {
                        if (state.itemID === item.internalid && !_.contains(removedItems, item.orderitemid)) {
                            order.removeItem(item.orderitemid);
                            removedItems.push(item.orderitemid);
                        }
                    });
                });
            }
        }
    }
});
