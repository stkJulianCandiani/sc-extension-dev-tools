define('SharedWishList.ProductList.ListDetails.View', [
    'ProductList.ListDetails.View',
    'SharedWishList.ShareList.Button.View',
    'sharedwishlist_product_list_list_details.tpl',
    'underscore',
    'Backbone.CompositeView'
], function sharedWishListProductListListDetailsView(
    productProductListListDetailsView,
    SharedWishListShareListButtonView,
    sharedWishListTemplate,
    _,
    BackboneCompositeView
) {
    'use strict';

    var prototype = productProductListListDetailsView.prototype;

    var initialize = _.wrap(prototype.initialize, function wrapInitialize(fn) {
        fn.apply(this, _.toArray(arguments).slice(1));

        BackboneCompositeView.add(this);
    });

    var childViews = _(prototype.childViews || {}).extend({
        'ProductListShare.Button': function ProductListShareButton() {
            return new SharedWishListShareListButtonView({ 'model': this.model, application: SC.Application('MyAccount') });
        }
    });

    return _(prototype).extend({

        initialize: initialize,

        childViews: childViews,

        template: sharedWishListTemplate
    });
});
