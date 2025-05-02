define('FAQ.ServiceController', [
    'ServiceController',
    'Application',
    'FAQ.Model'
], function FAQServiceController(
    ServiceController,
    Application,
    FAQ
) {
    'use strict';

    return ServiceController.extend({
        name: 'FAQ.ServiceController',
        get: function get() {
            /* var category = this.request.getParameter('section'); */
            return FAQ.get(/* section */);
        }
    });
});
