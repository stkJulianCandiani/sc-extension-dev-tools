/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.Donation.Main', [
    'OrderWizard.Module.Donation',
    'OrderWizard.Module.Donation.Popup',
    'Donation.OrderWizard.Module.CartSummary',
    'Donation.Tracker'
], function CSDonationMain(
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var checkout = container.getComponent('Checkout');
            if (checkout) {
                checkout.addModuleToStep({
                    step_url: 'billing',
                    module: {
                        id: 'donation',
                        index: 0,
                        classname: 'OrderWizard.Module.Donation',
                        options: { container: '#wizard-step-content' }
                    }
                });
            }
        }
    };
});
