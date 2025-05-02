
function service(request, response)
{
	'use strict';
	try 
	{
		require('FAQ.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('FAQ.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}