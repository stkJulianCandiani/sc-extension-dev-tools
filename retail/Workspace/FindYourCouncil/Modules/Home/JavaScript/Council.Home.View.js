define('Council.Home.View', [
    'FindYourCouncil.View',
    'Home.View',
    'underscore'
], function CouncilHomeView(
    FindYourCouncilView,
    HomeView,
    _
) {
    'use strict';

    _.extend(HomeView.prototype, {
        childViews: _.extend({}, HomeView.prototype.childViews, {
            'FindYourCouncil.View': function FindYourCouncil() {
                return new FindYourCouncilView({
                    application: this.options.application
                });
            }
        })
    });
});
