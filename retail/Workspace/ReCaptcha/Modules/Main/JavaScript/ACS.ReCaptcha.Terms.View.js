define('ACS.ReCaptcha.Terms.View', [
    'ReCaptcha.Adapter',
    'Backbone',
    'acs_recaptcha_terms.tpl'
], function ACSReCaptchaTermsView(
    Adapter,
    Backbone,
    acsRecaptchaTermsTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: acsRecaptchaTermsTpl,
        initialize: function initialize() {
            var self = this;
            Adapter.initializedPromise.then(function afterRecaptchaInit() {
                self.configuration = Adapter.configuration;
                self.render();
            });
        },
        getContext: function getContext() {
            return {
                isEnabled:
                    this.configuration &&
                    this.configuration.get('enabled') &&
                    this.configuration.get('useCustomTpl'),
                mode: this.options.mode
            };
        }
    });
});
