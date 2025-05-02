/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module LoginRegister
define('ForgetPassword.Router'
,	[
		'ForgotPassword.View'
	,	'Profile.Model'
	,	'Account.ForgotPassword.Model'
	,	'Backbone'
	,	'underscore'
	]
,	function (
		ForgotPasswordView
	,	ProfileModel
	,	ForgotPassword
	,	Backbone
	,	_
	)
{
	'use strict';

	// @class LoginRegister.Router Handles views and routers of Login/Register Page. Includes Register Guest, Forgot Password and Reset password.
	// Initializes the different views depending on the requested path.  @extend Backbone.Router
	return Backbone.Router.extend({

		routes: {
			'forgot-password-custom': 'forgotPassword'
		}

	,	initialize: function (application)
		{
			// application is a required parameter for all views
			// we save the parameter to pass it later
			this.application = application;
			this.profileModel = ProfileModel.getInstance();
		}

		// @method forgotPassword dispatch the 'forgot password' URL
	,	forgotPassword: function ()
		{
			var view = new ForgotPasswordView({
				application: this.application,
				model: ForgotPassword
			});

			view.showContent();
		}
	});
});
