
define('CS.HideProducts.Main', [
    'HideProducts.MasterFacet.Helper'
], function CSHideProductsMain(
    HideProductsMasterFacetsHelper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            HideProductsMasterFacetsHelper.initializeMasterFacet(container);
        }
    };
});
