/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('OrderWizard.Module.Donation.Popup', [
    'Wizard.Module',
    'order_wizard_donation_popup.tpl',
    'SC.Configuration',
    'Backbone.CompositeView',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModuleDonationPopup(
    WizardModule,
    orderWizardDonationPopupTpl,
    Configuration,
    BackboneCompositeView,
    _,
    jQuery
) {
    'use strict';

    return WizardModule.extend({

        template: orderWizardDonationPopupTpl,

        className: 'OrderWizard.Module.Roundup',

        events: {
            'click [name="donation"]': 'updateDonation',
            'click [data-action="start-donating"]': 'startDonating',
            'click [data-action="stop-donating"]': 'stopDonating'
        },

        title: 'Donate Your Change',

        initialize: function initialize() {
            WizardModule.prototype.initialize.apply(this, arguments);
            BackboneCompositeView.add(this);
        },

        // Determines if the current module is valid to be shown and operate with
        isActive: function isActive() {
            return true || Configuration.donation.enabled;
        },

        // eslint-disable-next-line consistent-return
        render: function render() {
            // Is Active is overridden by child modules, like Shipping to hide this module in Multi Ship To
            if (!this.isActive()) {
                this.$el.attr('class', '');
                return this.$el.empty();
            }
            this.trigger('ready', true);
            this._render();
        },

        startDonating: function startDonating() {
            var options = this.model.get('options');
            var viewsToRender = _.filter(this.wizard.getCurrentStep().moduleInstances, function filterViews(view) {
                return view.className === 'module-rendered round-up';
            });
            options.custbody_allow_donation = 'T';
            this.model.set('options', options).save().done(function afterOptionsSaved() {
                _.each(viewsToRender, function renderPopupView(actualView) {
                    actualView.render();
                });
                jQuery('.gs-icon-close').click();
            });
        },

        stopDonating: function stopDonating() {
            var options = this.model.get('options');
            var viewsToRender = _.filter(this.wizard.getCurrentStep().moduleInstances, function filterViews(view) {
                return view.className === 'module-rendered round-up';
            });
            options.custbody_allow_donation = 'F';
            this.model.set('options', options).save().done(function afterOptionsSaved() {
                _.each(viewsToRender, function renderPopupView(actualView) {
                    actualView.render();
                });
                jQuery('.gs-icon-close').click();
            });
        },

        eventHandlersOff: function eventHandlersOff() {},

        past: function past() {
            this.eventHandlersOff();
        },

        present: function present() {
            this.eventHandlersOff();
        },

        future: function future() {
            this.eventHandlersOff();
        },

        showError: function showError() {
            this.$('.control-group').addClass('error');
            WizardModule.prototype.showError.apply(this, arguments);
        },

        // onShownGiftCertificateForm
        // Handles the shown of promocode form
        onShownGiftCertificateForm: function onShownGiftCertificateForm(e) {
            jQuery(e.target).find('input[name="code"]').focus();
        },

        getContext: function getContext() {
            var rounded = Math.abs(this.model.get('summary').total -
                Math.ceil(this.model.get('summary').total)).toFixed(2);
            var allowDonation = this.model.get('options').custbody_allow_donation === 'T';
            return {
                roundedValue: rounded,
                allowDonation: allowDonation
            };
        }
    });
});
