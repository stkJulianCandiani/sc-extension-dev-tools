define('IronOn.Cart.HideActions', [
    'underscore'
], function IronOnCartHideActions(
    _
) {
    'use strict';

    return {
        hideCartActions: function hideCartActions(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var ironOnConfiguration = environment.getConfig('extensions').ironon;
            if (ironOnConfiguration) {
                layout.addToViewContextDefinition('Cart.Item.Actions.View', 'isAdvanced', 'boolean', function addToViewContextDefinition(context) {
                    var line = context.line;
                    var isAdvanced = context.isAdvanced;
                    var ironOnLine;
                    if (line.item && line.item.itemoptions_detail) {
                        ironOnLine = _.find(line.item.itemoptions_detail.fields, function find(options) {
                            return options.internalid === ironOnConfiguration.lineIdItemOption || options.internalid === 'custcol_acs_monogram_line_id';
                        });
                        if (ironOnLine) {
                            isAdvanced = false;
                        }
                    }
                    return isAdvanced;
                });
            }
        },
        removeNavigationLink: function removeNavigationLink(layout) {
            layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Actionable.View', 'isNavigable', 'boolean', function getContext(context) {
                var isNavigable = context.isNavigable;
                if (context.line && (context.line.showTroopNumeral || context.line.showMonogram)) {
                    isNavigable = false;
                }
                return isNavigable;
            });
        }
    };
});
