define('QuantityAlert.View'
,	[
        'quantityalert.tpl'
    ,   'ACS.CartItemView.Helper'
	,	'Backbone'
	,	'underscore'
	]
,	function (
        quantityAlertTpl
    ,   CartItemViewHelper
	,	Backbone
	,	_
	)
{
	'use strict';

	return Backbone.View.extend({

		template: quantityAlertTpl,

        initialize: function initialize(options) {
            if (options.itemModel) {
                this.updateView(options.itemModel);
            }
        },

        setIsLoading: function setIsLoading(isLoading) {
            this.isLoadingFlag = isLoading;
        },

        isLoading: function isLoading() {
            return !!this.isLoadingFlag;
        },

        updateView: function updateView(cartLine) {
            this.quantityAlertData = CartItemViewHelper.getQuantityAlertLineData(cartLine);
            this.setIsLoading(false);
            this.render();
        },

        getContext: function getContext() {
            if (this.quantityAlertData) {
                var tooltipMessage = (this.quantityAlertData) ? this.quantityAlertData.message : '';
                return {
                    showMessage: !this.isLoading() && this.quantityAlertData.showQuantityAlert,
                    tooltipMessage: tooltipMessage
                };
            } else {
                return {};
            }
        }
	});
});
