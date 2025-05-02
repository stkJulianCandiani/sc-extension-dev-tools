define('Newsletter.Sidebar', [
    'Newsletter.View.Site',
    'Newsletter.Model.Site'
], function NewsletterSidebar(
    NewsletterViewSite,
    NewsletterModelSite
) {
    'use strict';

    return {
        loadModule: function loadModule(application) {
            var layout = application.getComponent('Layout');

            layout.addChildView('Facets.FacetedNavigation', function addChildViewToFacetNavigation() {
                return new NewsletterViewSite({
                    model: new NewsletterModelSite(),
                    application: application,
                    isSidebar: true
                });
            });
        }
    };
});
