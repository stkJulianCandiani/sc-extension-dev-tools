/* eslint-disable max-len */
/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.Cart.AddToCart.Button.View', [
    'Cart.AddToCart.Button.View',
    'GlobalViews.Message.View',
    'jQuery',
    'underscore',
    'Utils'
], function IronOnCartAddToCartButtonView(
    CartAddToCartButtonView,
    GlobalViewsMessageView,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return _.extend(CartAddToCartButtonView.prototype, {

        filterEmptyIronOnOptions: function filterEmptyIronOnOptions(itemModel, ironOnConfig) {
            var ironOnOptions = [
                ironOnConfig.ironon.troopNumeralSelectionItemOption,
                ironOnConfig.ironon.troopNumeralItemsItemOption,
                ironOnConfig.ironon.troopNumeralItemCostOption,
                ironOnConfig.ironon.extraItemsOptions,
                ironOnConfig.ironon.lineIdItemOption,
                'custcol_acs_council_text'
            ];
            var options = itemModel.get('options');
            var filteredOptions = _.map(options.models, function map(cartOption) {
                var ironOnOptionValue = _.find(ironOnOptions, function findOption(ironOnOption) {
                    return cartOption.get('cartOptionId') === ironOnOption && cartOption.get('value') && cartOption.get('value').internalid === '.';
                });
                if (ironOnOptionValue) {
                    cartOption.unset('value');
                }
                return cartOption;
            });
            options.models = filteredOptions;
            itemModel.set('options', options);
        },

        addToCart: _.wrap(CartAddToCartButtonView.prototype.addToCart, function wrap(fn) {
            var self = this;
            var args = _.toArray(arguments).slice(1);
            var itemModel = this.parentView.model;
            var ironOnConfig = this.options.application.getComponent('Environment').getConfig('extensions');
            var troopNumeralItemOption;
            var troopNumeralSelection;
            var extraItemsOption;
            var extraItemsSelection;
            var selection;
            var lineIdentifier = Math.floor((1000 + Math.random()) * 9000) + '';
            this.filterEmptyIronOnOptions(itemModel, ironOnConfig);
            troopNumeralItemOption = ironOnConfig && ironOnConfig.ironon ? ironOnConfig.ironon.troopNumeralSelectionItemOption : 'custcol_acs_troop_numeral_selection';
            troopNumeralSelection = itemModel.getOption(troopNumeralItemOption);
            extraItemsOption = itemModel.getOption('custcol_acs_council_text');
            try {
                args[0].preventDefault();
                if (this.model.areAttributesValid(['options', 'quantity'])) {
                    if (extraItemsOption && extraItemsOption.get('value')) {
                        extraItemsSelection = extraItemsOption.get('value').internalid;
                        if (extraItemsSelection === 'COUNCIL_NEEDED') {
                            this.showTroopNumeralError(Utils.translate('Please Select A Council.'), true);
                            this.goToError();
                            return;
                        }
                        if (selection !== '.') {
                            itemModel.setOption(ironOnConfig.ironon.lineIdItemOption, lineIdentifier);
                        }
                    }
                    if (troopNumeralSelection) {
                        if (troopNumeralSelection.get('value')) {
                            selection = troopNumeralSelection.get('value').internalid;
                            if (selection === 'INCOMPLETE') {
                                this.showTroopNumeralError(Utils.translate('Please Select All Numerals.'));
                            } else {
                                if (selection !== '.') {
                                    itemModel.setOption(ironOnConfig.ironon.lineIdItemOption, lineIdentifier);
                                }
                                fn.apply(self, args);
                            }
                        } else {
                            fn.apply(self, args);
                        }
                    } else {
                        fn.apply(this, _.toArray(arguments).slice(1));
                    }
                } else {
                    fn.apply(this, _.toArray(arguments).slice(1));
                }
                this.goToError();
            } catch (e) {
                fn.apply(this, _.toArray(arguments).slice(1));
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }),

        goToError: function goToError() {
            if (this.isMobileDevice()) {
                if (jQuery('.global-views-message-error').length > 0 && jQuery('.global-views-message-error').length !== jQuery('.global-views-message-error [hidden]').length) {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('.global-views-message-error').offset().top
                    }, 500);
                } else if (jQuery('p[data-validation-error]').length > 0) {
                    jQuery('html, body').animate({
                        scrollTop: jQuery('p[data-validation-error]').closest('div[data-validation*="control-group"]').offset().top
                    }, 500);
                }
            }
        },

        isMobileDevice: function isMobileDevice() {
            return Utils.isPhoneDevice() || Utils.isTabletDevice();
        },

        showTroopNumeralError: function showTroopNumeralError(message, isCouncilError) {
            var dataView = isCouncilError ? '[data-view="Council.Error"]' : '[data-view="Troop.Numerals.Error"]';

            var globalViewMessage = new GlobalViewsMessageView({
                message: message,
                type: 'error',
                closable: true
            });
            globalViewMessage.show(jQuery(dataView), 120000);
        }
    });
});
