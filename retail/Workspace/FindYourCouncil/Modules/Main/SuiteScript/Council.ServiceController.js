/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.ServiceController', [
    'ServiceController',
    'Council.Model'
], function CouncilServiceController(
    ServiceController,
    CouncilModel
) {
    'use strict';

    return ServiceController.extend({

        name: 'Council.ServiceController',

        // TODO: is this needed?
        options: {
            common: {
                requireLoggedInPPS: false
            }
        },

        get: function get() {
            var zipcode = this.request.getParameter('zipcode');
            var fullurl = this.request.getParameter('fullurl') || this.request.getParameter('commercecategoryurl');

            if (!zipcode && !fullurl) {
                throw 'Please provide a zipcode or select a council';
            }

            return CouncilModel.get({ zipcode: zipcode, fullurl: fullurl });
        }
    });
});
