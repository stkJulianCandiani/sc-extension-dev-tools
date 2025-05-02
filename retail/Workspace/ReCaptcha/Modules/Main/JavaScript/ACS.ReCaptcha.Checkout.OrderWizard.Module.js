define('ACS.ReCaptcha.Checkout.OrderWizard.Module', [
    'ReCaptcha',
    'jQuery',
    'ACS.ReCaptcha.Terms.View',
    'Wizard.Module',
    'underscore',
    'acs_recaptcha_checkout_order_wizard_module.tpl'
], function ACSReCaptchaCheckoutOrderWizardModule(
    ReCaptcha,
    jQuery,
    TermsView,
    WizardModule,
    _,
    acsRecaptchaCheckoutOrderWizardModuleTpl
) {
    'use strict';

    var Module = WizardModule.extend({
        template: acsRecaptchaCheckoutOrderWizardModuleTpl,
        childViews: {
            'ACS.OrderSubmit.TermsPlaceholder': function renderChildView() {
                return new TermsView({ mode: 'ordersubmit' });
            }
        },
        deferredInitialization: function deferredInitialization() {
            var self = this;
            this.recaptcha = new ReCaptcha({
                configKey: 'o'
            });
            self.cart.on('beforeSubmit', function beforeSubmitHandler() {
                var promise = jQuery.Deferred();
                // There are 2 order submit buttons.
                // Without this, in mobile, recaptcha shows funky when you click
                // on the button that is not inside the summary
                jQuery(document).on(
                    'focusin.acsrecaptchacheckout',
                    'iframe[src*="recaptcha"]',
                    function onFocusInOfRecaptcha(event) {
                        jQuery('html, body').animate({
                            scrollTop: jQuery(event.currentTarget).offset().top }, 500);
                    }
                );
                self.recaptcha.validate(
                    function onValidatedCaptcha(val) {
                        jQuery(document).off('.acsrecaptchacheckout');
                        self.$('[name="custbody_acs_wr_rc_response"]')
                            .val(val)
                            .trigger('change');
                        _.defer(function finalRender() {
                            promise.resolve();
                        });
                    },
                    function onError(e) {
                        jQuery(document).off('.acsrecaptchacheckout');
                        promise.reject(e);
                        _.defer(function onRecaptchaErrorScrollToMessage() {
                            jQuery('html, body').animate({
                                scrollTop: jQuery('[data-type="alert-placeholder-step"]').offset().top - 50 }, 500);
                        });
                    }
                );
                return promise;
            });
            this.checkout.on('afterShowContent', function afterShowContent() {
                jQuery.when(
                    self.checkout.getCurrentStep(),
                    self.recaptcha.getSetupPromise()
                ).then(function onStep(step) {
                    if (step.url === 'review') {
                        self.recaptcha.attachTo(self.$('#acs-recaptcha-checkout-placeholder')[0]);
                    }
                });
            });
        }
    });
    var originalRender = Module.prototype.render;

    Module.prototype.render = function render() {
        var self = this;
        var originalArgs = arguments;
        if (!this.recaptcha) {
            this.deferredInitialization();
        }
        originalRender.apply(self, originalArgs);
    };
    return Module;
});
