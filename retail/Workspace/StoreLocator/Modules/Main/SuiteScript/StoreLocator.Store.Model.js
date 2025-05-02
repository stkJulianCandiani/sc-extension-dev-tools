/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.Store.Model', [
    'SC.Model',
    'Application',
    'Configuration',
    'underscore',
    'Utils'
], function StoreLocatorStoreModel(
    SCModel,
    Application,
    Configuration,
    _
) {
    'use strict';

    var storeFields = {
        internalid: 'internalid',
        isinactive: 'isinactive',
        name: 'custrecord_locator_storevendor',
        storetype: 'custrecord_locator_store_type',
        address1: 'custrecord_locator_storeaddress',
        address2: 'custrecord6',
        city: 'custrecord7',
        state: 'custrecord_locator_state',
        zip: 'custrecord_locator_zip_code',
        phone: 'custrecord_locator_storephone',
        corporatewebsite: 'custrecord_corporate_web_site',
        shoppingwebsite: 'custrecord_shopping_web_site',
        description: 'custrecord_locator_storedesc',
        latitude: 'custrecord_locator_storelat',
        longitude: 'custrecord_locator_storelong',
        councilcode: 'custrecord_council_code'
    };

    return SCModel.extend({
        name: 'Store',
        columns: {
            'internalid': new nlobjSearchColumn(storeFields.internalid),
            'isinactive': new nlobjSearchColumn(storeFields.isinactive),
            'name': new nlobjSearchColumn(storeFields.name),
            'storetype': new nlobjSearchColumn(storeFields.storetype),
            'address1': new nlobjSearchColumn(storeFields.address1),
            'address2': new nlobjSearchColumn(storeFields.address2),
            'city': new nlobjSearchColumn(storeFields.city),
            'state': new nlobjSearchColumn(storeFields.state),
            'zip': new nlobjSearchColumn(storeFields.zip),
            'phone': new nlobjSearchColumn(storeFields.phone),
            'corporatewebsite': new nlobjSearchColumn(storeFields.corporatewebsite),
            'shoppingwebsite': new nlobjSearchColumn(storeFields.shoppingwebsite),
            'description': new nlobjSearchColumn(storeFields.description),
            'latitude': new nlobjSearchColumn(storeFields.latitude),
            'longitude': new nlobjSearchColumn(storeFields.longitude),
            'councilcode': new nlobjSearchColumn(storeFields.councilcode)
        },

        list: function list(data) {
            return this.search(data);
        },

        // @method get Return one single store
        // @param {String} id
        // @return {Store.Model.Get.Result}
        get: function get(data) {
            var searchResults;
            this.result = {};

            if (data.internalid) {
                searchResults = this.search(data);
                this.result = searchResults[0];
            }

            return this.result;
        },

        search: function search(data) {
            var result = {};
            var records = [];
            var formula;
            var internalid;
            var self = this;

            this.filters = [];
            this.data = data;

            this.filters.push(new nlobjSearchFilter(storeFields.isinactive, null, 'is', 'F'));

            if (this.data.latitude && this.data.longitude) {
                // Automatic store detection fails, without completing the latitude and longitude fields.
                // Delete this filters when fixed.
                this.filters.push(new nlobjSearchFilter(storeFields.latitude, null, 'isnotempty'));
                this.filters.push(new nlobjSearchFilter(storeFields.longitude, null, 'isnotempty'));

                formula = this.getDistanceFormulates();
                if (this.data.radius) {
                    this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'lessthan', this.data.radius).setFormula(formula));
                }
                // Validate that the formula returns some value.
                this.filters.push(new nlobjSearchFilter('formulanumeric', null, 'noneof', '@NONE@'));
                this.columns.distance = new nlobjSearchColumn('formulanumeric').setFormula(formula).setFunction('roundToTenths');
            }

            if (this.data.internalid) {
                internalid = _.isArray(this.data.internalid) ? this.data.internalid : this.data.internalid.split(',');
                this.filters.push(new nlobjSearchFilter(storeFields.internalid, null, 'anyof', internalid));
            }

            if (this.data.sort) {
                _.each(this.data.sort.split(','), function sortData(columnName) {
                    if (self.columns[columnName]) {
                        self.columns[columnName].setSort(self.data.order >= 0);
                    }
                });
            }

            if (this.data.page === 'all') {
                this.search_results = Application.getAllSearchResults('customrecord_locator_store', _.values(this.filters), _.values(this.columns));
            } else {
                this.search_results = Application.getPaginatedSearchResults({
                    record_type: 'customrecord_locator_store',
                    filters: _.values(this.filters),
                    columns: _.values(this.columns),
                    page: this.data.page || 1,
                    results_per_page: this.data.results_per_page || 1
                });
            }

            _.each(((this.data.page === 'all' ? this.search_results : this.search_results.records) || []) || [], function eachRecord(record) {
                records.push(self.getRecordValues(record));
            });

            if (this.data.page === 'all' || this.data.internalid) {
                result = records;
            } else {
                result = this.search_results;
                result.records = records;
            }

            return result;
        },

        // @method getDistanceFormulates
        // @return {String} distance formulates
        getDistanceFormulates: function getDistanceFormulates() {
            // R = Earth radius 6371 (km) , 3959 (mi)
            var PI = Math.PI;
            var R = Configuration.get('storeLocator.distanceUnit') === 'mi' ? 3959 : 6371;
            var lat = (this.data.latitude * PI) / 180;
            var lon = (this.data.longitude * PI) / 180;
            var formula = R +
            ' * (2 * ATAN2(SQRT((SIN((' + lat + '- ({custrecord_locator_storelat} * ' + PI + ' / 180)) / 2) *' +
            'SIN((' + lat + '- ({custrecord_locator_storelat} * ' + PI + ' / 180)) / 2) + ' +
            'COS(({custrecord_locator_storelat} * ' + PI + ' / 180)) * COS(' + lat + ') *' +
            'SIN((' + lon + '- ({custrecord_locator_storelong} * ' + PI + ' / 180)) /2) *' +
            'SIN((' + lon + '- ({custrecord_locator_storelong} * ' + PI + ' / 180)) /2))),' +
            'SQRT(1 - (SIN((' + lat + '- ({custrecord_locator_storelat} * ' + PI + ' / 180)) / 2) *' +
            'SIN((' + lat + '- ({custrecord_locator_storelat} * ' + PI + ' / 180)) / 2) +' +
            'COS(({custrecord_locator_storelat} * ' + PI + ' / 180)) * COS(' + lat + ') * ' +
            'SIN((' + lon + '- ({custrecord_locator_storelong} * ' + PI + ' / 180)) /2) * ' +
            'SIN((' + lon + '- ({custrecord_locator_storelong} * ' + PI + ' / 180)) /2)))))';

            return formula;
        },

        // method getRecordValues
        // return {Locator.Model.Result}
        getRecordValues: function getRecordValues(record) {
            var mapResult = {};
            var distance;
            var id = record.getValue(storeFields.internalid);
            mapResult.internalid = id;
            mapResult.name = record.getValue(storeFields.name);
            mapResult.storetype = record.getValue(storeFields.storetype);
            mapResult.address1 = record.getValue(storeFields.address1);
            mapResult.address2 = record.getValue(storeFields.address2);
            mapResult.city = record.getValue(storeFields.city);
            mapResult.state = record.getValue(storeFields.state);
            mapResult.phone = record.getValue(storeFields.phone);
            mapResult.zip = record.getValue(storeFields.zip);
            mapResult.councilcode = record.getValue(storeFields.councilcode);
            mapResult.corporatewebsite = record.getValue(storeFields.corporatewebsite);
            mapResult.shoppingwebsite = record.getValue(storeFields.shoppingwebsite);
            mapResult.description = record.getValue(storeFields.description);
            mapResult.location = {
                latitude: record.getValue(storeFields.latitude),
                longitude: record.getValue(storeFields.longitude)
            };

            if (this.data.latitude && this.data.longitude) {
                distance = Math.round(record.getValue('formulanumeric') * 10) / 10;
                if (!_.isUndefined(distance)) {
                    mapResult.distance = Math.round(record.getValue('formulanumeric') * 10) / 10;
                    mapResult.distanceunit = Configuration.get('storeLocator.distanceUnit');
                }
            }
            return mapResult;
        }

    });
});
