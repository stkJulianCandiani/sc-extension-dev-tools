
/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Recommendation.Cart.Detailed.View', [
    'Cart.Detailed.View',
    'Salesforce.Recommendation.Slider.View',
    'SC.Configuration',
    'salesforce_recommendation_cart_detailed.tpl',
    'underscore'
], function SalesforceRecommendationCartDetailedViewt(
    CartDetailedView,
    SalesforceSliderView,
    Configuration,
    customTpl,
    _) {
    'use strict';

    if (Configuration.get('salesforceRecommendation.enabled')) {
        _.extend(CartDetailedView.prototype, {
            template: customTpl
        });

        CartDetailedView.prototype.childViews['Cart.SalesforceSlider'] = function CartSalesforceSlider() {
            return new SalesforceSliderView({
                section: 'checkout',
                application: this.options.application,
                container: this.options.container
            });
        };
    }
});

