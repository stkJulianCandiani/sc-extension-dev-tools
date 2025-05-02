define('ACS.ReCaptcha.GuestCheckoutHook', [
    'ReCaptcha',
    'jQuery',
    'underscore'
], function ACSReCaptchaGuestCheckoutHook(
    Recaptcha,
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var recaptcha = new Recaptcha({
                configKey: 'g'
            });

            layout.on('afterShowContent', function afterShowContent(viewName) {
                var $form;
                var isCallReady = false;
                var $placeholder;
                var $neighbor;
                if (viewName !== 'LoginRegister.View') {
                    return;
                }
                _.defer(function deferShowContent() {
                    $placeholder = jQuery('<div class="login-register-checkout-as-guest-form-recaptcha-placeholder"></div>');
                    $neighbor = jQuery('.login-register-checkout-as-guest-form-messages');
                    $placeholder.insertAfter($neighbor);

                    recaptcha.attachTo($placeholder[0]);
                    $form = jQuery('.login-register-checkout-as-guest-form');

                    // No "beforeGuestCheckout" event - so using jQuery to hook instead
                    $form.submit(function wrapWithRecaptcha() {
                        if (isCallReady === true) {
                            return true;
                        }
                        recaptcha.validate(
                            function onValidatedCaptcha() {
                                isCallReady = true;
                                $form.submit();
                                isCallReady = false;
                            },
                            function onReCaptchaAbort(e) {
                                console.error(e);
                            }
                        );
                        return false;
                    });
                });
            });
        }
    };
});
