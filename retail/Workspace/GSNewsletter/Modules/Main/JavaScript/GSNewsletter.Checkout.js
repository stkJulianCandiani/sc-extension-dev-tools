define('GSNewsletter.Checkout', [
    'Newsletter.Footer',
    'Newsletter.Lightbox'
], function GSNewsletterCheckout(
    NewsletterFooter,
    NewsletterLightbox
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            NewsletterFooter.loadModule(container);
            NewsletterLightbox.loadModule(container);
        }
    };
});
