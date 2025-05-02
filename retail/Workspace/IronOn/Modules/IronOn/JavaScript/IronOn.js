define('IronOn', [
    'IronOn.View',
    'IronOn.Cart.HideActions',
    'IronOn.Cart.AddToCart.Button.View',
    'IronOn.ProductViews.Price.View',
    'IronOn.CartConfirmation.View'
], function IronOn(
    IronOnView,
    IronOnCartHideActions
) {
    'use strict';

    function hideWishlistForIronOn(pdp, ironOnConfiguration) {
        pdp.addToViewContextDefinition('ProductDetails.Full.View', 'isIronOnItem', 'boolean', function addToViewContextDefinition(context) {
            var isIronOnItem = false;
            try {
                isIronOnItem = context.model.item[ironOnConfiguration.troopNumeralField] || context.model.item.custitem_acs_enable_monogram;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
            return isIronOnItem;
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var ironOnConfiguration = environment.getConfig('extensions').ironon;
            if (pdp && ironOnConfiguration) {
                pdp.addChildView('Product.Options', function addChildView() {
                    return new IronOnView({
                        container: container
                    });
                });
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'Product.Options': {
                        'IronOnView': {
                            childViewIndex: 10,
                            childViewConstructor: function childViewConstructor() {
                                return new IronOnView({
                                    container: container
                                });
                            }
                        }
                    }
                });
                hideWishlistForIronOn(pdp, ironOnConfiguration);
                IronOnCartHideActions.hideCartActions(container);
            }
        }
    };
});
