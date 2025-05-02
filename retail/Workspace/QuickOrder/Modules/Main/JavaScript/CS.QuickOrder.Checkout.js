/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.Checkout', [
    'jQuery'
], function CSQuickOrderCheckout(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            layout.addToViewContextDefinition('QuickOrderAccessPoints.HeaderLink.View', 'cartTouchPoint', 'string', function(context) {
                return 'home';
            });
            layout.on('afterShowContent', function afterShowContent() {
                jQuery('a.quickorder-accesspoints-headerlink-link').attr('data-hashtag', '#quickorder');
            });
        }
    };
});
