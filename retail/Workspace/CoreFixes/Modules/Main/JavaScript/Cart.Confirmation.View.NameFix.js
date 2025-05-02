define('Cart.Confirmation.View.NameFix', [
    'Cart.Confirmation.View',
    'underscore'
], function CartConfirmationViewNameFix(
    CartConfirmationView,
    _
) {
    'use strict';

    _.extend(CartConfirmationView.prototype, {
        getContext: _.wrap(CartConfirmationView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var item = this.model.get('item');
            var parent = item.get('_matrixParent', true);

            if (parent.get('internalid')) {
                context.itemName = parent.get('_name', true);
            }

            return context;
        })
    });
});
