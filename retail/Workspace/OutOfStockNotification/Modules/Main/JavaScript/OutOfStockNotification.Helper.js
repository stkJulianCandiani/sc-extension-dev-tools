/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('OutOfStockNotification.Helper', [
    'SC.Configuration',
    'underscore'
], function OutOfStockNotificationHelper(
    Configuration,
    _
) {
    'use strict';

    return {
        outOfStockConfiguration: Configuration.get('quantityalert'),

        getFirstCartLineWithOutOfStockItems: function getFirstCartLineWithOutOfStockItems(cartLines) {
            var self = this;
            return _.find(cartLines, function cartLinesIterator(cartLine) {
                var quantityAvailable = self.getPropertyFromCartLine(cartLine, 'quantityavailable');
                var quantityRequested = self.getPropertyFromCartLine(cartLine, 'quantity');
                return quantityAvailable < quantityRequested;
            });
        },

        getPropertyFromCartLine: function getPropertyFromCartLine(cartLine, property) {
            if (!cartLine || !property) return {};
            return cartLine.get(property) || ((cartLine.get('item')) ? cartLine.get('item').get(property) : {});
        },

        getParsedQuantityAlertMessage: function getParsedQuantityAlertMessage(cartLine) {
            var self = this;
            var messageFromConfiguration = Configuration.get('quantityalert.text');
            var cartLineKeyMapping = Configuration.get('quantityalert.mapping');
            if (!messageFromConfiguration || !cartLineKeyMapping || cartLineKeyMapping.length <= 0) return false;

            _.each(cartLineKeyMapping, function cartLineKeyMappingIterator(key) {
                var keyTextInMessage = '[' + key.messageText + ']';
                var itemValueToDisplay = self.getPropertyFromCartLine(cartLine, key.cartLineAttribute);
                messageFromConfiguration = messageFromConfiguration.replace(keyTextInMessage, itemValueToDisplay);
            });
            return messageFromConfiguration;
        },

        getOutOfStockData: function getOutOfStockData(contextLineData) {
            var outOfStockData = {};
            var itemData = (!contextLineData.get('item')) ? contextLineData : contextLineData.get('item');
            var quantityRequested = contextLineData.get('quantity') || itemData.get('quantity');
            var quantityAvailable = itemData.get('quantityavailable');
            var doNotReorderFlag = itemData.get('custitem_do_not_reorder_flag');
            var isBackorderable = itemData.get('isbackorderable');
            var showOutOfStockConfiguration = Configuration.get('quantityalert.showquantityalert');
            if (quantityRequested > quantityAvailable) {
                outOfStockData = {
                    quantityAvailable: quantityAvailable,
                    outOfStockMessage: this.getParsedQuantityAlertMessage(contextLineData),
                    showOutOfStock: showOutOfStockConfiguration && !isBackorderable && doNotReorderFlag
                };
            }
            return outOfStockData;
        }
    };
});
