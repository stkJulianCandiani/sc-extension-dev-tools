/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('OutOfStockNotification.View', [
    'OutOfStockNotification.Helper',
    'out_of_stock_notification.tpl',
    'Backbone'
], function OutOfStockNotificationView(
    OutOfStockNotificationHelper,
    OutOfStockNotificationTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        template: OutOfStockNotificationTpl,

        outOfStockData: {},

        outOfStockConfiguration: {},

        initialize: function initialize(options) {
            if (options.cartLine) {
                this.getOutOfStockData(options.cartLine);
            }
        },

        getOutOfStockData: function getOutOfStockData(contextLineData) {
            this.outOfStockData = OutOfStockNotificationHelper.getOutOfStockData(contextLineData);
        },

        getContext: function getContext() {
            var context = {
                outOfStockData: this.outOfStockData
            };
            var item;

            if (this.options.miniCart) {
                item = this.options.cartLine.get('item');
                context.container = "[data-item-id='" + item.get('internalid') + "']:first .header-mini-cart-item-cell-details";
            }

            return context;
        }
    });
});
