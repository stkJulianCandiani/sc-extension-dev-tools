define('Donation.Tracker', [
    'Tracker'
], function DonationTracker(
    Tracker
) {
    'use strict';

    Tracker.prototype.trackAddToCart = function trackAddToCart(line) {
        return this.track('trackEvent', {
            category: 'Shopping - User Interaction',
            action: 'Add To Cart',
            label: line && line.generateURL()
        }).track('trackAddToCart', line);
    };
});
