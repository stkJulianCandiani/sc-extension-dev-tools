
define(
	'SCA.CompanyAlphaNumeric.CompanyAlphaNumeric'
	, [
		'SCA.CompanyAlphaNumeric.CompanyAlphaNumeric.View',
		'Address.Edit.Fields.View',
		'Address.Edit.View'
	]
	, function (
		CompanyAlphaNumericView,
		AddressEditFieldsView,
		AddressEditView
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {

				var OriginalInitialize = AddressEditFieldsView.prototype.initialize;
				var OriginalInitializeEditView = AddressEditView.prototype.initialize;

				_.extend(AddressEditFieldsView.prototype, {
					initialize: function () {
						OriginalInitialize.apply(this, arguments);

						// Attach event listener to validate input as the user types

						this.events = _.extend({}, this.events, {
							'input [name="company"]': 'validateCompanyField'
						});

					},

					validateCompanyField: function (e) {

						var $companyField = jQuery(e.target);
						var companyValue = $companyField.val();

						// Check for non-alphanumeric characters
						if (!/^[a-zA-Z0-9 ]*$/.test(companyValue)) {
							// Show inline error message and highlight the field
							this.showError('The Company field can only contain alphanumeric characters.');
							$companyField.addClass('error');
						} else {
							// Clear the error if validation passes
							this.hideError();
							$companyField.removeClass('error');
						}
					}


				});

				_.extend(AddressEditView.prototype, {
					initialize: function () {
						OriginalInitializeEditView.apply(this, arguments);

						const originalSaveForm = this.saveForm;
						this.saveForm = function saveForm(e) {
							// Perform validation for the company field
							const $companyField = this.$('[name="company"]');
							const companyValue = $companyField.val();

							if (!/^[a-zA-Z0-9 ]*$/.test(companyValue)) {
								// Show error message and prevent form submission
								this.showError('The Company field can only contain alphanumeric characters. Please correct it before submitting.');
								$companyField.addClass('error');
								e.preventDefault(); // Stop form submission
								return false; // Exit saveForm without calling the original logic
							}

							// Clear any error if validation passes
							$companyField.removeClass('error');
							return originalSaveForm.apply(this, arguments);
						};

					},

				})

			}
		};
	});
