define('ACS.ReCaptcha.OrderSubmitHook', [
    'ACS.ReCaptcha.Checkout.OrderWizard.Module'
], function ACSReCaptchaOrderSubmitHook(
    Module
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var checkout = application.getComponent('Checkout');
            checkout.addModuleToStep({
                step_url: 'review',
                module: {
                    id: 'acscaptcharesponse',
                    index: 99,
                    classname: 'ACS.ReCaptcha.Checkout.OrderWizard.Module',
                    options: {
                        container: '#wizard-step-content-right'
                    }
                }
            });
            Module.prototype.cart = application.getComponent('Cart');
            Module.prototype.checkout = checkout;
        }
    };
});
