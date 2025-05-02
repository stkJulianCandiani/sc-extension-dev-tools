define('Newsletter.Lightbox.View', [
    'SC.Configuration',
    'Newsletter.View.Site',
    'newsletter_lightbox.tpl',
    'Session',
    'underscore',
    'Backbone'
], function NewsletterLightboxView(
    Configuration,
    NewsletterView,
    newsletterLightboxTpl,
    Session,
    _,
    Backbone
) {
    'use strict';

    return NewsletterView.extend({
        template: newsletterLightboxTpl,
        modalClass: 'modal-dialog-lg no-padding no-header',
        attributes: {
            'id': 'newsletter-lightbox-view',
            'class': 'view newsletter-lightbox-view'
        },
        newsletterSubscribe: function newsletterSubscribe(e) {
            var self = this;
            var promise;
            var errorCode;

            e.preventDefault();

            promise = this.saveForm(e);

            if (promise) {
                promise.fail(function afterSaveFormFailed(jqXhr) {
                    jqXhr.preventDefault = true;

                    if (jqXhr && jqXhr.responseJSON) {
                        errorCode = jqXhr.responseJSON.errorCode && (self.feedback[jqXhr.responseJSON.errorCode] ? jqXhr.responseJSON.errorCode : 'ERROR');
                    }

                    self.state.code = errorCode;
                    self.state.message = self.feedback[errorCode].message;
                    self.state.messageType = self.feedback[errorCode].type;
                }).done(function afterSavedForm() {
                    self.state.code = self.model.get('code');
                    self.state.message = self.feedback[self.model.get('code')].message;
                    self.state.messageType = self.feedback[self.model.get('code')].type;

                    // Backbone.history.navigate('newsletter-form', { trigger: true, replace: true });

                    // self.model.set('email', '');
                    // self.model.set('age', 'F');
                }).always(_.bind(self.render, self));
            }

            return promise;
        },
        destroy: function destroy() {
            var homeTouchpoint;
            Backbone.View.prototype.destroy.apply(this, arguments);
            if (this.model.get('email')) {
                if (this.options.application.name !== 'Shopping') {
                    homeTouchpoint = Session.get('touchpoints').home;
                    window.location.href = homeTouchpoint + '#newsletter-form?email=' + encodeURIComponent(this.model.get('email'));
                    return;
                }
                Backbone.history.navigate('#newsletter-form?email=' + encodeURIComponent(this.model.get('email')), {
                    trigger: true
                });
            }
        },
        getContext: function getContext() {
            var config = Configuration.newsletter;
            var image = config.lightboxImage || 'site/img/newsletter-lightbox.jpg';

            return {
                isFeedback: !!this.state.code,
                model: this.model,
                image: image,
                title: config.lightboxTitle || '',
                description: config.lightboxDescription || '',
                disclaimer: config.lightboxDisclaimer || ''
            };
        }
    });
});
