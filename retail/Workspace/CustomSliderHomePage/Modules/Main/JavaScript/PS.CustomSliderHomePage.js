define('PS.CustomSliderHomePage', [
    'CustomSliderHomePage'
], function PSCustomSliderHomePage(
    CustomSliderHomePage
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            CustomSliderHomePage.loadModule(application);
        }
    };
});
