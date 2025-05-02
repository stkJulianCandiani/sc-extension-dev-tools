function service(request, response){
	'use strict';

	try {
		require('RedirectPages.ServiceController').handle(request, response);
	} catch(ex) {
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}