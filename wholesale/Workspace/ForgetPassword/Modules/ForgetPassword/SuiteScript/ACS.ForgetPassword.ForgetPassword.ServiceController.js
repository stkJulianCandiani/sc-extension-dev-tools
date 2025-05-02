define(
	'ACS.ForgetPassword.ForgetPassword.ServiceController'
,	[
		'ServiceController'
	,	'ACS.ForgetPassword.ForgetPassword'
	]
,	function(
		ServiceController
	,	AccountModel
	)
	{
		'use strict';

		// @class Account.ForgotPassword.ServiceController
		// Supports password recovery process
		// @extend ServiceController
		return ServiceController.extend({

			// @property {String} name Mandatory for all ssp-libraries model
			name:'ACS.ForgetPassword.ForgetPassword.ServiceController'

			// @method post The call to Account.ForgotPassword.Service.ss with http method 'post' is managed by this function
			// @return {Boolean} True if the password retrieval email is successfully sent
		,	post: function()
			{
				return AccountModel.forgotPassword(this.data.email);
			}
		});
	}
);
