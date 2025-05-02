/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.Location.VenueDetails.View', [
    'Location.VenueDetails.View',
    'locator_venue_details_custom.tpl',
    'underscore',
], function StoreLocatorLocationVenueDetailsView(LocationVenueDetailsView, locatorVenueDetailsCustomTpl, _) {
    'use strict';

    _.extend(LocationVenueDetailsView.prototype, {
        template: locatorVenueDetailsCustomTpl,

        getContext: _.wrap(LocationVenueDetailsView.prototype.getContext, function getContext(fn) {
            var result = fn.apply(this, _.toArray(arguments).slice(1));
            var parentView = this.parentView;
            var lastNavigation = parentView.profile_model.get('storeLocator_last_search');
            var directionUrl = parentView.reference_map.getDirectionsUrl(
                lastNavigation,
                parentView.model.get('location')
            );
            result.directionUrl = directionUrl || '#';
            if (this.model.get('corporatewebsite')) result.corporateWebsite = this.model.get('corporatewebsite');
            if (this.model.get('shoppingwebsite')) result.shoppingWebsite = this.model.get('shoppingwebsite');
            if (this.model.get('description').trim() !== '') {
                result.showDescription = true;
                result.locationDescription = this.model.get('description').split('\n\n');

                for (var i = 0; i < result.locationDescription.length; i++) {
                    result.locationDescription[i] = { lines: result.locationDescription[i].split('\n') };
                }
            }

            return result;
        }),
    });
});
