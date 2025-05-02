/* eslint-disable max-len */
define('Monogram.Cart.AddToCart.Button.View', [
    'Cart.AddToCart.Button.View',
    'Monogram.Values',
    'GlobalViews.Message.View',
    'jQuery',
    'underscore',
    'Utils'
], function IronOnCartAddToCartButtonView(
    CartAddToCartButtonView,
    MonogramValues,
    GlobalViewsMessageView,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return _.extend(CartAddToCartButtonView.prototype, {

        filterEmptyIronOnOptions: function filterEmptyIronOnOptions(itemModel) {
            var ironOnOptions = [
                MonogramValues.itemOptions.monogramAlphabet,
                MonogramValues.itemOptions.alphabetSelection,
                MonogramValues.itemOptions.alphabetSelectionItems,
                MonogramValues.itemOptions.cost,
                MonogramValues.itemOptions.extraItems,
                MonogramValues.itemOptions.lineId
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
            var monogramSelectionOption;
            var monogramSelection;
            var selection;
            var lineIdentifier = Math.floor((1000 + Math.random()) * 9000) + '';
            this.filterEmptyIronOnOptions(itemModel);
            monogramSelectionOption = MonogramValues.itemOptions.alphabetSelection;
            monogramSelection = itemModel.getOption(monogramSelectionOption);
            try {
                args[0].preventDefault();
                if (this.model.areAttributesValid(['options', 'quantity'])) {
                    if (monogramSelection) {
                        if (monogramSelection.get('value')) {
                            selection = monogramSelection.get('value').internalid;
                            if (selection === 'CONFIRMATION_NEEDED') {
                                this.showMonogramError(Utils.translate('Please confirm monogramming letters and order are correct'));
                            } else if (selection === 'INCOMPLETE') {
                                this.showMonogramError(Utils.translate('Please confirm monogramming letters and order are correct'));
                            } else if (selection === 'NO_OPTIONS') {
                                this.showMonogramError(Utils.translate('Please confirm monogramming letters and order are correct'));
                            } else {
                                if (selection !== '.') {
                                    itemModel.setOption(MonogramValues.itemOptions.lineId, lineIdentifier);
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
            } catch (e) {
                fn.apply(this, _.toArray(arguments).slice(1));
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }),

        showMonogramError: function showMonogramError(message) {
            var dataView = '[data-view="Monogram.Error"]';

            var globalViewMessage = new GlobalViewsMessageView({
                message: message,
                type: 'error',
                closable: true
            });
            globalViewMessage.show(jQuery(dataView), 5000);
        }
    });
});
