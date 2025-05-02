define('ACS.ReCaptcha.ForgotPasswordHook', [
    'LoginRegister.ForgotPassword.View',
    'Backbone.View',
    'ReCaptcha',
    'jQuery',
    'underscore'
], function ACSReCaptchaForgotPasswordHook(
    LoginRegisterForgotPasswordView,
    BackboneView,
    Recaptcha,
    jQuery,
    _
) {
    'use strict';

    _.extend(LoginRegisterForgotPasswordView.prototype, {

        initialize: _.wrap(LoginRegisterForgotPasswordView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.recaptcha = new Recaptcha({
                configKey: 'f'
            });
            this.options.application.getLayout().once('afterAppendView', function afterAppendToDom() {
                var $placeholder;
                var $neighbor;
                $placeholder = jQuery('<div class="login-register-forgot-your-password-recaptcha"></div>');
                $neighbor = self.$('.login-register-forgot-password-form-input');
                $placeholder.insertAfter($neighbor);
                self.recaptcha.attachTo($placeholder[0]);
            });
        }),

        events: _.extend(LoginRegisterForgotPasswordView.prototype.events, {
            'submit form': 'submitForm'
        }),

        render: _.wrap(LoginRegisterForgotPasswordView.prototype.render, function saveForm(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
        }),

        validateCaptcha: function validateCaptcha() {
            var promise = jQuery.Deferred();
            this.recaptcha.validate(function onSuccess() {
                promise.resolve();
            }, function onError(e) {
                console.log(e);
                promise.reject(e);
            });
            return promise;
        },

        submitForm: function submitForm(e, model, props) {
            var self = this;
            e.preventDefault();
            return this.validateCaptcha().then(function then() {
                self.saveForm(e, model, props);
            });
        }
    });
});
