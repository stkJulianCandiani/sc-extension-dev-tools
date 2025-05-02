define('FutureShipDate.View', [
    'Wizard.Module',
    'futureshipdate.tpl',
    'Utils'
], function FutureShipDateView(
    WizardModule,
    template,
    Utils
) {
    'use strict';

    return WizardModule.extend({
        template: template,

        initialize: function initialize() {
            var self = this;
            WizardModule.prototype.initialize.apply(this, arguments);

            this.on('afterViewRender', function afterViewRender() {
                var $input = self.$('[data-type="date"]');

                $input.datepicker({
                    format: $input.data('format'),
                    startDate: $input.data('start-date'),
                    endDate: $input.data('end-date'),
                    autoclose: true,
                    todayHighlight: $input.data('todayhighlight')
                });
            });
        },

        getContext: function getContext() {
            var startDate = new Date();
            startDate.setDate(startDate.getDate() + 3);
            var dateArr = Utils.dateToString(startDate).split('-');
            var finalDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

            return {
                isReview: this.step.step_url == 'review',
                startDate: finalDate
            };
        }
    });
});
