define('GSCustomHeader.MiniCart', [
    'Header.MiniCart.View',
    'header_mini_cart.tpl'
], function GSCustomHeaderMiniCart(
    HeaderMiniCartView,
    headeMiniCartTemplate
) {
    'use strict';


    return {
        loadModule: function loadModule() {
            HeaderMiniCartView.prototype.template = headeMiniCartTemplate;
        }
    };
});