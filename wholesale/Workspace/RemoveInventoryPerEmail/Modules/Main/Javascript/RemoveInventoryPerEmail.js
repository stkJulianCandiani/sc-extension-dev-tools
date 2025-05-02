/* eslint-disable max-len */
define('RemoveInventoryPerEmail', [
    'Profile.Model',
    'SC.Configuration'
], function RemoveInventoryPerEmail(
    ProfileModel,
    Configuration
) {
    'use strict';

    function isValidEmail() {
        var profile = ProfileModel.getInstance();
        var customerEmail = profile.get('email');
        var emailEnding = Configuration.get('removeinventory.email') || '@girlscouts.org';
        return customerEmail.indexOf(emailEnding) > -1;
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            layout.addToViewContextDefinition('InventoryDisplay.ItemViews.Stock.View', 'isNotAvailableInStore', 'boolean', function isNotAvailableInStoreFn(context) {
                var isNotAvailableInStore = context.isNotAvailableInStore;
                if (!isValidEmail()) {
                    isNotAvailableInStore = false;
                }
                return isNotAvailableInStore;
            });

            layout.addToViewContextDefinition('InventoryDisplay.ItemViews.Stock.View', 'showOutOfStockMessage', 'boolean', function showOutOfStockMessageFn(context) {
                var showOutOfStockMessage = context.showOutOfStockMessage;
                if (!isValidEmail()) {
                    showOutOfStockMessage = false;
                }
                return showOutOfStockMessage;
            });

            layout.addToViewContextDefinition('InventoryDisplay.ItemViews.Stock.View', 'inStockMessageForPDP', 'boolean', function inStockMessageForPDPFn(context) {
                var inStockMessageForPDP = context.inStockMessageForPDP;
                if (!isValidEmail()) {
                    inStockMessageForPDP = false;
                }
                return inStockMessageForPDP;
            });
        }
    };
});
