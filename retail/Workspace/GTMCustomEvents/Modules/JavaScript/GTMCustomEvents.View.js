define('GTMCustomEvents.View', ['CreditCard.Edit.Form.View', 'Loggers'], function (CreditCardEditFormView, Loggers) {
    'use strict';

    _.extend(CreditCardEditFormView.prototype, {
        initialize: _.wrap(CreditCardEditFormView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));

            this.on('CerditCartSaved', this.saveEventCerditCartSaved);
        }),
        saveForm: function saveForm() {
            var loggers = Loggers.getLogger();
            var actionId = loggers.start('Save Credit Card');

            var promise = BackboneFormView.saveForm.apply(this, arguments);

            if (promise) {
                promise.done(function () {
                    CreditCardEditFormView.trigger('CerditCartSaved');
                    loggers.end(actionId, {
                        operationIds: this.model.getOperationIds(),
                        status: 'success',
                    });
                });
            }

            return promise;
        },
        saveEventCerditCartSaved: function () {
            this.model.set('saveEventCerditCartSaved', true);
        },
    });
});
