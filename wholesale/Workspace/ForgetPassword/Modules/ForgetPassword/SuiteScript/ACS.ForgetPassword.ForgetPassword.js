// ACS.ForgetPassword.ForgetPassword.js
// Load all your starter dependencies in backend for your extension here
// ----------------

define('ACS.ForgetPassword.ForgetPassword'
,	[
		
		'SC.Model'
	,	'Models.Init'
	,	'Configuration'
	]
,	function (
		SCModel
	,	ModelsInit
	,	Configuration
	)
{
	'use strict';
	return SCModel.extend({

		name: 'ForgetPasswordCustom'

	,	forgotPassword: function (email)
		{
			try
			{
				nlapiLogExecution("ERROR","DATA",JSON.stringify(email))
				var siteid = ModelsInit.session.getSiteSettings(['siteid']).siteid
				nlapiLogExecution("ERROR","responseBody",JSON.stringify(responseBody))
				var linkURL = nlapiResolveURL('SUITELET', 'customscript_validate_email','customdeploy1',true)
							+ '&email=' +email +"&siteid="+siteid;
				var response = nlapiRequestURL(linkURL,"get");
				var responseBody = JSON.parse(response.getBody())
				nlapiLogExecution("ERROR","responseBody",JSON.stringify(responseBody))
				nlapiLogExecution("ERROR","Configuration",JSON.stringify(Configuration))
				var config = Configuration.get();
				// this API method throws an exception if the email doesn't exist
				// 'The supplied email has not been registered as a customer at our Web store.'
				if(responseBody.exists){
					ModelsInit.session.sendPasswordRetrievalEmail(email);
				}else{
					return {
						success : true
					}
				}
			}
			catch (e)
			{
				var error = Application.processError(e);
				// if the customer failed to log in previously
				// the password retrieval email is sent but an error is thrown
				if (error.errorCode !== 'ERR_WS_CUSTOMER_LOGIN')
				{
					throw e;
				}
			}

			return  {
				success: true
			};
		}
	
	})
	
});
