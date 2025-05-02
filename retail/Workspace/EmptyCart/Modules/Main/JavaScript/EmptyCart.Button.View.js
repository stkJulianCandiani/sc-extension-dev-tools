define('EmptyCart.Button.View', [
    'emptycart_button.tpl',
    'Backbone'
], function EmptyCartButtonView(
    emptyCartButtonTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: emptyCartButtonTpl
    });
});
