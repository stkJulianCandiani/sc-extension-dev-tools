
define('ACS.QtyAlert.Alert', [
    'jQuery',
    'underscore'
], function QtyAlert(
    jQuery,
    _
) {
    'use strict';

    var minicartClass = '.header-mini-cart-item-cell';
    return {
        alertHtml: function alertHtml(name, qty, quantityavailable) {
            var text = this.configuration;
            text = text.replace('[itemname]', name);
            text = text.replace('[unitsrequested]', qty);
            text = text.replace('[unitsavailable]', quantityavailable);
            return '<div class="out-of-stock-notification-container"><i class="out-of-stock-notification-icon" id="minicart-tooltip-" data-toggle="tooltip" data-placement="top" title="' + text + '"></i></div>';
        },
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var self = this;
            var environment = container.getComponent('Environment');
            this.configuration = environment.getConfig('quantityalert.text');

            if (cart) {
                cart.on('afterAddLine', function afterAddLine() {
                    self.updateMinicart(cart);
                });
                cart.on('afterUpdateLine', function afterUpdateLine() {
                    self.updateMinicart(cart);
                });
                layout.on('afterShowContent', function afterShowContent() {
                    self.updateMinicart(cart);
                });
            }
        },
        showAlertNeeded: function showAlertNeeded(line) {
            var extras = line.item && line.item.extras ? line.item.extras : {};
            var doNotReorderFlag = extras.custitem_do_not_reorder_flag;
            return line.quantity > extras.quantityavailable && doNotReorderFlag;
        },
        displayAlert: function displayAlert(line) {
            var hrml = this.alertHtml(line.item.displayname, line.quantity, line.item.extras.quantityavailable);
            var itemInternalid = line.item.internalid;
            var minicartCell = jQuery('.header-mini-cart-item-cell[data-item-id=' + itemInternalid + ']');
            var cartCell = jQuery('.cart-lines-row[data-item-id=' + itemInternalid + ']');
            if (minicartCell) {
                minicartCell.find('.header-mini-cart-quantity-alert').html(hrml);
                jQuery('.out-of-stock-notification-icon').tooltip();
            }
            if (cartCell) {
                cartCell.find('[data-type="alert-placeholder"]').html(hrml);
                jQuery('.out-of-stock-notification-icon').tooltip();
            }
        },
        updateMinicart: function updateMinicart(cart) {
            var self = this;
            cart.getLines().then(function getLines(lines) {
                _.each(lines, function each(line) {
                    if (self.showAlertNeeded(line)) {
                        self.displayAlert(line);
                    }
                });
            });
        }
    };
});
