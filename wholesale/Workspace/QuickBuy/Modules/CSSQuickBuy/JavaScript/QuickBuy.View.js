// @module CSSTeam.QuickBuy.QuickBuy
define('CSSTeam.QuickBuy.QuickBuy.View'
,	[
		'cssteam_quickbuy_quickbuy.tpl'
	,	'Utils'
	,	'Backbone'
	,	'jQuery'
	,	'underscore'
	]
,	function (
		cssteam_quickbuy_quickbuy_tpl
	,	Utils
	,	Backbone
	,	jQuery
	,	_
	)
{
	'use strict';

	// @class CSSTeam.QuickBuy.QuickBuy.View @extends Backbone.View
	return Backbone.View.extend({
		el: "#main",
		template: cssteam_quickbuy_quickbuy_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service 
				(you'll need to deploy and activate the extension first)
			*/
			this.message = ""
			// var service_url = Utils.getAbsoluteUrl(getExtensionAssetsPath('services/QuickBuy.Service.ss'));

			// jQuery.get(service_url)
			// .then((result) => {

			// 	this.message = result;
			// 	this.render();
			// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {
			
		}

		//@method getContext @return CSSTeam.QuickBuy.QuickBuy.View.Context
	,	getContext: function getContext()
		{
			//@class CSSTeam.QuickBuy.QuickBuy.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
