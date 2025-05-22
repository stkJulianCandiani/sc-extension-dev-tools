define('Newsletter.ServiceController.Site', [
    'Newsletter.ServiceController',
    'Newsletter.Model',
    'ReCaptcha.Configuration.Model',
    'ReCaptcha.Adapter',
    'underscore',
], function NewsletterServiceControllerSite(NewsletterServiceController, NewsletterModel, Configuration, Adapter, _) {
    'use strict';

    return _.extend(NewsletterServiceController, {
        post: function NewsletterPost() {
            var config = Configuration.get();
            var configValue = config.n;
            var data = this.data || {};
            var result;
            // if (config.enabled && configValue) {
            //     result = Adapter.validate('newsletter', data['g-recaptcha-response']);
            //     if (!result.success) {
            //         throw result;
            //     }
            // }
            return NewsletterModel.subscribe(
                this.data.email,
                this.data.firstname,
                this.data.lastname,
                this.data.birth,
                this.data.zipcode
            );
        },
    });
});
