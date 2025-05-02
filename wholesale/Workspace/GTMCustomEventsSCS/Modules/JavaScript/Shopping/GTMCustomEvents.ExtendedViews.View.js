define('GTMCustomEvents.ExtendedViews.View', [], function () {
    'use strict';

    try {
        var GoogleTagManager = require('GoogleTagManager');
        var LiveOrderModel = require('LiveOrder.Model');
        var ItemsUtilities = require('CustomEvents.Items.Utilities');

        var CartAddToCartButtonView = require('Cart.AddToCart.Button.View');
        var cartAddToCartButtonPrototype = CartAddToCartButtonView.prototype;
        _(cartAddToCartButtonPrototype).extend({
            addToCart: _.wrap(cartAddToCartButtonPrototype.addToCart, function (fn) {
                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'add');

                fn.apply(this, Array.prototype.slice.call(arguments, 1));
            }),
        });

        var MatrixMultiAddView = require('MatrixMultiAdd.View');
        var matrixMultiAddPrototype = MatrixMultiAddView.prototype;
        _(matrixMultiAddPrototype).extend({
            addToCart: _.wrap(matrixMultiAddPrototype.addToCart, function (fn) {
                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'add');

                var myItemsIds = [];

                _.each(this.itemsForCart.getAll(), function (item) {
                    var childItem = item[0];
                    myItemsIds.push(childItem.internalid);
                });

                localStorage.setItem('matrixItemsIds', JSON.stringify(myItemsIds));

                fn.apply(this, Array.prototype.slice.call(arguments, 1));

                GoogleTagManager.trackViewCart(LiveOrderModel.getInstance());
            }),
        });

        var CartDetailedView = require('Cart.Detailed.View');
        var cartDetailedPrototype = CartDetailedView.prototype;
        _(cartDetailedPrototype).extend({
            updateItemQuantityEvent: _.wrap(
                cartDetailedPrototype.updateItemQuantityEvent,
                function (fn) {
                    !localStorage.getItem('cartEventType') &&
                        localStorage.setItem('cartEventType', 'update');

                    fn.apply(this, Array.prototype.slice.call(arguments, 1));
                }
            ),
            updateItemQuantityFormSubmit: _.wrap(
                cartDetailedPrototype.updateItemQuantityFormSubmit,
                function (fn) {
                    !localStorage.getItem('cartEventType') &&
                        localStorage.setItem('cartEventType', 'update');

                    fn.apply(this, Array.prototype.slice.call(arguments, 1));
                }
            ),
            removeItem: _.wrap(cartDetailedPrototype.removeItem, function (fn) {
                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'remove');

                fn.apply(this, Array.prototype.slice.call(arguments, 1));
            }),
        });

        var HeaderMiniCartView = require('Header.MiniCart.View');
        var miniCartPrototype = HeaderMiniCartView.prototype;
        _(miniCartPrototype).extend({
            events: _.extend({}, HeaderMiniCartView.prototype.events, {
                'click [data-touchpoint="checkout"]': 'triggerBeginCheckout',
                'click .header-mini-cart-menu-cart-link:not([data-toggle])': 'triggerViewCart',
                'click .header-mini-cart-button-view-cart[data-touchpoint="home"]':
                    'triggerViewCart',
            }),
            triggerBeginCheckout() {
                GoogleTagManager.trackBeginCheckout(this.model);
            },
            triggerViewCart() {
                GoogleTagManager.trackViewCart(this.model);
            },
        });

        var CartSummaryView = require('Cart.Summary.View');
        var cartSummaryPrototype = CartSummaryView.prototype;
        _(cartSummaryPrototype).extend({
            events: _.extend({}, CartSummaryView.prototype.events, {
                'click [data-touchpoint="checkout"]': 'triggerBeginCheckout',
            }),
            triggerBeginCheckout() {
                GoogleTagManager.trackBeginCheckout(this.model);
            },
        });

        var CartConfirmationView = require('Cart.Confirmation.View');
        var cartConfirmationPrototype = CartConfirmationView.prototype;
        _(cartConfirmationPrototype).extend({
            events: _.extend({}, CartConfirmationView.prototype.events, {
                'click .cart-confirmation-modal-view-cart-button': 'triggerViewCart',
            }),
            triggerViewCart() {
                GoogleTagManager.trackViewCart(LiveOrderModel.getInstance());
            },
        });

        var ProductListCartSaveForLaterView = require('ProductList.CartSaveForLater.View');
        var cartSaveForLaterPrototype = ProductListCartSaveForLaterView.prototype;
        _(cartSaveForLaterPrototype).extend({
            saveForLaterItem: _.wrap(cartSaveForLaterPrototype.saveForLaterItem, function (fn, e) {
                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'save_for_later');

                fn.apply(this, Array.prototype.slice.call(arguments, 1));
            }),
        });

        var QuickOrderAddView = require('QuickOrderAdd.View');
        var quickOrderPrototype = QuickOrderAddView.prototype;
        _(quickOrderPrototype).extend({
            addToCart: _.wrap(quickOrderPrototype.addToCart, function (fn, lines) {
                fn.apply(this, Array.prototype.slice.call(arguments, 1));

                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'quick-add');

                var myItempluck = this.collection.map(function map(line) {
                    var item = line.get('item');

                    // Set unique line id
                    item.set('addedToCart', line.get('addedToCart'));
                    item.set('referenceLine', line.get('referenceLine'));
                    return line.get('item');
                });

                // filter out empty line items (e.g. new line) & lines already added to cart
                var myFiltered = _.reject(myItempluck, function filtered(num) {
                    return (
                        !_.has(num, 'id') ||
                        num.get('addedToCart') === true ||
                        num.get('_isPurchasable') === false
                    );
                });

                GoogleTagManager.trackAddToCart(myFiltered);
            }),
            removeLine: _.wrap(quickOrderPrototype.removeLine, function (fn, e) {
                var $button = jQuery(e.currentTarget);
                var index = $button.data('index');
                var line = this.collection.findWhere({ internalid: index });

                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'quick-remove');
                GoogleTagManager.trackAddToCart(line);

                fn.apply(this, Array.prototype.slice.call(arguments, 1));
            }),
            updateQty: _.wrap(quickOrderPrototype.updateQty, function (fn, e) {
                fn.apply(this, Array.prototype.slice.call(arguments, 1));

                var $element = jQuery(e.target);
                var index = $element.data('index');
                var line = this.collection.findWhere({ internalid: index });

                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'quick-update');
                GoogleTagManager.trackAddToCart(line);
            }),
            resultSelected: _.wrap(quickOrderPrototype.resultSelected, function (fn, e) {
                fn.apply(this, Array.prototype.slice.call(arguments, 1));

                var $select = jQuery(e.target);
                var index = $select.data('index');
                var line = this.collection.findWhere({ internalid: index });

                !localStorage.getItem('cartEventType') &&
                    localStorage.setItem('cartEventType', 'quick-update');
                GoogleTagManager.trackAddToCart(line);
            }),
        });

        var RelatedItemView = require('ItemRelations.Related.View');
        var relatedItemPrototype = RelatedItemView.prototype;
        _(relatedItemPrototype).extend({
            events: _.extend({}, relatedItemPrototype.events, {
                "click [itemprop='itemListElement']": 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });

        var CorelatedItemView = require('ItemRelations.Correlated.View');
        var corelatedItemPrototype = CorelatedItemView.prototype;
        _(corelatedItemPrototype).extend({
            events: _.extend({}, corelatedItemPrototype.events, {
                "click [itemprop='itemListElement']": 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });

        var CategoryCell = require('Facets.Browse.View');
        var categoryCellPrototype = CategoryCell.prototype;
        _(categoryCellPrototype).extend({
            events: _.extend({}, categoryCellPrototype.events, {
                'click .facets-items-collection-view-cell-span3': 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });
    } catch (error) {
        throw new Error(error);
    }
});
