/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Cart.Lines.View', [
    'Cart.Lines.View',
    'underscore'
], function DownloadableItemsCartLinesView(
    CartLinesView,
    _
) {
    'use strict';

    _.extend(CartLinesView.prototype, {
        getContext: _.wrap(CartLinesView.prototype.getContext, function getContext(fn) {
            var context;
            var cartOptionUrl = this.model.getOption('custcol_downloadable_item_url');

            if (cartOptionUrl) {
                cartOptionUrl = cartOptionUrl.get('value') && cartOptionUrl.get('value').internalid;

                if (cartOptionUrl) {
                    this.model.get('item').set('urlcomponent', cartOptionUrl);
                    this.model.get('item').get('_url', true);
                }
            }

            context = fn.apply(this, _.toArray(arguments).slice(1));

            return context;
        })
    });
});
