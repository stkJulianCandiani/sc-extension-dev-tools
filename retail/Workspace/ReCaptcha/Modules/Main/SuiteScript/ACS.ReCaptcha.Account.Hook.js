define('ACS.ReCaptcha.Account.Hook', [
    'Application',
    'ReCaptcha.Configuration.Model',
    'ReCaptcha.Adapter'
], function ACSReCaptchaAccountHook(
    Application,
    Configuration,
    Adapter
) {
    'use strict';

    var serviceMethodsToProtect = [
        { listenerName: 'Account.Register.ServiceController.post', configKey: 'r', actionString: 'register' },
        { listenerName: 'Account.Login.ServiceController.post', configKey: 'l', actionString: 'login' },
        { listenerName: 'Account.RegisterAsGuest.ServiceController.post', configKey: 'g', actionString: 'guest' },
        { listenerName: 'Account.ForgotPassword.ServiceController.post', configKey: 'f', actionString: 'forgot' }
    ];

    serviceMethodsToProtect.forEach(function registerServiceProtection(s) {
        Application.on('before:' + s.listenerName, function onEachListener(Service) {
            var config = Configuration.get();
            var configValue = config[s.configKey];
            var data = Service.data || {};
            var result;
            if (config.enabled && configValue) {
                result = Adapter.validate(s.actionString, data['g-recaptcha-response']);
                if (!result.success) {
                    throw result;
                }
            }
        });
    });
});
