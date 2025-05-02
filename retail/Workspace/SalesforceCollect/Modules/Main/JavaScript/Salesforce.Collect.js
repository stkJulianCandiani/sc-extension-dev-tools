/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Collect', [
    'Tracker',
    'Profile.Model',
    'LiveOrder.Model',
    'jQuery',
    'underscore'
], function SalesforceCollect(
    Tracker,
    ProfileModel,
    LiveOrderModel,
    jQuery,
    _
) {
    'use strict';

    var win = window;
    var collect = '_etmc';
    var tracking = {};
    var currentView = {};
    var currentPage = '';
    var searchKey = '';
    var lines;

    var SalesforceCollection = {

        // @method setAccount Saves the configuration to be later used on the track transaction. @param {Object} config
        setAccount: function setAccount(config) {
            this.config = config;

            return this;
        },

        trackPageview: function trackPageview(url) {
            var self = this;
            function urlParam(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                return results !== null ? results[1] || 0 : '';
            }

            if (_.isString(url) && win[collect]) {
                if (this.application.getLayout()) {
                    currentView = this.application.getLayout().currentView;
                    currentPage = currentView.$el.get(0).id;

                    win[collect].push(['setOrgId', this.config.id]);
                    if (this.profileModel.get('isLoggedIn') === 'T') win[collect].push(['setUserInfo', { 'email': this.profileModel.get('email') }]);

                    switch (currentPage) {
                    case 'facet-browse':

                        searchKey = urlParam('keywords');

                        if (searchKey) {
                            win[collect].push(['trackPageView', { 'search': searchKey }]);
                        } else if (currentView.model.get('category')) {
                            win[collect].push(['trackPageView', { 'category': currentView.model.get('category').get('name') }]);
                        }

                        break;

                    case 'ProductDetails.QuickView.View':
                    case 'ProductDetails.Full.View':

                        win[collect].push(['trackPageView', { 'item': currentView.model.get('itemid') }]);

                        break;

                    case 'Cart.Detailed.View':

                        lines = currentView.model.get('lines');

                        if (lines && lines.length > 0) {
                            if (this.profileModel.get('isLoggedIn') === 'T') win[collect].push(['setUserInfo', { 'email': this.profileModel.get('email') }]);
                            win[collect].push(['trackCart', { 'cart': this.getCart(lines) }]);
                        }

                        break;

                    case 'checkout':

                        if (currentView.wizard.currentStep === 'review') {
                            LiveOrderModel.loadCart().done(function afterLoadCart() {
                                var cart = LiveOrderModel.getInstance();
                                var items = this.getCart(cart.get('lines'));
                                this.setCookie(self.config.id + '_prods', JSON.stringify(items), 1);
                            });
                        }

                        break;

                    default:

                        win[collect].push(['trackPageView']);

                        break;
                    }
                }
            }

            return this;
        },

        setCookie: function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            var expires;
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        },

        getCookie: function getCookie(cname) {
            var name = cname + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var i;
            var c;
            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },

        deleteCookie: function deleteCookie(cname) {
            document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        },

        getCart: function getCart(cartLines) {
            var cart = [];
            _.each(cartLines.models, function loopLines(line) {
                var product = {};
                var item = line.get('item');

                product.item = (item.get('matrix_parent')) ? item.get('matrix_parent').itemid : item.get('itemid');
                product.quantity = line.get('quantity');
                product.price = line.get('rate');
                product.unique_id = item.get('itemid');

                cart.push(product);
            });
            return cart;
        },

        trackEvent: function trackEvent(event) {
            switch (event.category) {
            case 'sign-in':
            case 'create-account':
            case 'newsletter-signup':

                win[collect].push(['setOrgId', this.config.id]);

                if (event.category === 'newsletter-signup') {
                    win[collect].push(['setUserInfo', { 'email': event.user.get('email') }]);
                } else {
                    win[collect].push(['setUserInfo', { 'email': event.user.email }]);
                }

                win[collect].push(['trackPageView']);

                break;

            case 'empty-cart':

                this.emptyCart();

                break;

            case 'remove-item':

                this.trackCart();

                break;

            default: break;
            }
        },

        emptyCart: function emptyCart() {
            win[collect].push(['setOrgId', this.config.id]);
            win[collect].push(['trackCart', { 'clear_cart': true }]);
        },

        trackCart: function trackCart() {
            var self = this;
            LiveOrderModel.loadCart().done(function afterLoadCart() {
                var model = LiveOrderModel.getInstance();

                var cart = self.getCart(model.get('lines'));
                if (cart && cart.length !== 0) {
                    win[collect].push(['setOrgId', self.config.id]);
                    if (self.profileModel.get('isLoggedIn') === 'T') win[collect].push(['setUserInfo', { 'email': self.profileModel.get('email') }]);
                    win[collect].push(['trackCart', { 'cart': cart }]);
                } else {
                    self.emptyCart();
                }
            });
        },

        // eslint-disable-next-line no-unused-vars
        trackAddToCart: function trackAddToCart(item, event) {
            this.trackCart();
        },

        // eslint-disable-next-line no-unused-vars
        trackTransaction: function trackTransaction(transaction, event) {
            win[collect].push(['setOrgId', this.config.id]);

            if (this.profileModel.get('isLoggedIn') === 'T') win[collect].push(['setUserInfo', { 'email': this.profileModel.get('email') }]);

            win[collect].push(['trackConversion',
                { 'cart': JSON.parse(this.getCookie(this.config.id + '_prods')) },
                { 'order_number': transaction.get('confirmationNumber') },
                { 'shipping': transaction.get('shippingCost') }
            ]);

            this.deleteCookie(this.config.id + '_prods');
        },

        // @method loadScript
        // @return {jQuery.Promise|Void}
        loadScript: function loadScript() {
            var self = this;
            // the analytics script is only loaded if we are on a browser
            return SC.ENVIRONMENT.jsEnvironment === 'browser' && jQuery.getScript('//' + tracking.id + '.collect.igodigital.com/collect.js', function () {
                self.trackPageview(window.location.href);
            });
        },

        startSalesforceCollection: function startSalesforceCollection(container) {
            // eslint-disable-next-line no-underscore-dangle
            var application = container._layoutInstance.application;
            this.application = application;
            tracking = application.getConfig('tracking.salesforceCollectTracking');
            this.profileModel = ProfileModel.getInstance();

            // Required tracking attributes to generate the pixel url
            if (tracking && tracking.id) {
                this.setAccount(tracking);

                Tracker.getInstance().trackers.push(this);

                application.getLayout().once('afterRender', jQuery.proxy(this, 'loadScript'));
            }
        }
    };

    return SalesforceCollection;
});
