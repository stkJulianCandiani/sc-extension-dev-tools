define('GSCustomFooterSocial.View', [
    'cs_gscustomfooter_social.tpl',

    'SC.Configuration',
    'Backbone'
], function GSCustomFooterSocialView(
    template,

    Configuration,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: template
    });
});
