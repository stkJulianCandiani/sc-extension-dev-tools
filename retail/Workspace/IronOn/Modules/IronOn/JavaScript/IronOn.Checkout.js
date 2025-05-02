define('IronOn.Checkout', [
    'IronOn.Cart.HideActions',
    'OrderWizard.Module.ShowShipments',
    'underscore',
    'Backbone',
    'Backbone.View.render',
    'IronOn.Cart.AddToCart.Button.View',
    'IronOn.ProductViews.Price.View',
    'IronOn.CartConfirmation.View'
], function IronOn(
    IronOnCartHideActions,
    OrderWizardModuleShowShipments,
    _,
    Backbone
) {
    'use strict';

    function filterShippingMethods(shippingMethods, lines, ironOnConfiguration, mainPatchOption) {
        var acceptedShippingMethods = ironOnConfiguration.acceptedShippingMethods;
        var hasIronOnItems = false;
        var hasMonogramItems = false;
        var shippingMethodsFiltered = shippingMethods;
        if (acceptedShippingMethods) {
            _.each(lines, function eachLine(line) {
                _.each(line.options, function eachOption(option) {
                    if ((option.cartOptionId === ironOnConfiguration.lineIdItemOption || option.cartOptionId === mainPatchOption) && option.value && option.value.internalid) {
                        hasIronOnItems = true;
                    }
                    if (option.cartOptionId === 'custcol_acs_monogram_line_id' && option.value && option.value.internalid) {
                        hasMonogramItems = true;
                    }
                });
            });
            if (hasIronOnItems || hasMonogramItems) {
                shippingMethodsFiltered = _.filter(shippingMethods, function filterMethods(shipMethods) {
                    return parseInt(acceptedShippingMethods, 10) === parseInt(shipMethods.internalid, 10);
                });
            }
        }
        return shippingMethodsFiltered;
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var ironOnConfiguration = environment.getConfig('extensions').ironon;
            var sublimePatchOptions = environment.getConfig('sublimePatchOptions');
            var mainPatchOption = sublimePatchOptions ? sublimePatchOptions.mainPatchOption : 'custcol_sublim_patch_tagline';
            if (ironOnConfiguration) {
                IronOnCartHideActions.hideCartActions(container);
                IronOnCartHideActions.removeNavigationLink(layout);


                OrderWizardModuleShowShipments.addExtraContextProperty = Backbone.View.addExtraContextProperty;

                layout.addToViewContextDefinition('OrderWizard.Module.ShowShipments', 'shippingMethods', 'object', function shippingMethodsShow(context) {
                    var shippingMethods = context.shippingMethods;
                    var lines = context.model.lines;
                    shippingMethods = filterShippingMethods(shippingMethods, lines, ironOnConfiguration, mainPatchOption);
                    return shippingMethods;
                });

                layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'shippingMethods', 'object', function shippingMethodsShowShip(context) {
                    var shippingMethods = context.shippingMethods;
                    var lines = context.model.lines;
                    shippingMethods = filterShippingMethods(shippingMethods, lines, ironOnConfiguration, mainPatchOption);
                    return shippingMethods;
                });
                layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'hasShippingMethods', 'boolean', function hasShippingMethods(context) {
                    var shippingMethods = context.shippingMethods;
                    var lines = context.model.lines;
                    shippingMethods = filterShippingMethods(shippingMethods, lines, ironOnConfiguration, mainPatchOption);
                    return !!shippingMethods.length;
                });
                layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'showSelectForShippingMethod', 'boolean', function showMethod(context) {
                    var shippingMethods = context.shippingMethods;
                    var lines = context.model.lines;
                    shippingMethods = filterShippingMethods(shippingMethods, lines, ironOnConfiguration, mainPatchOption);
                    return shippingMethods.length > 5;
                });
            }
        }
    };
});
