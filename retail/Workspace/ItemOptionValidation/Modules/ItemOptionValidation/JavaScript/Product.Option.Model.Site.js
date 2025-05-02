/*
© 2023 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

define('Product.Option.Model.Site', [
    'Product.Option.Model',
    'Backbone',
    'jQuery',
    'underscore',
    'Utils'
], function ProductOptionModelSite(
    ProductOptionModel,
    Backbone,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return _.extend(ProductOptionModel.prototype, {
        validation: {
            'value.internalid': {
                // eslint-disable-next-line consistent-return
                fn: function optionValueValidator() {
                    var value = this.get('value') && this.get('value').internalid;
                    var optionName = this.get('label');
                    var maxLength = 160;
                    if (this.get('isMandatory') && !value) {
                        return Utils.translate('Please select a value for $(0)', optionName);
                    }
                    if (value) {
                        if (this.get('type') === 'text' || this.get('type') === 'textarea') {
                            if (
                                this.get('isMandatory') && (!jQuery.trim(value) || value.length > maxLength)
                            ) {
                                return Utils.translate('Please enter a valid input for this string');
                            }
                            if (value.length > maxLength) {
                                return Utils.translate('Please enter a string shorter (maximum length: $(0))', maxLength);
                            }
                        } else if (
                            this.get('type') === 'email' && !Backbone.Validation.patterns.email.test(value)
                        ) {
                            return Utils.translate('Please enter a valid email');
                        } else if (
                            this.get('type') === 'integer' && !Backbone.Validation.patterns.netsuiteInteger.test(value)
                        ) {
                            return Utils.translate('Please enter a valid integer number');
                        } else if (
                            this.get('type') === 'float' && !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid decimal number');
                        } else if (
                            this.get('type') === 'currency' && !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid currency number');
                        } else if (
                            this.get('type') === 'phone' && !Backbone.Validation.patterns.netsuitePhone.test(value)
                        ) {
                            return Utils.translate('Please enter a valid phone');
                        } else if (
                            this.get('type') === 'percent' && !Backbone.Validation.patterns.netsuitePercent.test(value)
                        ) {
                            return Utils.translate('Please enter a valid percent');
                        } else if (
                            this.get('type') === 'url' && !Backbone.Validation.patterns.netsuiteUrl.test(value)
                        ) {
                            return Utils.translate('Please enter a valid url');
                        } else if (
                            this.get('type') === 'select' && !_.findWhere(this.get('values'), { internalid: value })
                        ) {
                            return Utils.translate('Please select a valid value for $(0)', optionName);
                        }
                    }
                }
            }
        }
    });
});
