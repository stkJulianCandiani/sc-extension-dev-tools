define('Transaction.Model.Extension', [
    'LiveOrder.Line.Model',
    'Product.Model',
    'Transaction.Line.Model',
    'underscore'
], function HideProductsMasterFacetHelper(
    LiveOrderLineModel,
    ProductModel,
    TransactionLineModel,
    _
) {
    'use strict';

    function excludeGiftCardOptions(params) {
        if (!params[0]) {
            params[0] = {};
        }
        params[0]['to-email'] = null;
        params[0].from = null;
        params[0].to = null;
        params[0].message = null;
        return params;
    }

    _.extend(ProductModel.prototype, {
        getQuery: _.wrap(ProductModel.prototype.getQuery, function getContext(fn) {
            return fn.apply(this, excludeGiftCardOptions(_.toArray(arguments).slice(1)));
        })
    });

    _.extend(TransactionLineModel.prototype, {
        getQuery: _.wrap(TransactionLineModel.prototype.getQuery, function getContext(fn) {
            return fn.apply(this, excludeGiftCardOptions(_.toArray(arguments).slice(1)));
        })
    });

    _.extend(LiveOrderLineModel.prototype, {
        getQuery: _.wrap(LiveOrderLineModel.prototype.getQuery, function getContext(fn) {
            return fn.apply(this, excludeGiftCardOptions(_.toArray(arguments).slice(1)));
        })
    });
});
