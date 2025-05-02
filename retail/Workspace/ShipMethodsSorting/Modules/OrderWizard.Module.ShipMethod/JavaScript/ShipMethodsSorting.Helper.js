define('ShipMethodsSorting.Helper', [
    'underscore'
], function ShipMethodsSortingOrderWizardModuleShowShipments(
    _
) {
    'use strict';

    var getShippingMethodsList = function getShippingMethodsList(shippingMethodModel) {
        return shippingMethodModel.get('shipmethods').map(function mapShipMethods(shipmethod) {
            return {
                name: shipmethod.get('name'),
                rate_formatted: shipmethod.get('rate_formatted'),
                internalid: shipmethod.get('internalid'),
                isActive: shipmethod.get('internalid') === shippingMethodModel.get('shipmethod'),
                order: shipmethod.get('order')
            };
        });
    };

    var sortShippingMethodsByOrderField = function sortShippingMethodsByOrderField(shippingMethodsList) {
        return _.sortBy(shippingMethodsList, function sortShipMethods(method) {
            return method.order;
        });
    };

    return {
        wrapGetContextToSortShipMethods: function wrapGetContextToSortShipMethods(viewPrototype) {
            _.extend(viewPrototype, {
                getContext: _.wrap(viewPrototype.getContext, function getContext(fn) {
                    var response = fn.apply(this, _.toArray(arguments).slice(1));
                    var shippingMethodsList = getShippingMethodsList(this.model);
                    try {
                        response.shippingMethods = sortShippingMethodsByOrderField(shippingMethodsList);
                    } catch (exc) {
                        console.log('Error while trying to sort the shipping methods.');
                    }
                    return response;
                })
            });
        }
    };
});
