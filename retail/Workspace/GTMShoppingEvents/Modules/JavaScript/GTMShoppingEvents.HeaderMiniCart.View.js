define('GTMShoppingEvents.HeaderMiniCart.View', [
    'GoogleTagManager',
    'LiveOrder.Model',
    'Header.MiniCart.View',
    'Cart.Summary.View',
    'Cart.Confirmation.View',
], function (GoogleTagManager, LiveOrderModel, HeaderMiniCartView, CartSummaryView, CartConfirmationView) {
    'use strict';

    _.extend(HeaderMiniCartView.prototype, {
        events: _.extend({}, HeaderMiniCartView.prototype.events, {
            'click .header-mini-cart-buttons a[data-touchpoint="checkout"]': 'triggerBeginCheckout',
            'click .header-mini-cart-buttons a[data-touchpoint="home"]': 'triggerViewCart',
        }),
        triggerBeginCheckout() {
            GoogleTagManager.trackBeginCheckout(this.model);
        },
        triggerViewCart() {
            GoogleTagManager.trackViewCart(this.model);
        },
    });

    _.extend(CartSummaryView.prototype, {
        events: _.extend({}, CartSummaryView.prototype.events, {
            'click .cart-summary-button-container a[data-touchpoint="checkout"]': 'triggerBeginCheckout',
        }),
        triggerBeginCheckout() {
            GoogleTagManager.trackBeginCheckout(this.model);
        },
    });

    _.extend(CartConfirmationView.prototype, {
        events: _.extend({}, CartConfirmationView.prototype.events, {
            'click .cart-confirmation-modal-actions .cart-confirmation-modal-view-cart-button': 'triggerViewCart',
        }),
        triggerViewCart() {
            GoogleTagManager.trackViewCart(LiveOrderModel.getInstance());
        },
    });

    var CartAddToCartButtonView = require('Cart.AddToCart.Button.View');
    var cartAddToCartButtonPrototype = CartAddToCartButtonView.prototype;
    _(cartAddToCartButtonPrototype).extend({
        addToCart: _.wrap(cartAddToCartButtonPrototype.addToCart, function (fn) {
            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'add');

            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),
    });

    var CartDetailedView = require('Cart.Detailed.View');
    var cartDetailedPrototype = CartDetailedView.prototype;
    _(cartDetailedPrototype).extend({
        updateItemQuantity: _.wrap(cartDetailedPrototype.updateItemQuantity, function (fn) {
            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'update');

            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),
        updateItemQuantityFormSubmit: _.wrap(cartDetailedPrototype.updateItemQuantityFormSubmit, function (fn) {
            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'update');

            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),
        removeItem: _.wrap(cartDetailedPrototype.removeItem, function (fn, event) {
            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'remove');

            var itemId = $(event.currentTarget).closest('div.cart-lines-table-middle').parent().attr('id');

            var liveOrderModel = LiveOrderModel.getInstance();

            var line = liveOrderModel.get('lines').models.find(function (_model) {
                return _model.id === itemId;
            });

            fn.apply(this, Array.prototype.slice.call(arguments, 1));

            GoogleTagManager.trackAddToCart(line);
        }),
    });
});
