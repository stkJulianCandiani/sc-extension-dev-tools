/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.StoreLocator.Main.View', [
    'StoreLocator.Main.View',
    'store_locator_main_custom.tpl',
    'UrlHelper',
    'underscore'
], function StoreLocatorStoreLocatorMainView(
    StoreLocatorMainView,
    storeLocatorMainCustomTpl,
    UrlHelper,
    _
) {
    'use strict';

    _.extend(StoreLocatorMainView.prototype, {
        template: storeLocatorMainCustomTpl,

        initialize: _.wrap(StoreLocatorMainView.prototype.initialize, function wrapInitialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.zipCode = UrlHelper.getParameterValue('zipCode');
        }),

        render: function render() {
            var self = this;

            this.application.getLayout().on('afterAppendView', function afterAppendView(view) {
                if (view === self) {
                    view.$('#autocomplete').val(self.zipCode);
                }
            });

            this._render();
        }
    });
});
