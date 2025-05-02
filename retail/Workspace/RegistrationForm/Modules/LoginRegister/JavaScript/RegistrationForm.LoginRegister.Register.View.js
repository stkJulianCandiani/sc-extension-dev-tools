define('RegistrationForm.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'registrationform_login_register_register.tpl',
    'underscore'
], function RegistrationFormLoginRegisterRegisterView(
    LoginRegisterRegisterView,
    registrationformLoginRegisterRegisterTpl,
    _
) {
    'use strict';

    var viewPrototype = LoginRegisterRegisterView.prototype;

    _(viewPrototype).extend({
        template: registrationformLoginRegisterRegisterTpl,

        bindings: _.extend(viewPrototype.bindings, {
            '[name="age"]': {
                observe: 'age',
                setOptions: {
                    silent: true,
                    validate: true
                },
                events: ['blur', 'change']
            }
        })
    });
});
