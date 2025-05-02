define('Newsletter.Footer', [
    'Newsletter.View.Site',
    'Newsletter.Model.Site',
    'Footer.View'
], function NewsletterFooter(
    NewsletterViewSite,
    NewsletterModelSite,
    FooterView
) {
    'use strict';

    return {
        loadModule: function loadModule(application) {
            if (FooterView.addExtraChildrenViews) {
                FooterView.addExtraChildrenViews({
                    'FooterContent': function wrapperFunction() {
                        return function addNewsletterView() {
                            return new NewsletterViewSite({
                                model: new NewsletterModelSite(),
                                application: application
                            });
                        };
                    }
                });
            }
        }
    };
});
