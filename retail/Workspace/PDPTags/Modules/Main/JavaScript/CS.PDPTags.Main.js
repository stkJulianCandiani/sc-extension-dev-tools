
define('CS.PDPTags.Main', [
	'PDPTags.View'
], function (
	PDPTagsView
){
	'use strict';

	return  {
		mountToApp: function mountToApp (container) {
			var PDP = container.getComponent('PDP');
			var PLP = container.getComponent('PLP');

			if(PDP) {
				PDP.addChildView('ProductTag', function addChildView() {
					return new PDPTagsView({
						itemTagClass: ''
					});
				});
			}

			if(PLP) {
				PLP.addChildView('ProductTag', function addChildView() {
					return new PDPTagsView({
						itemTagClass: 'merchandising-item-tag'
					});
				});
			}
		}
	};
});
