/* global getExtensionAssetsPath:false */
define('ReCaptcha.Configuration.Model', [
    'Backbone', // To keep compatibility Aconcagua-onwards
    'Utils'
], function ReCaptchaConfigurationModel(
    Backbone,
    Utils
) {
    return Backbone.Model.extend({
        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/ReCaptcha.Configuration.Service.ss')),
        isEnabled: function isEnabled(section) {
            return this.get('enabled') && this.get(section);
        }
    });
});
