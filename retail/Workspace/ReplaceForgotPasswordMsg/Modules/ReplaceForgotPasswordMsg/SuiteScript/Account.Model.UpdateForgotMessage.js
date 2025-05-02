define('Account.Model.UpdateForgotMessage', [
    'Account.ForgotPassword.ServiceController',
    'Configuration',
    'underscore'
], function LiveOrderModelFreeShipMethods(
    AccountForgotPasswordServiceController,
    Configuration,
    _
) {
    'use strict';

    _.extend(AccountForgotPasswordServiceController, {
        processError: _.wrap(AccountForgotPasswordServiceController.processError, function getShipMethods(fn) {
            var error = fn.apply(this, _.toArray(arguments).slice(1));
            if (error && error.errorCode === 'ERR_WS_RECORD_NOT_FOUND') {
                // eslint-disable-next-line max-len
                error.errorMessage = Configuration.get().checkoutApp.forgotPasswordMessage || 'If an account for this email exists, we have sent a link to reset the password.';
            }
            return error;
        })
    });
});
