define('ReCaptcha', [
    'ReCaptcha.Adapter',
    'underscore'
], function ReCaptchaDef(
    Adapter,
    _
) {
    /*
    Recaptcha class to be instanciated by different widgets
    Interfaces with the actual Recaptcha adapter.
     */
    var ReCaptcha = function ReCaptcha(settings) {
        this.settings = settings;
        Adapter.initialize();
    };

    _.extend(ReCaptcha.prototype, {
        attachTo: function attachTo(selector) {
            Adapter.installInstance(this.settings.configKey, selector);
        },
        validate: function validate(successCallbackFn, errorCallbackFn) {
            Adapter.validate(this.settings.configKey, successCallbackFn, errorCallbackFn);
        },
        getSetupPromise: function getSetupPromise() {
            return Adapter.initializedPromise;
        },
        getConfig: function getConfig() {
            return Adapter.configuration;
        }
    });

    return ReCaptcha;
});
