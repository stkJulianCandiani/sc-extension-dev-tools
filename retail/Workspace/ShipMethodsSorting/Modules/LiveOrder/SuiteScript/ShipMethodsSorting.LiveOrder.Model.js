define('ShipMethodsSorting.LiveOrder.Model', [
    'LiveOrder.Model',
    'underscore'
], function ShippingMethodsSorting(
    LiveOrderModel,
    _
) {
    'use strict';

    _(LiveOrderModel).extend({
        ShippingMethodsSortingField: {
            id: 'customrecord_ship_method_order_sca',
            fields: {
                shippingMethod: 'custrecord_shipping_method_order_method',
                order: 'custrecord_shipping_method_order_order'
            }
        },

        getFilters: function getShippingMethodsFilters() {
            var filters = [];
            filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
            return filters;
        },

        getColumns: function getShippingMethodsSortingColumns() {
            var columns = [];
            columns.push(new nlobjSearchColumn(this.ShippingMethodsSortingField.fields.shippingMethod));
            columns.push(new nlobjSearchColumn(this.ShippingMethodsSortingField.fields.order));
            return columns;
        },

        getShippingMethodSorting: function getShippingMethodSorting() {
            var result = nlapiSearchRecord(this.ShippingMethodsSortingField.id, null, this.getFilters(), this.getColumns());
            var response = [];
            var self = this;
            _.each(result, function eachShippingMethodsSorting(shipMethodSorting) {
                response.push({
                    method: shipMethodSorting.getValue(self.ShippingMethodsSortingField.fields.shippingMethod),
                    order: shipMethodSorting.getValue(self.ShippingMethodsSortingField.fields.order)
                });
            });

            return response;
        },

        getShipMethods: _.wrap(LiveOrderModel.getShipMethods, function getShipMethods(fn) {
            var shippingMethods = fn.apply(this, _.toArray(arguments).slice(1));
            var shippingMethodsSorting = this.getShippingMethodSorting();
            try {
                _.each(shippingMethods, function eachShippingMethodsSorting(shipMethod) {
                    var shippingMethodSortingInformation = _.find(shippingMethodsSorting, function findShipMethod(shipMethodSortingObj) {
                        return shipMethod.internalid === shipMethodSortingObj.method;
                    });

                    if (shippingMethodSortingInformation) {
                        shipMethod.order = shippingMethodSortingInformation.order;
                    }
                });
            } catch (exc) {
                nlapiLogExecution('ERROR', 'Shipping Method Order Extension Error', JSON.stringify(exc));
            }
            return shippingMethods;
        })
    });

    return LiveOrderModel;
});
