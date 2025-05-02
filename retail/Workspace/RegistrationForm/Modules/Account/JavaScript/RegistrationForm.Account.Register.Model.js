define('RegistrationForm.Account.Register.Model', [
    'Account.Register.Model',
    'underscore'
], function RegistrationFormAccountRegisterModel(
    AccountRegisterModel,
    _
) {
    'use strict';

    var modelPrototype = AccountRegisterModel.prototype;

    _(modelPrototype).extend({
        validation: _.extend(modelPrototype.validation, {
            age: {
                fn: function fn(value) {
                    if (value !== 'T') {
                        return _('You must be 13 years old or older.').translate();
                    }
                    return null;
                }
            }
        })
    });
});
