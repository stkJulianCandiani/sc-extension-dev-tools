define('Newsletter.Model.Site', [
    'Utils',
    'Backbone',
    'underscore'
], function NewsletterModelSite(
    Utils,
    Backbone,
    _
) {
    'use strict';

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return Backbone.Model.extend({
        // @property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl('services/Newsletter.Service.ss'),

        // @property {String} email The email of the subscriber
        email: '',

        age: 'F',

        // @property validation Backbone.Validation attribute used for validating the form before submit.
        validation: {
            email: [
                {
                    required: true,
                    msg: 'Enter an email address to subscribe'
                },
                {
                    pattern: 'email',
                    msg: 'Valid email address is required'
                }
            ],
            age: {
                fn: function validateAge(value) {
                    if (value !== 'T') {
                        return _('You must be 13 years old or older.').translate();
                    }
                    return null;
                }
            },
            firstname: {
                required: true,
                msg: _('First Name is required').translate()
            },
            lastname: {
                required: true,
                msg: _('Last Name is required').translate()
            },
            birth: {
                /* eslint-disable */
                fn: function (value) {
                    var age;

                    if (!value) {
                        return _('Date of Birth is required').translate();
                    }

                    age = getAge(value);

                    if (isNaN(age)) {
                        return _('Date of Birth is invalid').translate();
                    } else if (age < 13) {
                        return _('You must be 13 years old or older.').translate();
                    }
                }
                /* eslint-enable */
            }
        }
    });
});
