
function service(request, response)
{
	'use strict';
	try 
	{
		require('CSSTeam.QuickBuy.CSSQuickBuy.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CSSTeam.QuickBuy.CSSQuickBuy.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}