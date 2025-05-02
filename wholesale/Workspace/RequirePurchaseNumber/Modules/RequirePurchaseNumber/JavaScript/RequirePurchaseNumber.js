define('RequirePurchaseNumber', [
    'OrderWizard.Module.PaymentMethod.PurchaseNumber',
    'GlobalViews.Message.View',
    'underscore',
    'jQuery'
], function RequirePurchaseNumber(
    OrderWizardModulePaymentMethodPurchaseNumber,
    GlobalViewsMessageView,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');

            if (layout) {
                layout.on('afterShowContent', function() {
                    _.defer(function() {
                        jQuery('.order-wizard-paymentmethod-purchasenumber-module-purchase-order-optional').html('*');
                    });
                });
            }

            OrderWizardModulePaymentMethodPurchaseNumber.prototype.submit = function submit() {
                var purchase_order_number = this.$('[name=purchase-order-number]').val() || '';
                this.$('.order-wizard-paymentmethod-purchasenumber-module-row .global-views-message').remove();

                if(purchase_order_number == '' || purchase_order_number == null) {
                    var placeholder = this.$('.order-wizard-paymentmethod-purchasenumber-module-row');
                    var globalViewMessage = new GlobalViewsMessageView({
                        message: 'Purchase Order Number is required.',
                        type: 'error',
                        closable: false
                    });

                    placeholder.append(globalViewMessage.render().$el.html());

                    return jQuery.Deferred().reject('Purchase Order Number is required.');
                }

                this.wizard.model.set('purchasenumber', purchase_order_number);

                return jQuery.Deferred().resolve();
            };
        }
    };
});
