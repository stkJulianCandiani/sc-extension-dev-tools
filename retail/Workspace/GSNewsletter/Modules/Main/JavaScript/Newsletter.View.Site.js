define('Newsletter.View.Site', [
    'Backbone.FormView',
    'Backbone.CompositeView',
    'GlobalViews.Message.View',

    'newsletter.tpl',
    'newsletter_sidebar.tpl',

    'Session',
    'Backbone',
    'underscore',
    'jQuery',
    'Utils',
], function NewsletterViewSite(
    BackboneFormView,
    BackboneCompositeView,
    GlobalViewsMessageView,

    newsletterTpl,
    newsletterSidebarTpl,

    Session,
    Backbone,
    _
) {
    // @class Newsletter.View @extend Backbone.View
    return Backbone.View.extend({
        // @property {Function} template
        template: newsletterTpl,

        // @property {Object} events
        events: {
            'submit [data-action="newsletter-subscribe"]': 'newsletterSubscribe',
        },

        // @property {Object} bindings Binds email input field with model namesake property
        bindings: {
            '[name="email"]': {
                observe: 'email',
                setOptions: {
                    validate: true,
                    silent: true,
                },
                events: ['blur', 'keyup'],
            },
            '[name="age"]': {
                observe: 'age',
                setOptions: {
                    silent: true,
                    validate: true,
                },
                events: ['blur', 'change'],
            },
        },

        // @property {Object} feedback Keeps the text and kind of message we need to show as feedback
        feedback: {
            OK: {
                type: 'success',
                message: _('Thanks for joining our list!').translate(),
            },
            ERR_USER_STATUS_ALREADY_SUBSCRIBED: {
                type: 'warning',
                message: _('Sorry, the specified email is already subscribed.').translate(),
            },
            ERR_USER_STATUS_DISABLED: {
                type: 'error',
                message: _('Sorry, the specified email cannot be subscribed.').translate(),
            },
            ERROR: {
                type: 'error',
                message: _('Sorry, subscription cannot be done. Try again later.').translate(),
            },
        },

        // @method initialize Defines this view as composite, initializes the 'state' object, and makes the form view available.
        // @param {Newsletter.View.initialize.Options} options
        // @return {Void}
        initialize: function initialize(options) {
            // @property {Newsletter.View.State} state
            this.state = {
                code: '',
                message: '',
                messageType: '',
            };

            if (this.options.isSidebar) {
                this.template = newsletterSidebarTpl;
            }

            this.application = options.application;
            BackboneCompositeView.add(this);
            BackboneFormView.add(this);
        },

        // @method newsletterSubscribe Handles the submit of the form and its result
        // @param {jQuery.Event} e jQuery event
        // @return {Void}
        newsletterSubscribe: function newsletterSubscribe() {
            var homeTouchpoint;

            if (this.options.application.name !== 'Shopping') {
                homeTouchpoint = Session.get('touchpoints').home;
                window.location.href = homeTouchpoint + '#newsletter-form';
                return;
            }
            Backbone.history.navigate('#newsletter-form', {
                trigger: true,
            });
        },

        // @propery {Object} childViews
        childViews: {
            GlobalMessageFeedback: function GlobalMessageFeedback() {
                return new GlobalViewsMessageView({
                    message: this.state.message,
                    type: this.state.messageType,
                    closable: true,
                });
            },
        },

        // @method getContext
        // @return {Newsletter.View.Context}
        getContext: function getContext() {
            // @class Newsletter.View.Context
            return {
                // @property {Boolean} isFeedback
                isFeedback: !!this.state.code,
                // @property {Newsletter.Model} model
                model: this.model,
            };
        },
    });
});
