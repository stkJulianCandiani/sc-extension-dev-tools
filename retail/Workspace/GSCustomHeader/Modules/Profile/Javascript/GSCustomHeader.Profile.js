define('GSCustomHeader.Profile', [
    'Header.Profile.View',
    'gs_header_profile.tpl'
], function GSCustomHeaderProfile(
    HeaderProfileView,
    headeProfileTemplate
) {
    'use strict';


    return {
        loadModule: function loadModule() {
            HeaderProfileView.prototype.template = headeProfileTemplate;
        }
    };
});
