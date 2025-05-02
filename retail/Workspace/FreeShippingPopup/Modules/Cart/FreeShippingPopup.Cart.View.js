define('FreeShippingPopup.Cart.View', [
    'Cart.Detailed.View',
    'CS.FreeShipping.Modal.View',
    'SC.Configuration',
    'Backbone',
    'underscore',
    'SC.Configuration'
], function FreeShippingPopupCartView(
    CartDetailsView,
    FreeShippingPopUp,
    SCConfiguration,
    Backbone,
    _,
    Configuration
) {
    'use strict';

    var cartDetailedViewPrototype = CartDetailsView.prototype;
    _(cartDetailedViewPrototype).extend({
        events: _.extend(cartDetailedViewPrototype.events, {
            'click [data-touchpoint="checkout"]': 'showFreeShipping'
        }),
        showFreeShipping: function showFreeShipping(e) {
            var freeShippingConfig = Configuration.get('freeshipping.config');
            var threshold = freeShippingConfig.threshold;
            var freeShippingAt = freeShippingConfig.limit;
            var subtotal = this.model.get('summary') ? this.model.get('summary').subtotal : 0;
            var remaining = freeShippingAt - subtotal;
            var freeShippingPopup = new FreeShippingPopUp({
                threshold: remaining,
                application: this.application
            });
            if (remaining > 0 && (freeShippingAt - threshold) > 0 && (freeShippingAt - threshold) > remaining) {
                e.preventDefault();
                e.stopPropagation();
                freeShippingPopup.showInModal();
            }
        }
    });
});
