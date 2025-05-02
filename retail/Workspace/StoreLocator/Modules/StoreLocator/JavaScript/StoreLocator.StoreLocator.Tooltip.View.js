/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.StoreLocator.Tooltip.View', [
    'StoreLocator.Tooltip.View',
    'store_locator_tooltip_custom.tpl',
    'underscore'
], function StoreLocatorStoreLocatorTooltipView(
    StoreLocatorTooltipView,
    storeLocatorTooltipCustomTpl,
    _
) {
    'use strict';

    _.extend(StoreLocatorTooltipView.prototype, {
        template: storeLocatorTooltipCustomTpl,

        getContext: _.wrap(StoreLocatorTooltipView.prototype.getContext, function wrapGetContext(fn) {
            var result = fn.apply(this, _.toArray(arguments).slice(1));

            if (this.model.get('storetype')) {
                result.storetype = this.model.get('storetype').toLowerCase();
            }

            if (this.model.get('corporatewebsite')) {
                result.corporateWebsite = this.model.get('corporatewebsite');
            }

            if (this.model.get('shoppingwebsite')) {
                result.shoppingWebsite = this.model.get('shoppingwebsite');
            }

            if (this.model.get('phone')) {
                result.phone = this.model.get('phone');
            }

            result.longAddress = this.model.get('city') + ', ' + this.model.get('state') + ', ' + this.model.get('zip');

            return result;
        })
    });
});
