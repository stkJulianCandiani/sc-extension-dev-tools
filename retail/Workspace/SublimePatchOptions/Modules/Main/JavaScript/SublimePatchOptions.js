define('SublimePatchOptions', [
    'SublimePatchOptions.View',
    'SublimePatchOptions.Cart.AddToCart.Button.View'
], function SublimePatchOptions(
    SublimePatchOptionsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            if (pdp) {
                pdp.addChildView('Product.Options', function addChildView() {
                    return new SublimePatchOptionsView({
                        container: container
                    });
                });
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'Product.Options': {
                        'SublimePatchOptionsView': {
                            childViewIndex: 10,
                            childViewConstructor: function childViewConstructor() {
                                return new SublimePatchOptionsView({
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
