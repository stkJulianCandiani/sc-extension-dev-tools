define('GSNewsletter', [
    'Newsletter.PageType',
    'Newsletter.Lightbox',
    'Newsletter.Footer',
    'Newsletter.Sidebar'
], function GSNewsletter(
    NewsletterPageType,
    NewsletterLightbox,
    NewsletterFooter,
    NewsletterSidebar
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            NewsletterPageType.loadModule(container);
            NewsletterLightbox.loadModule(container);
            NewsletterFooter.loadModule(container);
            NewsletterSidebar.loadModule(container);
        }
    };
});
