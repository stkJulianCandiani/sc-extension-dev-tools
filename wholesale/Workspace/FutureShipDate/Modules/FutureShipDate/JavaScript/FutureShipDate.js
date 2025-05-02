define('FutureShipDate', [
    'FutureShipDate.View'
], function FutureShipDate(
    FutureShipDateView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var checkout = application.getComponent('Checkout');

            checkout.addModuleToStep({
                step_url: 'billing',
                module: {
                    id: 'FutureShipDateView',
                    index: 3,
                    classname: 'FutureShipDate.View'
                }
            });

            checkout.addModuleToStep({
                step_url: 'review',
                module: {
                    id: 'FutureShipDateView',
                    index: 6,
                    classname: 'FutureShipDate.View'
                }
            });
        }
    };
});
