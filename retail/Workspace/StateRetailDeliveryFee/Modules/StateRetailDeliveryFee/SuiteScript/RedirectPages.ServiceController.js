define('RedirectPages.ServiceController', [
	'ServiceController',
	'RedirectPages.Model'
], function RedirectPagesServiceController(
	ServiceController,
	RedirectPagesModel
) {
		'use strict';

		return ServiceController.extend({

			name: 'RedirectPages.ServiceController',

			get: function get() {
				var url = this && this.request && this.request.getParameter('url');
				return RedirectPagesModel.get(url);
			}
		});
	}
);
