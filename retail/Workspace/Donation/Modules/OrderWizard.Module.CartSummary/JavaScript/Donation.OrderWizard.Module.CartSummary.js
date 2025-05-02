/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Donation.OrderWizard.Module.CartSummary', [
    'OrderWizard.Module.CartSummary',
    'donation_order_wizard_cart_summary.tpl',
    'underscore'
], function DonationOrderWizardModuleCartSummary(
    OrderWizardModuleCartSummary,
    donationOrderWizardCartSummaryTpl,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleCartSummary.prototype, {

        template: donationOrderWizardCartSummaryTpl,

        getContext: _.wrap(OrderWizardModuleCartSummary.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var model = this._getModel();
            var summary = model.get('summary') || {};
            var options = model.get('options') ? model.get('options').custbody_total_amount_donation || 0 : 0;
            var donation = model.get('options') ? model.get('options').custbody_round_up_donation || 0 : 0;
            if (options || donation) {
                summary.donation_total = (parseFloat(options) + parseFloat(donation)).toFixed(2);
            }
            context.showDonation = !!summary.donation_total && (!this.options.isConfirmation);
            return context;
        })
    });
});
