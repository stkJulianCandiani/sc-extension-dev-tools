define('Monogram.CartConfirmation.View', [
    'Cart.Confirmation.View',
    'underscore',
    'Monogram.Values',
    'Utils'
], function MonogramCartConfirmationView(
    CartConfirmationView,
    _,
    MonogramValues,
    Utils
) {
    'use strict';

    return _.extend(CartConfirmationView.prototype, {

        getContext: _.wrap(CartConfirmationView.prototype.getContext, function wrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var monogramSelection;
            var extraCost;
            try {
                if (this.model.get('options')) {
                    monogramSelection = _.find(this.model.get('options').models, function findSelection(option) {
                        return option.get('cartOptionId') === MonogramValues.itemOptions.alphabetSelection;
                    });
                    if (monogramSelection && monogramSelection.get('value')) {
                        extraCost = _.find(this.model.get('options').models, function findSelection(option) {
                            return option.get('cartOptionId') === MonogramValues.itemOptions.cost;
                        });
                        _.extend(context, {
                            showMonogram: true,
                            monogramSelection: monogramSelection.get('value').internalid,
                            monogrammingFee: Utils.formatCurrency(extraCost.get('value').internalid)
                        });
                    }
                    _.extend(context, {
                        aggregatedTotal: this.model.get('aggregatedTotal'),
                        serviceFee: this.model.get('serviceFee')
                    });
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
            return context;
        })
    });
});
