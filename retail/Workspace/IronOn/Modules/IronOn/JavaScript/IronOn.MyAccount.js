define('IronOn.MyAccount', [
    'IronOn.Cart.HideActions',
    'IronOn.Cart.AddToCart.Button.View',
    'IronOn.ProductViews.Price.View',
    'IronOn.CartConfirmation.View'
], function IronOn(
    IronOnCartHideActions
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var ironOnConfiguration = environment.getConfig('extensions').ironon;
            if (ironOnConfiguration) {
                IronOnCartHideActions.hideCartActions(container);
                IronOnCartHideActions.removeNavigationLink(layout);
            }
        }
    };
});
