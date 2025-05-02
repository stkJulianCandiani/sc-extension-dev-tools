
function service(request, response)
{
	'use strict';
	try
	{
		require('CS.QuickOrder.LiveOrder.MultiLine.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('CS.QuickOrder.LiveOrder.MultiLine.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
