define('Newsletter.PageType', [
    'Newsletter.Form.View'
], function NewsletterPageType(
    NewsletterFormView
) {
    'use strict';

    return {
        loadModule: function loadModule(container) {
            var pageType = container.getComponent('PageType');

            pageType.registerPageType({
                name: 'NewsletterForm',
                routes: ['newsletter-form'],
                view: NewsletterFormView,
                defaultTemplate: {
                    name: 'newsletter_form.tpl',
                    displayName: 'Newsletter'
                }
            });
        }
    };
});
