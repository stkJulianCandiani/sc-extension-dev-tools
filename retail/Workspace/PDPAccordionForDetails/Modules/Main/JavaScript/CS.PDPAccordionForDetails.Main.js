define('CS.PDPAccordionForDetails.Main', [
	'PDPAccordionForDetails.View'
],
function (
	PDPAccordionForDetailsView
) {
	'use strict';

	return {
		mountToApp: function mountToApp(container) {
			var PDP = container.getComponent('PDP');

			// Change in theme the DataView name ProductInfoAccordion to PDPAcordionDetails to match the extension.
			PDP.addChildView('ProductInfoAccordion', function addChildView() { 
				return new PDPAccordionForDetailsView({
					placeholder: 'desktop'
				});
			});

			PDP.addChildView('ProductInfoAccordionMobile', function addChildView() { 
				return new PDPAccordionForDetailsView({
					placeholder: 'mobile'
				});
			});
		}
	};
});
