define('ReCaptcha.Adapter', [
    'ReCaptcha.Configuration.Model',
    'ReCaptcha.Utils'
],
function ReCaptchaModel(
    Configuration,
    Utils
) {
    'use strict';

    return {
        validate: function validate(action, captchaResponse) {
            var responseBody;
            var responseObj;
            var config = Configuration.get(true);
            var captchaValidationUrl = config.siteVerifyAPI;

            var requestBody = {
                secret: config.secretKey,
                response: captchaResponse,
                remoteip: config.ip ? (Utils.getIPSafe() || undefined) : undefined
            };

            if (!captchaResponse) {
                if (config.logFailure) {
                    nlapiLogExecution('ERROR', 'RECAPTCHA_NONE', JSON.stringify({
                        ipAddress: Utils.getIPSafe(),
                        ua: Utils.getUserAgentSafe(),
                        action: action
                    }));
                }
                throw this.buildAnswer(false, 400, 'NO_CAPTCHA', 'Please validate captcha.');
            }

            try {
                responseObj = nlapiRequestURL(
                    captchaValidationUrl,
                    requestBody, // Important: form-encoded. NOT JSON
                    'POST'
                );
                responseBody = JSON.parse(responseObj.getBody());
            } catch (e) {
                nlapiLogExecution('ERROR', 'Error calling recaptcha-error', e);
                nlapiLogExecution('ERROR', 'Error calling recaptcha-user', JSON.stringify({
                    ipAddress: Utils.getIPSafe(),
                    ua: Utils.getUserAgentSafe(),
                    action: action
                }));
                responseBody = {};
            }

            if (!responseBody.success) {
                if (config.logFailure) {
                    nlapiLogExecution('ERROR', 'RECAPTCHA_FAILURE', JSON.stringify({
                        ipAddress: Utils.getIPSafe(),
                        ua: Utils.getUserAgentSafe(),
                        action: action,
                        responseMessage: responseBody
                    }));
                }
                throw this.buildAnswer(false, 400, 'ERROR', 'Error trying to validate ReCaptcha.');
            }

            if (config.logSuccess) {
                nlapiLogExecution('ERROR', 'RECAPTCHA_SUCCESS', JSON.stringify({
                    ipAddress: Utils.getIPSafe(),
                    ua: Utils.getUserAgentSafe(),
                    action: action,
                    responseMessage: responseBody
                }));
            }
            return this.buildAnswer(true, 'OK', 'ReCaptcha Validated');
        },
        buildAnswer: function buildErrorAnswer(success, status, code, message) {
            return {
                success: success,
                status: status,
                code: code,
                message: message
            };
        }
    };
});
