
function service(request, response)
{
	'use strict';
	try
	{
		require('ReCaptcha.Configuration.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('ReCaptcha.Configuration.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
