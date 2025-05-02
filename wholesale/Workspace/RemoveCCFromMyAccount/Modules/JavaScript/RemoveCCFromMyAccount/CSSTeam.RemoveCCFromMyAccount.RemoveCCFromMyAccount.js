define('CSSTeam.RemoveCCFromMyAccount.RemoveCCFromMyAccount', ['MyAccountMenu'], function (
    MyAccountMenu
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            try {
                var menu = MyAccountMenu.getInstance();
                menu.removeSubEntry('paymentmethods');
            } catch (err) {
                console.log('Error removing the credit card section. Error: ', err);
            }
        },
    };
});
