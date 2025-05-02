/*
Implemented in SuiteScript 1 in order not to implement things twice
since the validation will happen in SS1.0 anyway
 */
define('ReCaptcha.Configuration.ServiceController', [
    'ReCaptcha.Configuration.Model',
    'ServiceController'
], function ReCaptchaConfigurationModel(
    Model,
    ServiceController
) {
    'use strict';

    return ServiceController.extend({
        name: 'ReCaptcha.Configuration.Model',
        get: function get() {
            return Model.get();
        }
    });
});
