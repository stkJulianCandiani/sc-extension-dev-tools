/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('GeoIp.Model', [
    'SC.Model',
    'GeoIp.Configuration'
], function GeoIpModel(
    SCModel,
    GeoIpConfiguration
) {
    'use strict';

    return SCModel.extend({
        name: 'GeoIp.Model',

        getLatLong: function getLatLong() {
            var lat = 0;
            var long = 0;
            var GeoIpResponse = null;
            var responseJSON = null;
            var serviceURL;
            var uname = GeoIpConfiguration.userid;
            var pwd = GeoIpConfiguration.licensekey;
            var credentials = uname + ':' + pwd;
            var creds = nlapiEncrypt(credentials, 'base64');
            var headers = {
                Authorization: 'Basic ' + creds,
                Accept: 'application/json'
            };
            var ip = request.getHeader('True-Client-IP') || request.getHeader('NS-Client-IP');
            if (!ip) {
                return {
                    latitude: lat,
                    longitude: long,
                    warning: 'no ip found'
                };
            }
            serviceURL = GeoIpConfiguration.serviceURL + ip + '?pretty';
            try {
                GeoIpResponse = nlapiRequestURL(serviceURL, null, headers);
                try {
                    responseJSON = JSON.parse(GeoIpResponse.getBody());
                    lat = responseJSON.location.latitude;
                    long = responseJSON.location.longitude;
                } catch (e) {
                    nlapiLogExecution('ERROR', 'Store Locator | GeoIp.Model Parsing Error',
                        'error parsing GeoIp response details: ' + JSON.stringify(e.message));
                    nlapiLogExecution('ERROR', 'Store Locator | GeoIp.Model GeoIP responseJSON',
                        JSON.stringify(responseJSON));
                }
            } catch (e) {
                nlapiLogExecution('ERROR', 'Store Locator | GeoIp.Mode Calling Error', 'error calling GEOIP Service details: ' + JSON.stringify(e.message));
            }

            return {
                latitude: lat,
                longitude: long,
                warning: 'latlong found'
            };
        }
    });
});
