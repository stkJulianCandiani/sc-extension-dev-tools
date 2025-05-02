
define(
	'CSSTeam.QuickBuy.CSSQuickBuy'
,   [
		'CSSTeam.QuickBuy.QuickBuySite.Router'
	]
,   function (
	
		Router
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			return new Router({container:container})

		}
	};
});
