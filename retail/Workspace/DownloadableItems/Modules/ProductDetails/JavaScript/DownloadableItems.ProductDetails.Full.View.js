/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.ProductDetails.Full.View', [
    'ProductDetails.Full.View',
    'Item.Collection',
    'Item.Model',
    'Product.Model',
    'Backbone',
    'jQuery',
    'underscore',
    'DownloadableItems.ChildItems.View',
    'DownloadableItems.HardCopy.View'
], function DownloadableItemsProductDetailsFullView(
    ProductDetailsFullView,
    ItemCollection,
    ItemModel,
    ProductModel,
    Backbone,
    jQuery,
    _,
    DownloadableItemsChildItemsView,
    DownloadableItemsHardCopyView
) {
    'use strict';

    var productDetailsFullViewPrototype = ProductDetailsFullView.prototype;

    _(productDetailsFullViewPrototype).extend({
        events: _.extend({}, productDetailsFullViewPrototype.events, {
            'click [data-action="select-all-tracks"]': 'triggerCheckboxes'
        }),

        triggerCheckboxes: function triggerCheckboxes(e) {
            var $target = jQuery(e.currentTarget);
            this.$('[data-action="select-track"]').prop('checked', $target.is(':checked'));
        },

        isDownloadItem: function isDownloadItem() {
            var item = this.model.getItem();
            return item.get('itemtype') === 'DwnLdItem';
        },

        childViews: _(productDetailsFullViewPrototype.childViews || {}).extend({
            'DownloadableItem': function DownloadableItem() {
                var item = this.model.getItem();
                var downloadModel;
                var downloadItemId = item.get('custitem_sc_downloadable_item_id');
                var view;

                if (downloadItemId) {
                    downloadModel = new ItemModel();
                    downloadModel.fetch({
                        data: {
                            id: downloadItemId
                        }
                    });

                    view = new DownloadableItemsHardCopyView({
                        parentItem: this.model,
                        model: new ProductModel({
                            item: downloadModel
                        }),
                        container: this.application
                    });
                }

                return view;
            },

            'DownloadableItems.ChildItems': function DownloadableItemsChildItems() {
                var downloadableItems = new ItemCollection();
                var view = new DownloadableItemsChildItemsView({
                    collection: downloadableItems
                });
                var item = this.model.getItem();

                this.downloadableItems = downloadableItems;

                if (this.isDownloadItem()) {
                    downloadableItems.fetch({
                        data: {
                            fieldset: 'downloadable_items',
                            custitem_sc_subitem_of_di: item.get('internalid')
                        }
                    });
                }

                return view;
            }
        }),
        getContext: _.wrap(ProductDetailsFullView.prototype.getContext, function wrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.isDownloadItemList = this.isDownloadItem();

            return context;
        })
    });

    return ProductDetailsFullView;
});
