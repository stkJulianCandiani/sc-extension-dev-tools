define('GSCustomFooterPolicies.View', [
    'cs_gscustomfooter_policies.tpl',

    'SC.Configuration',
    'Backbone'
], function GSCustomFooterPoliciesView(
    template,

    Configuration,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: template,
        getContext: function getContext() {
            return {
                footerNavigationLinks: Configuration.get('footer.navigationLinks')
            };
        }
    });
});
