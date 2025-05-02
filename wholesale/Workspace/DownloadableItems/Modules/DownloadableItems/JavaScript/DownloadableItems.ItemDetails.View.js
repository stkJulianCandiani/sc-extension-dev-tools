define('DownloadableItems.ItemDetails.View', [
    'ItemDetails.View',
    'ItemDetails.Collection',
    'SC.Configuration',
    'Backbone.CollectionView',
    'Backbone',
    'jQuery',
    'Utils',
    'underscore',
    'DownloadableItems.ChildItems.View',
    'LiveOrder.Model'
], function (
    ItemDetailsView,
    ItemDetailsCollection,
    Configuration,
    BackboneCollectionView,
    Backbone,
    jQuery,
    Utils,
    _,
    DownloadableItemsChildItemsView,
    LiveOrderModel
) {
    'use strict';

    var viewPrototype = ItemDetailsView.prototype;

    _(viewPrototype).extend({
        events: _.extend(viewPrototype.events, {
            'click [data-action="addAllToCart"]': 'addAllToCart',
            'click [data-action="select-all-tracks"]': 'triggerCheckboxes'
        }),
        triggerCheckboxes: function (e) {
            var $target = jQuery(e.currentTarget);

            if ($target.is(':checked')) {
                this.$('[data-action="select-track"]').prop('checked', true);
            } else {
                this.$('[data-action="select-track"]').prop('checked', false);
            }
        },
        addToCart: _.wrap(viewPrototype.addToCart, function (fn) {
            var $itemIds;
            var itemIds;
            var cartPromise;
            var items;
            var layout = this.application.getLayout();
            var cart = LiveOrderModel.getInstance();
            if (this.isDownloadItem()) {
                Array.prototype.slice.call(arguments, 1)[0].preventDefault();
                $itemIds = this.$('[data-action="select-track"]:checked');
                if (!$itemIds || $itemIds.length <= 0) {
                    this.showError(_('Please select a track').translate());
                } else {
                    itemIds = [];
                    _.each($itemIds, function ($item) {
                        itemIds.push(jQuery($item).data('itemid'));
                    });
                    items = this.childItems.filter(function (item) {
                        return _.contains(itemIds, item.get('internalid'));
                    });
                    cart.optimistic = {
                        item: items[0],
                        quantity: 1
                    };
                    cartPromise = LiveOrderModel.getInstance().addItems(items);
                    cart.optimistic.promise = cartPromise;
                    layout.showCartConfirmation();
                }
            } else {
                fn.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }),
        isDownloadItem: function () {
            return this.model.get('itemtype') === 'DwnLdItem';
        },
        childViews: _(viewPrototype.childViews || {}).extend({
            'DownloadableItems.ChildItems': function () {
                var self = this;
                var childItems = new ItemDetailsCollection();
                var view = new DownloadableItemsChildItemsView();
                view.collection = childItems;
                this.childItems = childItems;
                if (this.isDownloadItem()) {
                    childItems.fetch({
                        data: {
                            custitem_sc_subitem_of_di: self.model.get('internalid'),
                            fieldset: 'details'
                        }
                    }).done(function () {
                        view.render();
                    });
                }
                return view;
            }
        })
    });

    return ItemDetailsView;
});
