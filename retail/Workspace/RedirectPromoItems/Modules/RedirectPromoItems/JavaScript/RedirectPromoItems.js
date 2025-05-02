srcRequire=require
define('RedirectPromoItems', [
    'Backbone',
    'jQuery'
], function RedirectPromoItems(
    Backbone,
    jQuery
) {
    'use strict';

    return  {
        mountToApp: function mountToApp (container) {
            var pdp = container.getComponent('PDP');
            var itemInfo;
            var item;
            var redirectUrl;
            var isFullUrl;
            var promise;
            if(pdp) {
                // This code will redirect the item if redirect url is present on the item
                pdp.on('beforeShowContent', function redirectBeforeShowContent() {
                    itemInfo = pdp.getItemInfo();
                    item = itemInfo ? itemInfo.item : null;
                    redirectUrl = item ? item.custitem_redirect_url : null;
                    isFullUrl = redirectUrl && redirectUrl.indexOf('http') !== -1;
                    promise = jQuery.Deferred();
                    if (isFullUrl) {
                        window.location.href = redirectUrl;
                        return promise.reject();
                    } else if (redirectUrl) {
                        Backbone.history.navigate(redirectUrl, _.extend({
                            trigger: true
                        }));
                        return promise.reject();
                    }
                })
            }
        }
    };
});
