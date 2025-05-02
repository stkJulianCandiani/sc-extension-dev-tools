define('ACS.ReCaptcha.LoginHook', [
    'ReCaptcha',
    'Backbone',
    'jQuery',
    'underscore'
], function ACSReCaptchaLoginHook(
    Recaptcha,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var loginRegisterComponent = application.getComponent('LoginRegisterPage');
            var layout = application.getComponent('Layout');
            var recaptcha = new Recaptcha({
                configKey: 'l'
            });

            layout.on('afterShowContent', function afterShowContent(viewName) {
                _.defer(function deferedShowContent() {
                    var $placeholder;
                    var $neighbor;
                    if (viewName !== 'LoginRegister.View') {
                        return;
                    }

                    $placeholder = jQuery('<div class="login-register-login-recaptcha"></div>');
                    $neighbor = jQuery('.login-register-login-form-messages');
                    $placeholder.insertAfter($neighbor);
                    recaptcha.attachTo($placeholder[0]);
                    loginRegisterComponent.on('beforeLogin', function beforeRegistration() {
                        var promise = jQuery.Deferred();
                        recaptcha.validate(function onSuccess() {
                            promise.resolve();
                        }, function onError(e) {
                            console.log(e);
                            promise.reject(e);
                        });
                        return promise;
                    });
                });
            });
        }
    };
});
