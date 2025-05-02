/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.Footer', [
    'StoreLocator.Footer.View',
    'StoreLocator.Footer.Model',
    'underscore',
    'js.cookie'
], function StoreLocatorFooter(
    StoreLocatorFooterView,
    StoreLocatorFooterModel,
    _,
    Cookies
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            if (layout) {
                layout.addChildView('cms:footer_bottom', function footerStoreLocator() {
                    var modelData = {};
                    var model = new StoreLocatorFooterModel();
                    var view = new StoreLocatorFooterView({ application: container, model: model });

                    if (Cookies.get('location')) {
                        modelData = JSON.parse(Cookies.get('location'));
                        model.set('address1', modelData.address1);
                        model.set('city', modelData.city);
                        model.set('state', modelData.state);
                        model.set('zip', modelData.zip);
                        view.render();
                    }

                    return view;
                });
            }
        }
    };
});
