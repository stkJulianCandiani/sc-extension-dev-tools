define('GSCustomHeader.SiteSearch', [
    'SiteSearch.View',
    'gs-site_search.tpl'
], function GSCustomHeaderSiteSearch(
    SiteSearchView,
    gsSiteSearchTemplate
) {
    'use strict';

    return {
        loadModule: function loadModule() {
            SiteSearchView.prototype.template = gsSiteSearchTemplate;
        }
    };
});
