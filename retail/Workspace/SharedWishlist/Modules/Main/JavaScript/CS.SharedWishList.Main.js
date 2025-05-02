define('CS.SharedWishList.Main', [
    'SharedWishList.ProductList.ListDetails.View',
    'SharedWishList.ShareList.Button.View',
    'SharedWishList.ShareList.View'
], function SharedWishListMain(
    View,
    ButtonView,
    ListShareView
) {
    'use strict';

    return {
        View: View,
        ButtonView: ButtonView,
        ListShareView: ListShareView
    };
});
