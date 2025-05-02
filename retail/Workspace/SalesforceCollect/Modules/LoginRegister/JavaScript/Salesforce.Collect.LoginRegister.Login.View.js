/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Collect.LoginRegister.Login.View', [
    'LoginRegister.Login.View',
    'Tracker',
    'SC.Configuration',
    'underscore',
    'Utils'
], function SalesforceCollectLoginRegisterLoginView(
    LoginRegisterLoginView,
    Tracker,
    Configuration,
    _,
    Utils
) {
    'use strict';

    var viewPrototype = LoginRegisterLoginView.prototype;

    _(viewPrototype).extend({

        // @method trackEvent tracks the 'sign-in' event using the global Tracker instance @param {Function} callback
        trackEvent: _.wrap(viewPrototype.trackEvent, function wrapTrackEvent(fn) {
            var user = arguments[2];
            Tracker.getInstance().trackEvent({
                category: 'sign-in',
                action: 'click',
                value: 1,
                callback: _.noop(),
                user: user
            });
            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),

        redirect: function redirect(context, response) {
            var self = this;
            var urlOptions = Utils.parseUrlOptions(window.location.search);
            var touchpoints = response.touchpoints;
            var isPasswordReset = urlOptions.passwdret;
            var url;
            // Track Login Event
            this.trackEvent(function trackEvent() {
                if (
                    !isPasswordReset &&
                    (urlOptions.is === 'checkout' || urlOptions.origin === 'checkout')
                ) {
                    self.refreshApplication(response);
                    // if we know from which touchpoint the user is coming from
                } else if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                    // we save the URL to that touchpoint
                    url = touchpoints[urlOptions.origin];
                    // if there is an specific hash
                    if (urlOptions.origin_hash) {
                        // we add it to the URL as a fragment
                        url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                    }
                    window.location.href = url;
                    // We've got to disable passwordProtectedSite feature if customer registration is disabled.
                } else if (
                    Configuration.getRegistrationType() !== 'disabled' &&
                    SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T'
                ) {
                    window.location.href = touchpoints.home;
                } else {
                    // otherwise we need to take it to the customer center
                    window.location.href = touchpoints.customercenter;
                }
            }, response.user);
        }
    });

    return LoginRegisterLoginView;
});
