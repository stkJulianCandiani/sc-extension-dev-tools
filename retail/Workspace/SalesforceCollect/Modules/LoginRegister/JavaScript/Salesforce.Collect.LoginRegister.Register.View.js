/* eslint-disable no-unused-expressions */
/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Collect.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'Profile.Model',
    'LiveOrder.Model',
    'Tracker',
    'SC.Configuration',
    'Backbone',
    'underscore',
    'Utils'
], function SalesforceCollectLoginRegisteRegisterView(
    LoginRegisterRegisterView,
    ProfileModel,
    LiveOrderModel,
    Tracker,
    Configuration,
    Backbone,
    _,
    Utils
) {
    'use strict';

    var viewPrototype = LoginRegisterRegisterView.prototype;

    _(viewPrototype).extend({

        // @method trackEvent tracks the 'create-account' event using the global Tracker instance
        // @param {Function} callback
        trackEvent: _.wrap(viewPrototype.trackEvent, function wrapTrackEvent(fn) {
            var user = arguments[2];
            Tracker.getInstance().trackEvent({
                category: 'create-account',
                action: 'click',
                value: 1,
                callback: _.noop(),
                user: user
            });
            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),

        redirect: function redirect(_context, response) {
            var self = this;
            return this.cancelableTrigger('after:LoginRegister.register').then(function afterRegister() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var touchpoints = response.touchpoints;
                var profileModel;
                var url;
                if (urlOptions.is && urlOptions.is === 'checkout') {
                    profileModel = ProfileModel.getInstance();
                    response.user && profileModel.set(response.user);
                    response.cart && LiveOrderModel.getInstance().set(response.cart);
                    response.address && profileModel.get('addresses').reset(response.address);
                    response.paymentmethod &&
                        profileModel.get('paymentmethods').reset(response.paymentmethod);

                    // Track Guest Checkout Event
                    self.trackEvent(function trackGuestCheckout() {
                        self.application.Configuration.currentTouchpoint = 'checkout';
                        Backbone.history.navigate('', { trigger: true });
                    }, response.user);
                } else {
                    // Track Login Event
                    self.trackEvent(function trackLogin() {
                        // if we know from which touchpoint the user is coming from
                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the url to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the url as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                            window.location.href = url;
                        } else if (
                            // We've got to disable passwordProtectedSite feature if customer registration is disabled.
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
        }
    });

    return LoginRegisterRegisterView;
});
