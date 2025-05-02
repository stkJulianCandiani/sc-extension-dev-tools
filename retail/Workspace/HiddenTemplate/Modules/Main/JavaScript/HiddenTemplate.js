define('HiddenTemplate', ['facets_faceted_navigation_hidden.tpl'], function HiddenTemplate() {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            return false;
        }
    };
});
