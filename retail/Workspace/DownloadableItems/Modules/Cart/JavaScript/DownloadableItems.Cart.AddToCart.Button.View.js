/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Cart.AddToCart.Button.View', [
    'Cart.AddToCart.Button.View',
    'LiveOrder.Line.Model',
    'Cart.Confirmation.Helpers',
    'jQuery',
    'underscore'
], function DownloadableItemsCartAddToCartButtonView(
    CartAddToCartButtonView,
    LiveOrderLineModel,
    CartConfirmationHelpers,
    jQuery,
    _
) {
    var addToCartButtonViewPrototype = CartAddToCartButtonView.prototype;

    _(addToCartButtonViewPrototype).extend({
        isDownloadItem: function isDownloadItem() {
            var item = this.model.getItem();
            return item.get('itemtype') === 'DwnLdItem';
        },

        addToCart: _.wrap(addToCartButtonViewPrototype.addToCart, function addToCart(fn) {
            var args = _.toArray(arguments).slice(1);
            var e = args[0];

            e.stopPropagation();
            e.preventDefault();

            if (this.isDownloadItem()) {
                this.addToCartDownloadableItems(e);
            } else {
                fn.apply(this, args);
            }
        }),

        addToCartDownloadableItems: function addToCartDownloadableItems(e) {
            var cart = this.options.application.getComponent('Cart');
            var downloadableItems = this.parentView.downloadableItems;
            var $itemIds = jQuery('[data-action="select-track"]:checked');
            var parentItem = this.parentView.model.getItem();
            var cartPromise;
            var itemIds;
            var items;
            var line;

            if (!$itemIds || $itemIds.length <= 0) {
                this.showError(_('Please select a track').translate());
            } else {
                itemIds = [];

                _.each($itemIds, function eachItem($item) {
                    itemIds.push(jQuery($item).data('itemid'));
                });

                if (downloadableItems && downloadableItems.length) {
                    items = this.parentView.downloadableItems.reduce(function reduceItems(itemsList, item) {
                        if (_.contains(itemIds, item.get('internalid'))) {
                            itemsList.push({
                                quantity: 1,
                                item: {
                                    internalid: item.get('internalid')
                                },
                                options: [{ // The following option is used to save the parent item url to use it later from the cart
                                    'cartOptionId': 'custcol_downloadable_item_url',
                                    'value': {
                                        internalid: parentItem.get('urlcomponent')
                                    }
                                }]
                            });
                        }

                        return itemsList;
                    }, []);

                    this.model.set('quantity', 1);

                    line = LiveOrderLineModel.createFromProduct(this.model);

                    cartPromise = cart.addLines({
                        lines: items
                    });

                    CartConfirmationHelpers.showCartConfirmation(
                        cartPromise,
                        line,
                        this.options.application
                    );

                    this.disableElementsOnPromise(cartPromise, e.target);
                }
            }

            return false;
        }
    });
});
