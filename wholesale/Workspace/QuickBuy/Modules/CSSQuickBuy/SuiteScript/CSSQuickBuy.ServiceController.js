
define(
	'CSSTeam.QuickBuy.CSSQuickBuy.ServiceController'
,	[
		'ServiceController',
		'QuickOrder.Model'
	]
,	function(
		ServiceController,
		QuickOrderModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'CSSTeam.QuickBuy.CSSQuickBuy.ServiceController'

			// The values in this object are the validation needed for the current service.
		,	options: {
				common: {
				}
			}

		,	get: function get()
			{
				var keyword = this.request.getParameter('keyword');
				this.sendContent(QuickOrderModel.get(keyword, this.request), {
					'cache': response.CACHE_DURATION_MEDIUM
				});
			}
		});
	}
);
