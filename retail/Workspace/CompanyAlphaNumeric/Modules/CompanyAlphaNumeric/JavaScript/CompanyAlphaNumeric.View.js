// @module SCA.CompanyAlphaNumeric.CompanyAlphaNumeric
define('SCA.CompanyAlphaNumeric.CompanyAlphaNumeric.View'
,	[
	'sca_companyalphanumeric_companyalphanumeric.tpl'
	
	
	,	'Backbone'
    ]
, function (
	sca_companyalphanumeric_companyalphanumeric_tpl
	
	
	,	Backbone
)
{
    'use strict';

	// @class SCA.CompanyAlphaNumeric.CompanyAlphaNumeric.View @extends Backbone.View
	return Backbone.View.extend({

		template: sca_companyalphanumeric_companyalphanumeric_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new CompanyAlphaNumericModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return SCA.CompanyAlphaNumeric.CompanyAlphaNumeric.View.Context
	,	getContext: function getContext()
		{
			//@class SCA.CompanyAlphaNumeric.CompanyAlphaNumeric.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
