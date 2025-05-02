/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.OutOfStockNotification.Main', [
    'OutOfStockNotification.View',
    'OutOfStockNotification.PDP.View',
    'Header.MiniCartItemCell.View',
    'Cart.Lines.View',
    'ProductDetails.Full.View',
    'ProductDetails.QuickView.View',
    'CS.QuickOrder.Line.View',
    'underscore'
], function CSOutOfStockNotificationMain(
    OutOfStockNotificationView,
    OutOfStockNotificationPDPView,
    HeaderMiniCartItemCellView,
    CartLinesView,
    ProductDetailsFullView,
    ProductDetailsQuickViewView,
    CSQuickOrderLineView,
    _
) {
    'use strict';

    _.extend(HeaderMiniCartItemCellView.prototype, {
        childViews: _.extend(HeaderMiniCartItemCellView.prototype.childViews, {
            'OutOfStockNotification': function OutOfStockNotificationChildView() {
                return new OutOfStockNotificationView({
                    cartLine: this.model,
                    miniCart: true
                });
            }
        })
    });

    _.extend(CartLinesView.prototype, {
        childViews: _.extend(CartLinesView.prototype.childViews, {
            'OutOfStockNotification': function OutOfStockNotificationChildView() {
                return new OutOfStockNotificationView({
                    cartLine: this.model
                });
            }
        })
    });

    _.extend(ProductDetailsFullView.prototype, {
        childViews: _.extend(ProductDetailsFullView.prototype.childViews, {
            'OutOfStockNotification': function OutOfStockNotificationChildView() {
                return new OutOfStockNotificationPDPView({
                    item: this.model
                });
            }
        })
    });

    _.extend(ProductDetailsQuickViewView.prototype, {
        childViews: _.extend(ProductDetailsQuickViewView.prototype.childViews, {
            'OutOfStockNotification': function OutOfStockNotificationChildView() {
                return new OutOfStockNotificationPDPView({
                    item: this.model
                });
            }
        })
    });

    _.extend(CSQuickOrderLineView.prototype, {
        childViews: _.extend(CSQuickOrderLineView.prototype.childViews, {
            'QuickOrder.OutOfStockNotification': function OutOfStockNotificationChildView() {
                return new OutOfStockNotificationView({
                    cartLine: this.model
                });
            }
        })
    });

    // return {
    //     mountToApp: function mountToApp(container) {
    //         var layout = container.getComponent('Layout');
    //
    //         layout.on('afterShowContent', function afterShowContent() {
    //             jQuery.each(jQuery('i.out-of-stock-notification-icon'), function (idx, $element) {
    //                 jQuery($element).attr('id', 'minicart-tooltip' + idx);
    //                 jQuery($element).tooltip({
    //                     container: '#minicart-tooltip' + idx,
    //                     html: true
    //                 });
    //             });
    //         });
    //     }
    // };
});
