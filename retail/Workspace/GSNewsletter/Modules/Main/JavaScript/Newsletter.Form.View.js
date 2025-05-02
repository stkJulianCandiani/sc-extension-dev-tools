define('Newsletter.Form.View', [
    'SC.Configuration',
    'ReCaptcha',
    'newsletter_form.tpl',
    'Newsletter.View',
    'Newsletter.Model.Site',
    'Backbone.CompositeView',
    'Backbone.FormView',
    'jQuery',
    'Tracker',
    'underscore'
], function NewsletterFormView(
    Configuration,
    Recaptcha,
    newsletterFormTpl,
    NewsletterView,
    NewsletterModelSite,
    BackboneCompositeView,
    BackboneFormView,
    jQuery,
    Tracker,
    _
) {
    'use strict';

    return NewsletterView.extend({
        template: newsletterFormTpl,
        initialize: function initialize(options) {
            var self = this;
            this.model = new NewsletterModelSite();
            this.state = {
                code: '',
                message: '',
                messageType: ''
            };

            this.application = options.application;

            this.recaptcha = new Recaptcha({
                configKey: 'n'
            });
            this.options.application.getLayout().once('afterAppendView', function afterAppendToDom() {
                self.setRecaptchaInForm();
            });

            this.email = options.email || null;

            if (this.email) {
                this.model.set('email', this.email);
            }

            BackboneCompositeView.add(this);
            BackboneFormView.add(this, options);

            this.model.on('saveCompleted', function saveCompleted() {
                Tracker.getInstance().trackEvent({
                    category: 'newsletter-signup',
                    action: 'click',
                    value: 1,
                    callback: _.noop(),
                    user: self.model
                });
                self.clearValues();
                self.state.code = 'OK';
                self.state.message = _('Thank you! Welcome to our newsletter').translate();
                self.state.messageType = 'success';
                self.render();
                self.setRecaptchaInForm();
            });
        },

        setRecaptchaInForm: function setRecaptchaInForm() {
            var $placeholder = this.$el ? this.$el.find('.newslleter-page-email-profile-recaptcha') : null;
            if ($placeholder) {
                this.recaptcha.attachTo($placeholder[0]);
            }
        },

        clearValues: function clearValues() {
            this.model.set('firstname', '');
            this.model.set('lastname', '');
            this.model.set('email', '');
            this.model.set('zipcode', '');
            this.model.set('birth', '');
        },

        bindings: {
            '[name="firstname"]': 'firstname',
            '[name="lastname"]': 'lastname',
            '[name="email"]': 'email',
            '[name="birth"]': 'birth'
        },

        events: {
            'submit form': 'submitForm'
        },

        validateCaptcha: function validateCaptcha() {
            var promise = jQuery.Deferred();
            this.recaptcha.validate(function onSuccess() {
                promise.resolve();
            }, function onError(e) {
                console.log(e);
                promise.reject(e);
            });
            return promise;
        },

        submitForm: function submitForm(e, model, props) {
            var self = this;
            e.preventDefault();
            return this.validateCaptcha().then(function then() {
                return self.saveForm(e, model, props);
            });
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return [{
                href: '#',
                text: _('Email Sign Up').translate()
            }];
        },
        getContext: function getContext() {
            var config = Configuration.newsletter;
            return {
                isFeedback: !!this.state.code,
                model: this.model,
                disclaimer: config ? config.lightboxDisclaimer : '',
                terms: config ? config.termsMessage : ''
            };
        }
    });
});
