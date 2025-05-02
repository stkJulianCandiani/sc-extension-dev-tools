define('Newsletter.Site.Model', [
    'Newsletter.Model',
    'Configuration',
    'Models.Init',
    'Application',
    'underscore',
], function NewsletterSiteModel(NewsletterModel, Configuration, ModelsInit, Application, _) {
    'use strict';

    return _.extend(NewsletterModel, {
        subscribe: function subscribe(email, firstName, lastName, birthDate, zipcode) {
            var searchFilter;
            var customers;
            var records;
            var result;
            // nlapiLogExecution('ERROR', 'newsletter', email);
            this.validate({
                email: email,
            });
            searchFilter = new nlobjSearchFilter('email', null, 'is', email);

            customers = nlapiSearchRecord(
                'customer',
                null,
                [searchFilter],
                [
                    new nlobjSearchColumn('globalsubscriptionstatus'),
                    new nlobjSearchColumn('category'),
                    new nlobjSearchColumn('firstname'),
                    new nlobjSearchColumn('lastname'),
                    new nlobjSearchColumn('custentity_date_birth'),
                    new nlobjSearchColumn('custentity_zip_code_newsletter'),
                ]
            );

            records = _.groupBy(customers, function groupCustomers(customer) {
                return customer.getRecordType();
            });
            // If there's NOT any customer or lead with this email, we set up a lead with globalsubscriptionstatus = 1
            if (!records.customer && !records.lead) {
                // nlapiLogExecution('ERROR', 'create');
                result = this.createSubscription(email, firstName, lastName, birthDate, zipcode);
            } else {
                // nlapiLogExecution('ERROR', 'update');
                result = records.customer
                    ? this.updateSubscription(
                          records.customer,
                          firstName,
                          lastName,
                          birthDate,
                          zipcode,
                          false
                      )
                    : this.updateSubscription(
                          records.lead,
                          firstName,
                          lastName,
                          birthDate,
                          zipcode,
                          true
                      );
            }
            return result;
        },
        updateSubscription: function updateSubscription(
            subscribers,
            pfirstName,
            plastName,
            birthDate,
            zipcode,
            isLead
        ) {
            var subscribersData = _.map(subscribers, function mapSubscribers(subscriber) {
                return {
                    id: subscriber.getId(),
                    status: subscriber.getValue('globalsubscriptionstatus'),
                    firstname: subscriber.getValue('firstname'),
                    lastname: subscriber.getValue('lastname'),
                    birthDate: subscriber.getValue('custentity_date_birth'),
                    zipcode: subscriber.getValue('custentity_zip_code_newsletter'),
                };
            });

            var customersToSubscribe;
            // We count the subscribers by its statuses
            var subscribersCount = _.countBy(
                subscribersData,
                function countSubscribers(subscriber) {
                    return subscriber.status;
                }
            );

            // Set up the quantity of the subscribers statuses. If it is NaN, is converted to number zero.
            subscribersCount['1'] = subscribersCount['1'] || 0;
            subscribersCount['2'] = subscribersCount['2'] || 0;
            subscribersCount['3'] = subscribersCount['3'] || 0;
            subscribersCount['4'] = subscribersCount['4'] || 0;
            // nlapiLogExecution('ERROR', 'subscribersCount', JSON.stringify(subscribersCount));
            // nlapiLogExecution('ERROR', 'subscribers.length', JSON.stringify(subscribers.length));
            // nlapiLogExecution('ERROR', 'sum', JSON.stringify(subscribersCount['1'] + subscribersCount['3'] + subscribersCount['4']));
            // If every customer is in 'Confirmed Opt-Out' status ('4'), we cannot subscribe them.
            if (subscribersCount['4'] === subscribers.length) {
                throw this.buildErrorAnswer('ERR_USER_STATUS_DISABLED');
            } else if (
                subscribersCount['1'] + subscribersCount['3'] + subscribersCount['4'] ===
                subscribers.length
            ) {
                // If everyone is among 'Soft Opt-In' ('1'), 'Confirmed Opt-In' ('3') or 'Confirmed Opt-Out' ('4'),
                // we cannot subscribe them, and we answer with an 'already subscribed' message.
                _.each(subscribersData, function eachSubscriber(subscriber) {
                    var firstName = pfirstName || subscriber.firstname || 'Guest';
                    var lastName = plastName || subscriber.lastname || 'Customer';
                    // eslint-disable-next-line
                    birthDate = birthDate || subscriber.birthDate;
                    // eslint-disable-next-line
                    zipcode = zipcode || subscriber.zipcode;

                    if (isLead) {
                        nlapiSubmitField(
                            'customer',
                            subscriber.id,
                            ['firstname', 'category'],
                            [firstName, 2],
                            false
                        );
                    } else {
                        nlapiSubmitField(
                            'customer',
                            subscriber.id,
                            ['firstname'],
                            [firstName],
                            false
                        );
                    }
                    nlapiSubmitField('customer', subscriber.id, 'lastname', lastName, false);
                    nlapiSubmitField(
                        'customer',
                        subscriber.id,
                        'custentity_date_birth',
                        birthDate,
                        false
                    );
                    nlapiSubmitField(
                        'customer',
                        subscriber.id,
                        'custentity_zip_code_newsletter',
                        zipcode,
                        false
                    );
                });
                return this.subscriptionDone;
            } else if (subscribersCount['2']) {
                // If some subscribers are in 'Soft Opt-Out' change every customer with status 'Soft Opt-Out' (2) to 'Soft Opt-In' (1)
                // Get the customers able to be subscribed
                customersToSubscribe = _.filter(
                    subscribersData,
                    function filterSubscribers(subscriber) {
                        return subscriber.status === 2;
                    }
                );

                // Updating all subscribers to 'Soft Opt-In' status.
                // Potentially demanding operation on large amount
                // of subscribers; documentation points using nlapiSubmitField
                // as the cheaper way to update lines.
                _.each(customersToSubscribe, function eachCustomer(subscriber) {
                    var firstName = pfirstName || subscriber.firstname || 'Guest';
                    var lastName = plastName || subscriber.lastname || 'Customer';
                    // eslint-disable-next-line
                    birthDate = birthDate || subscriber.birthDate;
                    // eslint-disable-next-line
                    zipcode = zipcode || subscriber.zipcode;

                    nlapiSubmitField(
                        'customer',
                        subscriber.id,
                        'globalsubscriptionstatus',
                        1,
                        false
                    );
                    nlapiSubmitField('customer', subscriber.id, 'firstname', firstName, false);
                    if (isLead) {
                        nlapiSubmitField('customer', subscriber.id, 'category', 2, false);
                    }
                    nlapiSubmitField('customer', subscriber.id, 'lastname', lastName, false);
                    nlapiSubmitField(
                        'customer',
                        subscriber.id,
                        'custentity_date_birth',
                        birthDate,
                        false
                    );
                    nlapiSubmitField(
                        'customer',
                        subscriber.id,
                        'custentity_zip_code_newsletter',
                        zipcode,
                        false
                    );
                });
                return this.subscriptionDone;
            } else {
                throw this.buildErrorAnswer('ERROR');
            }
        },
        createSubscription: function createSubscription(email, firstName, lastName, birthDate) {
            var record = nlapiCreateRecord('lead');
            record.setFieldValue('entityid', email);
            record.setFieldValue('firstname', firstName);
            record.setFieldValue('lastname', lastName);
            record.setFieldValue('email', email);
            record.setFieldValue('category', 2);
            record.setFieldValue('custentity_date_birth', birthDate);
            record.setFieldValue('subsidiary', ModelsInit.session.getShopperSubsidiary());
            record.setFieldValue('companyname', Configuration.get('newsletter.companyName'));
            record.setFieldValue('globalsubscriptionstatus', 1);
            nlapiSubmitRecord(record, false, true);
            return this.subscriptionDone;
        },
    });
});
