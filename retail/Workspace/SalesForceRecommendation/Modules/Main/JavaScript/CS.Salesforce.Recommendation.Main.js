/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('CS.Salesforce.Recommendation.Main', [
    'Salesforce.Recommendation.Slider.View',
    'Salesforce.Recommendation.Configuration',
    'Salesforce.Recommendation.SC.Shopping.Layout',
    'Salesforce.Recommendation.Cart.Detailed.View'
], function CSSalesForceRecommendationMain(
    SalesforceRecommendationSliderView) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');

            if (layout) {
                if (environment.getConfig('salesforceRecommendation.enabled')) {
                    // Add Saleforce Recommendation to FacetsNavigation
                    layout.addChildView('Facets.FacetedNavigation', function FacetsSalesforceSlider() {
                        return new SalesforceRecommendationSliderView({
                            section: 'category',
                            // eslint-disable-next-line no-underscore-dangle
                            application: container._layoutInstance.application,
                            isSingleItemSlider: true,
                            container: container
                        });
                    });
                    // Add Saleforce Recommendation for empty search result p
                    layout.addChildView('Facets.Items.Empty', function FacetsItemsEmptySalesforceSlider() {
                        return new SalesforceRecommendationSliderView({
                            section: 'search',
                            // eslint-disable-next-line no-underscore-dangle
                            application: container._layoutInstance.application,
                            container: container
                        });
                    });

                    layout.addChildView('Related.Items', function PDPSalesforceSlider() {
                        return new SalesforceRecommendationSliderView({
                            section: 'pdp',
                            // eslint-disable-next-line no-underscore-dangle
                            application: container._layoutInstance.application,
                            pdp: pdp,
                            container: container
                        });
                    });
                }
            }
        }
    };
});
