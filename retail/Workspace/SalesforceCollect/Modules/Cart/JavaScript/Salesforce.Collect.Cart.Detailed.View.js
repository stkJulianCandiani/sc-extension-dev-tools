/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Collect.Cart.Detailed.View', [
    'Cart.Detailed.View',
    'Tracker',
    'underscore'
], function SalesforceCollectCartDetailedViewt(
    CartDetailedView,
    Tracker,
    _) {
    'use strict';

    var viewPrototype = CartDetailedView.prototype;

    _(viewPrototype).extend({
        events: _.extend(viewPrototype.events, {
            'click [data-action="empty-cart"]': 'emptyCart',
            'click [data-action="remove-item"]': 'removeItem'
        }),

        emptyCart: function emptyCart() {
            Tracker.getInstance().trackEvent({
                category: 'empty-cart',
                action: 'click',
                value: 1,
                callback: _.noop()
            });
        },

        removeItem: _.wrap(viewPrototype.removeItem, function wrapRemoveItem(fn) {
            var result = fn.apply(this, Array.prototype.slice.call(arguments, 1));
            Tracker.getInstance().trackEvent({
                category: 'remove-item',
                action: 'click',
                value: 1,
                callback: _.noop()
            });
            return result;
        })
    });

    return CartDetailedView;
});

