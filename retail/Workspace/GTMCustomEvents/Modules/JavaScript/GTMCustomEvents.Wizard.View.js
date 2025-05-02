define('GTMCustomEvents.Wizard.View', ['GoogleTagManager', 'Wizard.View'], function (GoogleTagManager, WizardView) {
    'use strict';

    _.extend(WizardView.prototype, {
        submit: _.wrap(WizardView.prototype.submit, function initialize(fn, e) {
            fn.apply(this, _.toArray(arguments).slice(1));

            var currentStep = this.wizard.getCurrentStep();

            this.triggerGTMEvent(currentStep);
        }),
        initialize: _.wrap(WizardView.prototype.initialize, function initialize(fn, e) {
            fn.apply(this, _.toArray(arguments).slice(1));

            if (this.currentStep.step_url.match('review')) {
                this.triggerGTMEvent(this.currentStep);
            }
        }),
        triggerGTMEvent: function (currentStep) {
            if (currentStep.step_url.match('shipping')) {
                GoogleTagManager.trackCheckoutAddShippingInfo(this.model);
            }

            if (currentStep.step_url.match('billing')) {
                var paymentmethod = $('.order-wizard-paymentmethod-selector-module-button.selected').attr('value');
                localStorage.setItem('paymentmethod', paymentmethod);

                GoogleTagManager.trackCheckoutAddPaymentInfo(this.model);
            }

            if (currentStep.step_url.match('review')) {
                GoogleTagManager.trackCheckoutReview(this.model);
            }
        },
    });
});
