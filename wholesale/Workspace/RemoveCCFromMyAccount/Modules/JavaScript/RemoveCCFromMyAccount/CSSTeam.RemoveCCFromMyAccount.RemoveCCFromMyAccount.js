define('CSSTeam.RemoveCCFromMyAccount.RemoveCCFromMyAccount', ['MyAccountMenu', 'Backbone'], function (
    MyAccountMenu,
    Backbone
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
            try {
                var myaccountView = safeRequire('SC.MyAccount.Layout');
                _.extend(myaccountView.MyAccountLayout.prototype, {

                    initialize: _.wrap(myaccountView.MyAccountLayout.prototype.initialize, function initialize(fn, e) {
                        fn.apply(this, _.toArray(arguments).slice(1));
                        this.on('afterViewRender', function () {
                            var current_fragment = Backbone.history.getFragment();
                            if (current_fragment && current_fragment.indexOf('creditcards') !== -1) {
                                console.warn('Blocked access to paymentmethods. Redirecting...');
                                Backbone.history.navigate('home', { trigger: true });
                            }
                        });
                    }),
                });
            } catch (err) {
                console.log('Error removing the credit card section. Error: ', err);
            }

        },
    };

    function safeRequire(moduleName) {
        try {
            return require(moduleName);
        } catch (error) {
            return null;
        }
    }
});
