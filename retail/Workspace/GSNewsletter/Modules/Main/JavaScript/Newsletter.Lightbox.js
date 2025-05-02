define('Newsletter.Lightbox', [
    'SC.Configuration',
    'Newsletter.Model.Site',
    'Newsletter.Lightbox.View',
    'Utils',
    'underscore',
    'js.cookie'
], function NewsletterLightbox(
    Configuration,
    NewsletterModelSite,
    NewsletterLightboxView,
    Utils,
    _,
    Cookies
) {
    'use strict';

    var clearTime = function clearTime(time) {
        return clearTimeout(time);
    };

    var openNewsletterModal = function openNewsletterModal(application, e) {
        var view = new NewsletterLightboxView({
            model: new NewsletterModelSite(),
            application: application
        });
        e.preventDefault();
        view.showInModal();
    };

    return {
        loadModule: function loadModule(application) {
            var layoutComponent = application.getComponent('Layout');
            var domain = '.' + Utils.getWindow().location.hostname;
            var time;
            var config = Configuration.newsletter;
            var delay = 60000;

            if (config.lightboxTime) {
                delay = config.lightboxTime * 1000;
            }

            if (application.name === 'Shopping') {
               // jQuery.cookie.json = false;
                layoutComponent.on('afterShowContent', function afterShowContent(viewName) {
                    var viewLightBox;
                    if (!SC.isPageGenerator() && config.showLightbox === true) {
                        if (viewName !== 'newsletter-lightbox-view') {
                            viewLightBox = new NewsletterLightboxView({
                                model: new NewsletterModelSite(),
                                application: application
                            });

                            time = setTimeout(function afterTimeout() {
                                if (!Cookies.get('newsletterLightboxDisplayed')) {
                                    Cookies.set('newsletterLightboxDisplayed', 'true', {
                                        expires: 365,
                                        domain: domain,
                                        path: '/'
                                    });

                                    clearTime(time);
                                    viewLightBox.showInModal();
                                }
                            }, delay);
                        }
                    }
                });
            }

            layoutComponent.addToViewEventsDefinition(
                'Header.View',
                'click [data-action="showNewsletterModal"]',
                _.bind(openNewsletterModal, this, application)
            );
        }
    };
});
