
function service(request, response)
{
	'use strict';
	try 
	{
		require('CSSTeam.QuickBuy.LiveOrder.MultiLine.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CSSTeam.QuickBuy.LiveOrder.MultiLine.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}