define('GoogleTagManager.Extension', [
    'GoogleTagManager',
    'Tracker',
    'underscore',
], function HideProductsMasterFacetHelper(GoogleTagManager, Tracker, _) {
    'use strict';

    _.extend(GoogleTagManager, {
        trackPageview: function trackPageview(url) {
            var applicationsList = ['Shopping', 'MyAccount.Full', 'Checkout'];
            var applicationName = applicationsList.find(function (_application) {
                return SC._applications[_application];
            });

            var application = SC._applications[applicationName];

            if (_.isString(url) && application) {
                var currentUrl = window.location.href;
                var currentView = application._layoutInstance.getCurrentView();
                var currentPage = currentView.$el.get(0).id;
                var section = '';

                switch (currentPage) {
                    case 'facet-browse':
                        section = url.includes('search') ? 'Search Page' : 'Category Page';
                        break;

                    case 'home-page':
                        section = 'Home Page';
                        break;

                    case 'checkout':
                        section = 'Checkout Page';
                        break;

                    case 'ProductDetails.QuickView.View':
                    case 'ProductDetails.Full.View':
                        section = 'PDP Page';
                        break;

                    case 'Cart.Detailed.View':
                        section = 'Cart Page';
                        break;

                    default:
                        section = currentUrl.includes('/my_account.ssp')
                            ? 'My Account Page'
                            : 'Company / Other Page';
                        break;
                }

                var newURL = url;
                var eventName = 'pageView';
                var eventNameId = 'pageView';

                if (newURL.indexOf('to-email') > -1) {
                    newURL = newURL.split('?')[0];
                }

                var eventData = {
                    event: eventNameId,
                    data: {
                        page: newURL,
                        section_of_website: section,
                    },
                };

                // Triggers a Backbone.Event so others can subscribe to this event and add/replace
                // data before is send it to Google Tag Manager
                localStorage.removeItem('recently_viewed');
                localStorage.removeItem('trackEventValue');
                Tracker.trigger(eventName, eventData, newURL);
                this.pushData(eventData);
            }

            return this;
        },
    });
});
