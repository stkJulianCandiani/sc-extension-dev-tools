define('ShipMethodsSorting.OrderWizard.Module.Shipmethod', [
    'OrderWizard.Module.Shipmethod',
    'OrderWizard.Module.ShowShipments',
    'ShipMethodsSorting.Helper',
    'Backbone',
    'Backbone.View.render'
], function ShipMethodsSortingOrderWizardModuleShipmethod(
    OrderWizardModuleShipmethod,
    OrderWizardModuleShowShipments,
    ShipMethodsSortingHelper,
    Backbone
) {
    'use strict';

    ShipMethodsSortingHelper.wrapGetContextToSortShipMethods(OrderWizardModuleShipmethod.prototype);

    OrderWizardModuleShipmethod.addExtraContextProperty = Backbone.View.addExtraContextProperty;
});
