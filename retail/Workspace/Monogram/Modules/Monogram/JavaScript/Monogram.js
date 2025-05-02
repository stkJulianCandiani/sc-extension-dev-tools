define('Monogram', [
    'Monogram.View',
    'Monogram.Cart.AddToCart.Button.View',
    'Monogram.CartConfirmation.View'
], function Monogram(
    MonogramView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var monogramConfiguration = environment.getConfig('extensions').monogram;
            if (pdp && monogramConfiguration) {
                pdp.addChildView('Product.Options', function addChildView() {
                    return new MonogramView({
                        container: container
                    });
                });
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'Product.Options': {
                        'MonogramView': {
                            childViewIndex: 10,
                            childViewConstructor: function childViewConstructor() {
                                return new MonogramView({
                                    container: container
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});
