/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('StoreLocator.Footer.View', [
    'storelocator_footerstorelocator.tpl',
    'Backbone',
    'jQuery',
    'js.cookie',
    'underscore'
]
, function StoreLocatorFooterView(
    footerStoreLocatorTpl,
    Backbone,
    jQuery,
    Cookies,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: footerStoreLocatorTpl,

        events: {
            'click [data-action="find-stores"]': 'findStore',
            'click [data-action="find-nearest-store"]': 'findNearestStore',
            'keypress [data-action="find-stores-enter"]': 'getKey'
        },

        findNearestStore: function findNearestStore() {
            var modelData = {};
            var domain = '.' + _.getWindow().location.hostname;
            var self = this;
            this.model.fetch().done(function fetchCallback() {
                modelData.address1 = self.model.get('address1');
                modelData.city = self.model.get('city');
                modelData.state = self.model.get('state');
                modelData.zip = self.model.get('zip');
                Cookies.set('location', JSON.stringify(modelData), {
                    expires: 1,
                    domain: domain,
                    path: '/'
                });
                self.render();
            });
        },

        findStore: function findStore() {
            var zipCode = jQuery('.store-locator-location-button-find').parent().find('#findZipCode').val();
            window.location.href = SC.ENVIRONMENT.siteSettings.touchpoints.storelocator + '&zipCode=' + zipCode;
        },

        getContext: function getContext() {
            var address;
            if (this.model.get('address1')) {
                address = this.model.get('address1') + ', ' + this.model.get('city') + ', ' + this.model.get('state') + ' ' + this.model.get('zip');
            }
            return {
                address: address
            };
        },
        getKey: function getKey(e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                this.findStore();
            }
        }
    });
});
