define('ReCaptcha.Adapter', [
    'ReCaptcha.Configuration.Model',
    'jQuery',
    'underscore',
    'Utils'
], function ReCaptchaAdapter(
    ConfigurationModel,
    jQuery,
    _,
    Utils
) {
    'use strict';

    var recaptchaAPI = {};
    var recaptchaIds = {};
    var captchaStatus = {};
    var registeredCallbacks = {};
    var registeredErrorCallbacks = {};
    var activeId;

    return {
        configuration: null,
        configurationPromise: jQuery.Deferred(),
        initializedPromise: jQuery.Deferred(),
        initialized: false,
        getThirdPartyScriptURL: function getThirdPartyScriptURL() {
            return this.configuration.get('jsAPI')
                .replace('{{CALLBACK}}', '__callbackFromRecaptchaACS');
        },
        loadScript: function loadScript() {
            var self = this;
            // eslint-disable-next-line no-underscore-dangle
            window.__callbackFromRecaptchaACS = function __callbackFromRecaptchaACS() {
                recaptchaAPI = window.grecaptcha;
                self.initializedPromise.resolve();
            };
            jQuery.getScript(this.getThirdPartyScriptURL());
            return this.initializedPromise;
        },
        initialize: function initialize() {
            var self = this;
            if (!this.initialized) {
                this.initialized = true;
                this.configuration = new ConfigurationModel();
                this.configuration.fetch().then(function onFetch() {
                    if (self.configuration.get('enabled')) {
                        self.loadScript();
                    }
                    self.configurationPromise.resolve();
                    if (!self.configuration.get('enabled')) {
                        self.initializedPromise.resolve();
                    }
                });
            }
            this.boundCancelationEventHandler = _.bind(this.cancelationEventHandler, this);
        },
        installInstance: function installInstance(id, containerElement) {
            var self = this;
            var lastId = recaptchaIds[id];
            var callBackFn;

            if (!jQuery.contains(window.document, containerElement)) {
                return; // if element is not in DOM, then we don't append recaptcha
            }

            /* instead of actually setting the real final callback to recaptcha
            we register a proxy callback. This allows for more flexibility over how to register captchas
            and when to trigger the validation.
             */
            callBackFn = function fnCallback(recaptchaKey) {
                captchaStatus[id] = 'solved';

                if (self.configuration.get('enabled')) {
                    self.deRegisterCancelationListener();
                }

                if (typeof registeredCallbacks[id] === 'function') {
                    try {
                        registeredCallbacks[id](recaptchaKey);
                    } catch (e) {
                        console.error(e);
                    }
                }

                registeredErrorCallbacks[id] = null;
                registeredCallbacks[id] = null;
            };
            self.initializedPromise.then(function onConfigReady() {
                if (!self.configuration.isEnabled(id)) {
                    return;
                }

                if (lastId !== undefined) {
                    recaptchaAPI.reset(lastId);
                }

                recaptchaIds[id] = recaptchaAPI.render(
                    containerElement,
                    {
                        sitekey: self.configuration.get('siteKey'),
                        badge: 'bottomright',
                        size: 'invisible', // ,
                        callback: callBackFn,
                        'expired-callback': function expiredcallback() {
                            self.cancelationHandler(id);
                        },
                        'error-callback': function errorcallback() {
                            self.cancelationHandler(id);
                        }
                    }
                );

            });
        },
        validate: function validate(id, callbackFn, errorCallbackFn) {
            var self = this;
            var recaptchaToValidate = recaptchaIds[id];
            registeredCallbacks[id] = callbackFn;
            registeredErrorCallbacks[id] = errorCallbackFn;

            self.initializedPromise.then(function onConfigReady() {
                if (!self.configuration.isEnabled(id)) {
                    if (typeof registeredCallbacks[id] === 'function') {
                        try {
                            registeredCallbacks[id]('notEnabled');
                        } catch (e) {
                            console.error(e);
                        }
                    }
                } else {
                    if (captchaStatus[id] === 'solved') {
                        recaptchaAPI.reset(recaptchaToValidate);
                    }

                    activeId = id;
                    _.defer(function() {
                        self.registerCancelationListener();
                    })
                    recaptchaAPI.execute(recaptchaIds[id]);
                }
            });
        },
        registerCancelationListener: function registerCancelationListener() {
            jQuery(document)
                .on('click.acsrecaptcha', this.boundCancelationEventHandler)
                .on('focusout.acsrecaptcha', 'iframe[src*="recaptcha"]', this.boundCancelationEventHandler);
        },
        deRegisterCancelationListener: function deRegisterCancelationListener() {
            jQuery(document)
                .off('.acsrecaptcha');
        },
        cancelationEventHandler: function cancelationEventHandler() {
            this.cancelationHandler(activeId);
        },
        cancelationHandler: function cancelationHandler(id) {
            var cancelationCallback = registeredErrorCallbacks[id];
            this.deRegisterCancelationListener();
            if (id) {
                registeredErrorCallbacks[id] = null;
                registeredCallbacks[id] = null;
            }
            if (typeof cancelationCallback === 'function') {
                try {
                    cancelationCallback({
                        errorCode: 'ERR_RECAPTCHA',
                        errorMessage: Utils.translate('Please Complete ReCaptcha')
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };
});
