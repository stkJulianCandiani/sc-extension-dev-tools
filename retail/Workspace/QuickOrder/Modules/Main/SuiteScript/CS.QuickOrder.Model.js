/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.Model', [
    'SC.Model',
    'Models.Init',
    'StoreItem.Model',
    'underscore'
], function CSQuickOrderModel(
    SCModel,
    CommerceAPI,
    StoreItem,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'QuickOrder',

        get: function get(keyword, request) {
            var sanitizedKeyword = (keyword || '').toString().trim();
            var items = this.getItems(sanitizedKeyword, CommerceAPI.session.getSiteSettings(['siteid']).siteid, request);
            var filteredResults = [];
            var firstXSorted;

            // This filters results that are because of matrix naming conventions.
            // Looks like parent itemid is propagated ON FILTERS to the child itemid.
            // Not on columns, so we filter it in frontend.

            _.each(items, function each(item) {
                if (item && item.itemid && item.itemid.toLowerCase().indexOf(sanitizedKeyword.toLowerCase()) !== -1) {
                    filteredResults.push(item);
                }
                if (item && item.displayname && item.displayname.toLowerCase().indexOf(sanitizedKeyword.toLowerCase()) !== -1) {
                    filteredResults.push(item);
                }
            });

            firstXSorted = _.first(
                _.sortBy(filteredResults, function sortBy(result) {
                    return result.itemid.length;
                }), 25
            );

            StoreItem.preloadItems(firstXSorted);

            return {
                items: _.compact(
                    _.map(firstXSorted, function map(result) {
                        return StoreItem.get(result.id, result.type);
                    })
                )
            };
        },

        getItems: function getItems(userInput, siteId, request) {
            var serviceUrl = nlapiResolveURL(
                'SUITELET',
                'customscript_quickorder',
                'customdeploy_quickorder',
                true
            );
            var apiResponse;
            var responseData;
            var unknownError = {
                status: 500,
                code: 'ERR_UNKNONW',
                message: 'Internal error'
            };
            serviceUrl += '&userInput=' + encodeURIComponent(userInput);
            serviceUrl += '&siteId=' + siteId;

            apiResponse = nlapiRequestURL(serviceUrl);

            if (parseInt(apiResponse.getCode(), 10) !== 200) {
                throw unknownError;
            }

            try {
                responseData = JSON.parse(apiResponse.getBody());
            } catch (e) {
                throw unknownError;
            }

            if (apiResponse.getHeader('Custom-Header-Status') &&
                parseInt(apiResponse.getHeader('Custom-Header-Status'), 10) !== 200
            ) {
                throw _.extend({}, {
                    status: apiResponse.getHeader('Custom-Header-Status'),
                    code: responseData.errorCode,
                    message: responseData.errorMessage
                });
            }

            return responseData;
        }
    });
});
