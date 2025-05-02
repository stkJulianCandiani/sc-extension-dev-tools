define('ACS.ReCaptcha.Cart.Hook', [
    'Application',
    'ReCaptcha.Configuration.Model',
    'ReCaptcha.Adapter',
    'ReCaptcha.Utils'
], function ACSReCaptchaCartHook(
    Application,
    Configuration,
    Adapter,
    Utils
) {
    'use strict';

    /* CartComponent beforeSubmit is NOT working! */
    Application.on('before:LiveOrder.submit', function onBeforeSubmitListener(Model, threedsecure) {
        var config = Configuration.get();
        var result;
        var customFieldValues;
        var recaptchaField;
        var recaptchaValue;

        if (threedsecure === true) {
            nlapiLogExecution('ERROR', 'RECAPTCHA_THREED', 'Skipped - 3ds');
            return;
        }
        if (config.enabled && config.o) {
            // eslint-disable-next-line no-undef
            customFieldValues = nlapiGetWebContainer()
                .getShoppingSession()
                .getOrder()
                .getCustomFieldValues();

            recaptchaField = Utils.getCollectionObjectByPropertyValue(
                customFieldValues || [],
                'name',
                'custbody_acs_wr_rc_response'
            );

            recaptchaValue = recaptchaField && recaptchaField.value;
            result = Adapter.validate('checkout', recaptchaValue);
            if (!result.success) {
                throw result;
            }
        }
    });
});
