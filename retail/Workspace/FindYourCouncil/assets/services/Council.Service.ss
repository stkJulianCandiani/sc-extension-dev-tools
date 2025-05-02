
function service(request, response)
{
	'use strict';
	try
	{
		require('Council.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('Council.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
