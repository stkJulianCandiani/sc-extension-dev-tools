/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Merchandising.Item.View', [
    'ProductViews.Price.View',
    'Backbone.CompositeView',
    'merchandising-item.tpl',
    'Backbone'
], function CMSMerchandisingZonesItemViewSite(
    ProductViewsViewsPriceView,
    BackboneCompositeView,
    merchandisingItemTpl,
    Backbone
) {
    'use strict';

    // @extend Backbone.View
    return Backbone.View.extend({

        template: merchandisingItemTpl,
        initialize: function initialize() {
            Backbone.View.prototype.initialize.apply(this, arguments);
            BackboneCompositeView.add(this);
        },
        childViews: {
            'Item.Price': function ItemPrice() {
                return new ProductViewsViewsPriceView({
                    model: this.model,
                    origin: 'RELATEDITEM'
                });
            }
        },
        getContext: function getContext() {
            return {
                showRating: SC.ENVIRONMENT.REVIEWS_CONFIG && SC.ENVIRONMENT.REVIEWS_CONFIG.enabled,
                itemURL: this.model.get('_url'),
                linkAttributes: this.model.get('_linkAttributes'),
                itemName: this.model.get('_name') || this.model.Name,
                itemTag: this.model.get('custitem_item_status'),
                hasItemTag: this.model.get('custitem_item_status') != null,
                thumbnailURL: this.model.get('_thumbnail').url,
                thumbnailAltImageText: this.model.get('_thumbnail').altimagetext,
                track_productlist_list: this.model.get('track_productlist_list'),
                track_productlist_position: this.model.get('track_productlist_position'),
                track_productlist_category: this.model.get('track_productlist_category'),
                sku: this.model.get('_sku'),
                itemId: this.model.get('_id'),
                model: this.model
            };
        }
    });
});
