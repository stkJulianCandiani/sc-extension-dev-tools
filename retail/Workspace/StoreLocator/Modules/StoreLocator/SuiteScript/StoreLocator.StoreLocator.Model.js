/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.StoreLocator.Model', [
    'Configuration',
    'StoreLocator.Store.Model',
    'StoreLocator.Model',
    'GeoIp.Model',
    'underscore'
], function StoreLocatorStoreLocatorModel(
    Configuration,
    StoreLocatorStoreModel,
    StoreLocatorModel,
    GeoIpModel,
    _
) {
    'use strict';

    _.extend(StoreLocatorModel, {
        list: function list(data) {
            var result;
            if (data.sort) {
                data.sort = 'storetype,' + data.sort;
            }
            result = this.search(data);
            if (!result.length && !result.recordsPerPage) {
                data.radius = undefined;
                data.results_per_page = data.results_per_page || Configuration.get('storeLocator.defaultQuantityLocations');
                data.page = 1;
                result = this.search(data);
            }
            return result;
        },

        getNearestStore: function getNearestStore() {
            var myLocation = GeoIpModel.getLatLong();
            var locations = this.search({ page: 'all' });
            var nearestStore = null;
            var self = this;

            _.each(locations, function each(location) {
                if (self.isNear(myLocation, location, nearestStore)) {
                    nearestStore = location;
                }
            });

            return nearestStore;
        },

        isNear: function isNear(myLocation, location, nearestLocation) {
            var d1;
            var d2;
            var ret;

            if (!nearestLocation) {
                ret = true;
            } else {
                d1 = this.distance(myLocation.latitude, myLocation.longitude,
                    location.location.latitude, location.location.longitude);
                d2 = this.distance(myLocation.latitude, myLocation.longitude,
                    nearestLocation.location.latitude, nearestLocation.location.longitude);

                ret = d1 < d2;
            }

            return ret;
        },

        distance: function distance(lat1, lon1, lat2, lon2) {
            // Haversine formula https://en.wikipedia.org/wiki/Haversine_formula
            var R = 6371; // Radius of the earth in km
            var dLat = (lat2 - lat1) * (Math.PI / 180);
            var dLon = (lon2 - lon1) * (Math.PI / 180);
            var a =
                (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
                (Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2));
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        },

        columns: StoreLocatorStoreModel.columns,

        search: StoreLocatorStoreModel.search,

        getDistanceFormulates: StoreLocatorStoreModel.getDistanceFormulates,

        getRecordValues: StoreLocatorStoreModel.getRecordValues
    });
});
