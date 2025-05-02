define('ShipMethodsSorting.OrderWizard.Module.ShowShipments', [
    'OrderWizard.Module.ShowShipments',
    'ShipMethodsSorting.Helper'
], function ShipMethodsSortingOrderWizardModuleShowShipments(
    OrderWizardModuleShowShipments,
    ShipMethodsSortingHelper
) {
    'use strict';

    ShipMethodsSortingHelper.wrapGetContextToSortShipMethods(OrderWizardModuleShowShipments.prototype);
});
