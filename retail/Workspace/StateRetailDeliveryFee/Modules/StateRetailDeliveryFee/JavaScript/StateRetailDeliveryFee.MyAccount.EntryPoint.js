define('StateRetailDeliveryFee.MyAccount.EntryPoint', [
	'OrderHistory.Details.View',
	'OrderHistory.Summary.View',
	'StateRetailDeliveryFee.Helper',
	'SC.Configuration',
	'order_history_summary_delivery_fee.tpl',
	'underscore',
	'jQuery',
	'Utils'
], function StateRetailDeliveryFeeMyAccountEntryPoint(
	OrderHistoryDetailsView,
	OrderHistorySummaryView,
	Helper,
	Configuration,
	template,
	_,
	jQuery,
	Utils
) {
	'use strict';

	_.extend(OrderHistoryDetailsView.prototype, {
		getNonShippableLines: _.wrap(OrderHistoryDetailsView.prototype.getNonShippableLines, function wrapNonShipItems(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));
			// Filter colorado tax from MyAccount list
			if (context && context.length > 0) {
				context = context.filter(function filtItems(params) {
					return !params.get("item").get('_isfulfillable') && params.get("item").get('internalid') !== 357652
				});
			}
			return context;
		})
	});
	_.extend(OrderHistorySummaryView.prototype, {
		getContext: _.wrap(OrderHistorySummaryView.prototype.getContext, function getContextWrap(fn) {
			var context = fn.apply(this, _.toArray(arguments).slice(1));
			// todo: Agregar logica para cambiar summary dependiendo si hay tax o no
			var model = this.model;
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
				context.feeApplied = true;
				context.feeValue = feeValue;
				context.summaryMessage = summaryMessage;
			} else {
				summary.taxtotal_formatted = Utils.formatCurrency(taxTotal);
				context.feeApplied = false;
				context.summaryMessage = '';
			}
			return context;
		}),
		template: template
	});
});
