/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Collect.Newsletter.View', [
    'Newsletter.View',
    'Tracker',
    'underscore'
], function SalesforceCollectNewsletterView(
    NewsletterView,
    Tracker,
    _
) {
    'use strict';

    var viewPrototype = NewsletterView.prototype;

    _(viewPrototype).extend({
        // @method newsletterSubscribe Handles the submit of the form and its result
        // @param {jQuery.Event} e jQuery event
        // @return {Void}
        newsletterSubscribe: function newsletterSubscribe(e) {
            var self = this;
            var promise;
            var errorCode;
            e.preventDefault();
            promise = this.saveForm(e);
            if (promise) {
                promise
                    .fail(function afterSaveFormFailed(jqXhr) {
                        jqXhr.preventDefault = true;

                        errorCode =
                            jqXhr &&
                            jqXhr.responseJSON &&
                            jqXhr.responseJSON.errorCode &&
                            self.feedback[jqXhr.responseJSON.errorCode]
                                ? jqXhr.responseJSON.errorCode
                                : 'ERROR';

                        self.state.code = errorCode;
                        self.state.message = self.feedback[errorCode].message;
                        self.state.messageType = self.feedback[errorCode].type;
                    })
                    .done(function afterFormSaved() {
                        self.state.code = self.model.get('code');
                        self.state.message = self.feedback[self.model.get('code')].message;
                        self.state.messageType = self.feedback[self.model.get('code')].type;

                        Tracker.getInstance().trackEvent({
                            category: 'newsletter-signup',
                            action: 'click',
                            value: 1,
                            callback: _.noop(),
                            user: self.model
                        });
                        self.model.set('email', '');
                    })
                    .always(_.bind(self.render, self));
            }
        }
    });
});
