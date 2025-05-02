define('CS.GSPageTypes.Main', [
    'SidebarLeft.View',
    'Utils'
],
function CSGSPageTypesMain(
    SidebarLeftView,
    Utils
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');
            var environment = container.getComponent('Environment');

            pageType.registerPageType({
                name: 'GSSidebarLeft',
                view: SidebarLeftView,
                options: {
                    environment: environment
                },
                defaultTemplate: {
                    name: 'gs_sidebar_left.tpl',
                    displayName: 'GS Sidebar Left',
                    thumbnail: Utils.getAbsoluteUrl(getExtensionAssetsPath('img/smtLayout-2column_leftNarrow.svg'))
                }
            });
        }
    };
});
