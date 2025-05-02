define('STKQuickOrder.View', ['CS.QuickOrder.View', 'GoogleTagManager', 'LiveOrder.Model'], function (
    CSQuickOrderView,
    GoogleTagManager,
    LiveOrderModel
) {
    'use strict';

    var QuickOrderView = require('CS.QuickOrder.View');
    var quickOrderPrototype = QuickOrderView.prototype;
    _(quickOrderPrototype).extend({
        addToCart: _.wrap(quickOrderPrototype.addToCart, function (fn, lines) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));

            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'quick-add');

            var myItempluck = this.collection.map(function map(line) {
                var item = line.get('item');

                // Set unique line id
                item.set('addedToCart', line.get('addedToCart'));
                item.set('referenceLine', line.get('referenceLine'));
                return line.get('item');
            });

            // filter out empty line items (e.g. new line) & lines already added to cart
            var myFiltered = _.reject(myItempluck, function filtered(num) {
                return !_.has(num, 'id') || num.get('addedToCart') === true || num.get('_isPurchasable') === false;
            });

            GoogleTagManager.trackAddToCart({ items: myFiltered });
        }),
        removeLine: _.wrap(quickOrderPrototype.removeLine, function (fn, e) {
            var $button = jQuery(e.currentTarget);
            var index = $button.data('index');
            var line = this.collection.findWhere({ internalid: index });

            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'quick-remove');
            GoogleTagManager.trackAddToCart(line);

            fn.apply(this, Array.prototype.slice.call(arguments, 1));
        }),
        updateQty: _.wrap(quickOrderPrototype.updateQty, function (fn, e) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));

            var $element = jQuery(e.target);
            var index = $element.data('index');
            var line = this.collection.findWhere({ internalid: index });

            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'quick-update');
            GoogleTagManager.trackAddToCart(line);
        }),
        resultSelected: _.wrap(quickOrderPrototype.resultSelected, function (fn, e) {
            fn.apply(this, Array.prototype.slice.call(arguments, 1));

            var $select = jQuery(e.target);
            var index = $select.data('index');
            var line = this.collection.findWhere({ internalid: index });

            !localStorage.getItem('cartEventType') && localStorage.setItem('cartEventType', 'quick-update');
            GoogleTagManager.trackAddToCart(line);
        }),
    });
});
