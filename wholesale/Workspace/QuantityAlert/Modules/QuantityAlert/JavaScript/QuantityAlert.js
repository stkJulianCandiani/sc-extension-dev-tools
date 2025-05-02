define(
	'QuantityAlert'
,   [
        'QuantityAlert.View',
        'QuantityAlert.PDP.View',
        'SC.Configuration'
	]
,   function (
        QuantityAlertView,
        QuantityAlertPDPView,
        Configuration
	)
{
	'use strict';

	return  {
        createQuantityChildViewObject: function createQuantityChildViewObject(component) {
            return {
                'MainActionView': {
                    'QuantityAlert': {
                        childViewIndex: 1,
                        childViewConstructor: function quantityAlertViewConstructor() {
                            return new QuantityAlertPDPView({
                                pdpComponent: component
                            });
                        }
                    }
                }
            };
        },

		mountToApp: function mountToApp (container) {
            var layout = container.getComponent('Layout');
            var pdpComponent = container.getComponent('PDP');
            var cartComponent = container.getComponent('Cart');
            var quantityAlertObject;
            if (pdpComponent) {
                quantityAlertObject = this.createQuantityChildViewObject(pdpComponent);
                pdpComponent.addChildViews(pdpComponent.PDP_FULL_VIEW, quantityAlertObject);
                pdpComponent.addChildViews(pdpComponent.PDP_QUICK_VIEW, quantityAlertObject);
            }

            // CartItemViewHelper.setup({
            //     container: container,
            //     childView: QuantityAlertView,
            //     placeholderChildView: 'Item.Summary.View',
            //     component: container.getComponent('Cart')
            // });

            // if (cartComponent) {
            //     layout.addToViewContextDefinition('Item.Summary.View', 'showAlert', 'boolean', function(context) {
            //         var itemIsEligibleForQuantityAlert = context.line.item.custitem_do_not_reorder_flag && !context.line.item.isbackorderable && 
            //             (context.line.item.maximumquantity < context.line.quantity && context.line.item.quantityavailable < context.line.quantity);
            //         var showTheMessage = !!Configuration.get('quantityalert.showquantityalert') && itemIsEligibleForQuantityAlert;
            //         return showTheMessage;
            //     });
            //     layout.addToViewContextDefinition('Item.Summary.View', 'showAlert', 'boolean', function(context) {
            //         var toolTipMessage = CartItemViewHelper.getParsedQuantityAlertMessage(context.line);
            //         return toolTipMessage;
            //     });
            // }
            
            layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'showTheMessage', 'boolean', function(context) {
                var itemIsEligibleForQuantityAlert = context.line.item.custitem_do_not_reorder_flag && !context.line.item.isbackorderable && 
                    (context.line.item.maximumquantity < context.line.quantity && context.line.item.quantityavailable < context.line.quantity);
                var showTheMessage = !!Configuration.get('quantityalert.showquantityalert') && itemIsEligibleForQuantityAlert;
                return showTheMessage;
            });
            layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'tooltipMessage', 'string', function(context) {
                var toolTipMessage = Configuration.get('quantityalert.text');
                return toolTipMessage;
            });
		}
	};
});
