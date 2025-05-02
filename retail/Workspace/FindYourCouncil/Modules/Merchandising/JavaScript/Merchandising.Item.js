define('Merchandising.Item', [
    'merchandising_item.tpl',

    'ProductViews.Price.View',
    'GlobalViews.StarRating.View',

    'Backbone.CompositeView',
    'Backbone'
], function MerchandisingItem(
    merchandisingItemTemplate,

    ItemViewsPriceView,
    GlobalViewsStarRatingView,

    BackboneCompositeView,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: merchandisingItemTemplate,

        initialize: function initialize() {
            Backbone.View.prototype.initialize.apply(this, arguments);
            BackboneCompositeView.add(this);
        },

        childViews: {
            'Item.Price': function ItemPrice() {
                return new ItemViewsPriceView({
                    model: this.model,
                    origin: 'RELATEDITEM'
                });
            }
        },

        getContext: function getContext() {
            return {
                showRating: SC.ENVIRONMENT.REVIEWS_CONFIG && SC.ENVIRONMENT.REVIEWS_CONFIG.enabled,
                itemURL: this.model.get('_url'),
                linkAttributes: this.model.getFullLink(),
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
