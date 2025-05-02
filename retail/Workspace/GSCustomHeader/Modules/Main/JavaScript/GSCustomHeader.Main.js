// @module CS.GSCustomHeader.Main
define('GSCustomHeader.Main', [
    'GSCustomHeader.Header',
    'GSCustomHeader.Menu',
    'GSCustomHeader.SiteSearch',
    'GSCustomHeader.MiniCart',
    'jQuery'
], function GSCustomHeaderMain(
    GSCustomHeaderHeader,
    GSCustomHeaderMenu,
    GSCustomHeaderSiteSearch,
    GSCustomHeaderMiniCart,
    jQuery
) {
    'use strict';


    return {
        mountToApp: function mountToApp(container) {
            GSCustomHeaderHeader.loadModule(container);
            GSCustomHeaderMenu.loadModule(container);
            GSCustomHeaderSiteSearch.loadModule(container);
            GSCustomHeaderMiniCart.loadModule(container);

            // This is a workaround to identify when the CMS is open
            // so users can see all DOM elements, there is a banner hidden for dekstop
            // but in order to configure it we need to see it when the CMS is open
            if (window.frameElement) {
                jQuery('body').addClass('ns_is-admin');
            }
        }
    };
});
