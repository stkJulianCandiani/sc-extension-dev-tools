define('DownloadableItems', [
    'DownloadableItems.Router',
    'underscore'
], function DownloadableItems(
    Router,
    _
) {
    'use strict';

    return {
        Router: Router,
        addMyAccountMenuEntry: function (application) {
            var layout = application.getComponent('Layout');
            
            if(layout) {
                var myaccountmenu = application.getComponent("MyAccountMenu");
                if(myaccountmenu) {
                    var myDownloadEntry = {
                        id: "myDownloadsItem",
                        name: "My Downloads",
                        index: 20,
                        permissionoperator: "OR",
                        url: "downloadableitems"
                    }
                    myaccountmenu.addGroupEntry(myDownloadEntry);
                }
            }
        },
        mountToApp: function mountToApp(application) {
            this.addMyAccountMenuEntry(application);
            var userIsLoggedIn = SC.ENVIRONMENT.siteSettings.is_logged_in;
            if (userIsLoggedIn) {
                return new Router(application);
            }

            return false;
        }
    };
});
