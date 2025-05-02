/* eslint-disable max-len */
/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

define('SublimePatchOptions.Cart.AddToCart.Button.View', [
    'Cart.AddToCart.Button.View',
    'GlobalViews.Message.View',
    'jQuery',
    'underscore',
    'Utils'
], function SublimePatchOptionsCartAddToCartButtonView(
    CartAddToCartButtonView,
    GlobalViewsMessageView,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return _.extend(CartAddToCartButtonView.prototype, {

        addToCart: _.wrap(CartAddToCartButtonView.prototype.addToCart, function wrap(fn) {
            var self = this;
            var args = _.toArray(arguments).slice(1);
            var itemModel = this.parentView.model;
            var taglineOption = itemModel.getOption('custcol_sublim_patch_tagline');
            var customMessage = itemModel.getOption('custcol_sublim_patch_freeform_text');
            var validationCheckbox;
            var taglineValue;
            var customMessageValue;
            try {
                args[0].preventDefault();
                if (this.model.areAttributesValid(['options', 'quantity'])) {
                    if (taglineOption && customMessage) {
                        validationCheckbox = jQuery('[name="patch-information-confirmation"]');
                        if (!jQuery(validationCheckbox).is(':checked')) {
                            self.showPatchSelectionError(Utils.translate('Please validate the information entered is correct'));
                        } else {
                            taglineValue = taglineOption.get('value');
                            customMessageValue = customMessage.get('value');
                            if (taglineValue && taglineValue.internalid === '11' && (!customMessageValue || !customMessageValue.internalid)) {
                                self.showPatchSelectionError(Utils.translate('Please select a tagline or enter a custom message'));
                            } else {
                                fn.apply(this, _.toArray(arguments).slice(1));
                            }
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

        showPatchSelectionError: function showPatchSelectionError(message) {
            var dataView = '[data-view="Patch-Selection-Error"]';

            var globalViewMessage = new GlobalViewsMessageView({
                message: message,
                type: 'error',
                closable: true
            });
            globalViewMessage.show(jQuery(dataView), 5000);
        }
    });
});
