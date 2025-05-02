define('CS.EmptyCart.Main', [
    'EmptyCart.Button.View'
], function CSEmptyCartMain(
    EmptyCartButtonView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            if (layout) {
                layout.addChildView('Item.ListNavigable', function addChildView() {
                    return new EmptyCartButtonView({ container: container });
                });
            }
        }
    };
});
