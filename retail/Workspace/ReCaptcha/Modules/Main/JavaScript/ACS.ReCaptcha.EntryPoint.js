define('ACS.ReCaptcha.EntryPoint', [
    'ACS.ReCaptcha.TermsAndConditionsHook',
    'ACS.ReCaptcha.GuestCheckoutHook',
    'ACS.ReCaptcha.LoginHook',
    'ACS.ReCaptcha.OrderSubmitHook',
    'ACS.ReCaptcha.RegistrationHook',
    'ACS.ReCaptcha.ForgotPasswordHook'
], function ACSReCaptchaEntryPoint(
    TermsAndConditions,
    GuestCheckout,
    Login,
    OrderSubmit,
    Registration
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            // The 3 Account session actions:
            GuestCheckout.mountToApp(application);
            Login.mountToApp(application);
            Registration.mountToApp(application);

            // Terms and conditions handling for Register/login page
            TermsAndConditions.mountToApp(application);

            // Checkout
            OrderSubmit.mountToApp(application);
        }
    };
});
