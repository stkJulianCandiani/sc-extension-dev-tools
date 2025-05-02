/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

/* eslint-disable eqeqeq */

define('OrderWizard.Module.Donation', [
    'Wizard.Module',
    'OrderWizard.Module.Donation.Popup',
    'order_wizard_donation_module.tpl',
    'SC.Configuration',
    'Backbone.CompositeView',
    'Item.Model',
    'LiveOrder.Line.Model',
    'Product.Model',
    'underscore',
    'jQuery',
    'Utils'
], function OrderWizardModuleDonation(
    WizardModule,
    RoundUpPopup,
    orderWizardRoundupModuleTpl,
    Configuration,
    BackboneCompositeView,
    ItemModel,
    LiveOrderLineModel,
    ProductModel,
    _,
    jQuery
) {
    'use strict';

    var defaultRoundUpDonationItem = '';
    var defaultCustomDonationItem = '180004';

    return WizardModule.extend({
        template: orderWizardRoundupModuleTpl,

        className: 'OrderWizard.Module.Donation',

        events: {
            'click [name="donation"]': 'updateDonation',
            'click [data-action="learnmore"]': 'learnMore',
            'click [data-action="roundup"]': 'roundUp',
            'click [data-action="removeDonation"]': 'removeItem',
            'blur [data-action="roundup-input"]': 'roundUpCustom'
        },

        initialize: function initialize() {
            var that = this;
            this.hideRoundup = false;
            WizardModule.prototype.initialize.apply(this, arguments);
            this.options.wizard.model.on('sync', function afterSync() {
                that.render();
            });
            this.model.on('change:paymentmethods', this.render, this);
            BackboneCompositeView.add(this);
        },

        // Determines if the current module is valid to be shown and operate with
        isActive: function isActive() {
            return Configuration.get('donation.donationEnabled') || Configuration.get('donation.roundupEnabled');
        },

        removeItem: function removeItem() {
            var lineToRemove = {};
            var orderModel = this.wizard.model;
            var removePromise;
            orderModel.get('lines').each(function loopLines(line) {
                if (line.get('item').id == Configuration.donation.donationitemid || defaultCustomDonationItem) {
                    lineToRemove = line;
                }
            });
            removePromise = orderModel.removeLine(lineToRemove);
            removePromise.done(function afterRemoveLine() {
                var options = orderModel.get('options');
                options.custbody_round_up_donation = '';
                orderModel.set('options', options).save().done(function afterOptionSaved() {
                    // eslint-disable-next-line no-underscore-dangle
                    SC._applications.Checkout._layoutInstance.currentView.showContent();
                });
            });
        },

        addToCart: function addToCart(itemid) {
            var self = this;
            var itemToAdd = new ItemModel({
                internalid: itemid,
                quantity: 1
            });
            var line;
            var product;

            itemToAdd.fetch({
                data: {
                    id: itemid
                }
            }).done(function afterItemLoaded() {
                product = new ProductModel({
                    item: itemToAdd,
                    quantity: 1
                });
                line = LiveOrderLineModel.createFromProduct(product);
                self.model.addLine(line);
            });
        },

        roundUpCustom: function roundUpCustom(el) {
            var that = this;
            var options;
            var value;
            if (jQuery(el.currentTarget).val() != '' && !isNaN(jQuery(el.currentTarget).val())) {
                options = this.model.get('options');
                value = parseFloat(jQuery(el.currentTarget).val());
                options.custbody_round_up_donation = value.toFixed(2) + '';

                this.model.set('options', options).save().done(function () {
                    that.addToCart(Configuration.donation.donationitemid || defaultCustomDonationItem);
                    that.render();
                });
            } else if (jQuery(el.currentTarget).val() == '') {
                options = this.model.get('options');
                value = parseFloat(jQuery(el.currentTarget).val());

                options.custbody_round_up_donation = '';

                this.model.set('options', options).save().done(function () {
                    that.addToCart(Configuration.donation.donationitemid || defaultCustomDonationItem);
                    that.render();
                });
            }
        },

        roundUp: function roundUp(el) {
            var that = this;
            var options = this.model.get('options');
            var value = parseInt(jQuery(el.currentTarget).attr('data-value'), 10);
            options.custbody_round_up_donation = value.toFixed(2) + '';

            this.model.set('options', options).save().done(function afterOptionsSaved() {
                that.addToCart(Configuration.donation.donationitemid || defaultCustomDonationItem);
                that.render();
            });
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

        learnMore: function learnMore() {
            var layout = this.wizard.application.getLayout();
            var popUpView = new RoundUpPopup(this.options);
            layout.showInModal(popUpView);
        },

        updateDonation: function updateDonation(el) {
            var that = this;
            var options = this.model.get('options');
            var value = jQuery(el.currentTarget).prop('checked');
            var donationAmount = Math.ceil(this.model.get('summary').total) -
                this.model.get('summary').total;
            options.custbody_allow_donation = value ? 'T' : 'F';
            if (options.custbody_allow_donation == 'T') {
                options.custbody_total_amount_donation = donationAmount.toFixed(2) + '';
                this.model.set('options', options).save().done(function afterOptionsSaved() {
                    that.addToCart(Configuration.donation.roundupitemid || defaultRoundUpDonationItem);
                });
            } else {
                options.custbody_total_amount_donation = '';
                this.model.set('options', options).save().done(function afterOptionsSaved() {
                    that.render();
                });
            }
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
            var that = this;
            var isSelected = false;
            var donationOptions = [];
            var allowDonation;
            var x;
            var rounded = Math.abs(
                this.model.get('summary').total -
                Math.ceil(this.model.get('summary').total)
            ).toFixed(2);
            var options = this.model.get('options');
            if (
                rounded == '0.00' &&
                this.model.get('options').custbody_allow_donation != 'T' &&
                options.custbody_total_amount_donation == '' &&
                (options.custbody_round_up_donation == '' || parseInt(options.custbody_round_up_donation, 10) == '0')
            ) {
                this.hideRoundup = true;
            } else {
                this.hideRoundup = rounded == '0.00' && this.model.get('options').custbody_allow_donation != 'T';
            }

            allowDonation = this.model.get('options').custbody_allow_donation == 'T';
            if (!Configuration.donation.roundupEnabled) {
                if (options.custbody_allow_donation == 'T') {
                    options.custbody_allow_donation = 'F';
                    options.custbody_total_amount_donation = '';
                    this.model.set('options', options).save().done(function afterOptionsSaved() {
                        that.render();
                    });
                }
            }

            if (Configuration.donation.donationlist) {
                _.each(Configuration.donation.donationlist, function loopDonationList(value) {
                    if ((options.custbody_round_up_donation === '' || options.custbody_round_up_donation == 0) && value.amount == 0) {
                        donationOptions.push({ value: value.amount, 'class': 'roundup-btn-active' });
                    } else {
                        donationOptions.push({ value: value.amount });
                    }
                });
            }

            if (options.custbody_round_up_donation && options.custbody_round_up_donation != '') {
                for (x = 0; x < donationOptions.length; x++) {
                    if (parseInt(donationOptions[x].value, 10) == parseInt(options.custbody_round_up_donation, 10)) {
                        donationOptions[x].class = 'roundup-btn-active';
                        isSelected = true;
                    }
                }
            }
            return {
                showRoundUp: Configuration.donation.roundupEnabled || false,
                title: 'Donate to Girl Scouts of the USA',
                showTitle: Configuration.donation.roundupEnabled || Configuration.donation.donationEnabled,
                roundedValue: rounded,
                allowDonation: allowDonation,
                donationOptions: donationOptions,
                selectedOption: isSelected,
                donationamount: options.custbody_round_up_donation,
                hasDonation: options.custbody_round_up_donation != '',
                hideRoundup: this.hideRoundup,
                showDonation: Configuration.donation.donationEnabled || false
            };
        }
    });
});
