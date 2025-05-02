define('StateRetailDeliveryFee.Checkout.EntryPoint', [
	'OrderWizard.Module.CartSummary',
	'LiveOrder.Model',
	'underscore',
	'jQuery',
	'Utils',
	'SC.Configuration',
	'StateRetailDeliveryFee.Helper'
], function StateRetailDeliveryFeeCheckoutEntryPoint(
	OrderWizardModuleCartSummary,
	LiveOrderModel,
	_,
	jQuery,
	Utils,
	Configuration,
	Helper
) {
	'use strict';

	_.extend(OrderWizardModuleCartSummary.prototype, {
		getContext: _.wrap(OrderWizardModuleCartSummary.prototype.getContext, function wrapGetContext(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));
			// todo: Agregar logica para cambiar summary dependiendo si hay tax o no
			var model = this._getModel();
			var lines = model && model.get('lines');
			var summary = model && model.get('summary') || {};
			var taxTotal = summary && summary.taxtotal;
			var taxFeeInformation = JSON.parse(Helper.taxFeeinformation(lines));
			var itemCount = context.itemCount;
			var feeApplied;
			var feeValue;
			var summaryMessage;
			if (!jQuery.isEmptyObject(taxFeeInformation)) {
				feeApplied = taxFeeInformation.feeApplied;
				feeValue = taxFeeInformation.value;
				summaryMessage = taxFeeInformation.msg;
			}
			if (feeApplied && taxTotal && taxTotal > 0) {
				summary.taxtotal_formatted = Utils.formatCurrency(taxTotal - parseFloat(feeValue));
				context.itemCount = itemCount - 1;
				if (context.itemCount === 1) {
					context.itemCountGreaterThan1 = false;
				}
				context.feeApplied = true;
				context.feeValue = feeValue;
				context.summaryMessage = summaryMessage;
			} else {
				summary.taxtotal_formatted = Utils.formatCurrency(taxTotal);
				context.itemCount = itemCount;
				context.feeApplied = false;
				context.summaryMessage = '';
			}
			return context;
		})
	});

	_.extend(LiveOrderModel.prototype, {
		getNonShippableLines: function getNonShippableLines() {
			return this.get("lines").filter(function(e) {
				return !e.get("item").get("_isfulfillable") && e.get("item").get('internalid') !== 357652
			});
		}
	});
});
