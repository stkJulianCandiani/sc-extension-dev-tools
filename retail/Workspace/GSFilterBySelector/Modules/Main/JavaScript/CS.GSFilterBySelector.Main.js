define('CS.GSFilterBySelector.Main', [
	'Profile.Model'
],
function CSGSFilterBySelectorMain (
	ProfileModel
) {
	'use strict';

	return {
		mountToApp: function mountToApp(container) {
			var layout = container.getComponent('Layout');
			
			layout.addToViewEventsDefinition('Facets.ItemListSortSelector.View', 'click [data-action="select-sort"]', function changeSelector(e) {
				var target = jQuery(e.currentTarget);
				var dropdown = target.parent();
	
				dropdown.attr('disabled', 'disabled');
	
				Backbone.history.navigate(target.data('value'), {
					trigger: true
				});
			});

			layout.addToViewContextDefinition('Facets.ItemListSortSelector.View', 'selectedLabel', 'string', function addOptionsToContext(context) {
				var optionItems = context.options;
				var selected = _.findWhere(optionItems, {
					isSelected: 'selected'
				});

				return selected.name;
			});
		}
	};
});
