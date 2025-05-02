define('Monogram.LiveOrder.Model', [
    'Application',
    'SC.Models.Init',
    'LiveOrder.Model',
    'Monogram.LiveOrder.Helper',
    'underscore'
], function MonogramLiveOrderModel(
    Application,
    ModelsInit,
    LiveOrderModel,
    Helper,
    _
) {
    'use strict';

    _.extend(LiveOrderModel, {
        updateLine: function updateLine(lineId, lineData) {
            var linesSort;
            var currentPosition;
            var originalLineObject;
            var newLineId;
            var rollBackItem;
            try {
                Helper.updateMonogramItems(lineId, lineData);
            } catch (e) {
                nlapiLogExecution('ERROR', 'LiveOrder.updateLine', e);
            }
            linesSort = this.getLinesSort();
            currentPosition = _.indexOf(linesSort, lineId);
            originalLineObject = ModelsInit.order.getItem(lineId, [
                'quantity', 'internalid', 'options', 'fulfillmentPreferences'
            ]);
            this.removeLine(lineId, true);

            if (!_.isNumber(lineData.quantity) || lineData.quantity > 0) {
                try {
                    newLineId = this.addLine(lineData);
                } catch (e) {
                    // we try to roll back the item to the original state
                    rollBackItem = {
                        item: {
                            internalid: parseInt(originalLineObject.internalid, 10)
                        },
                        quantity: parseInt(originalLineObject.quantity, 10)
                    };

                    if (originalLineObject.options && originalLineObject.options.length) {
                        rollBackItem.options = {};
                        _.each(originalLineObject.options, function each(option) {
                            rollBackItem.options[option.id.toLowerCase()] = option.value;
                        });
                    }

                    newLineId = this.addLine(rollBackItem);

                    e.errorDetails = {
                        status: 'LINE_ROLLBACK',
                        oldLineId: lineId,
                        newLineId: newLineId
                    };

                    throw e;
                }

                linesSort = _.without(linesSort, lineId, newLineId);
                linesSort.splice(currentPosition, 0, newLineId);
                this.setLinesSort(linesSort);
            }
        }
    });

    Application.on('after:LiveOrder.get', function afterLiveOrderGet(Model, response) {
        var monogramLines;
        var linesChanged;
        var orderFields;
        var shippingMethodRemoved;
        try {
            if (response.lines) {
                monogramLines = Helper.getMonogramLines(response.lines);
                if (!_.isEmpty(monogramLines)) {
                    shippingMethodRemoved = Helper.validateShippingMethod(response);
                    if (shippingMethodRemoved) {
                        response.shipmethod = '';
                        orderFields = LiveOrderModel.getFieldValues();
                        response.summary = Helper.getOrderSummary(orderFields);
                    }
                    nlapiLogExecution('DEBUG', 'monogramLines', monogramLines);
                    linesChanged = Helper.validateMonogramLines(monogramLines);
                    nlapiLogExecution('DEBUG', 'linesChanged', linesChanged);
                    if (linesChanged) {
                        orderFields = LiveOrderModel.getFieldValues();
                        response.lines = LiveOrderModel.getLines(orderFields);
                        monogramLines = Helper.getMonogramLines(response.lines);
                        response.summary = Helper.getOrderSummary(orderFields);
                    }
                    nlapiLogExecution('DEBUG', 'response.lines', JSON.stringify(response.lines.length));
                    response.lines = Helper.updateCartLines(monogramLines, response.lines);
                }
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'LiveOrder.get', e);
        }
    });

    Application.on('after:LiveOrder.submit', function afterLiveOrderSubmit(model, result) {
        var monogramLines = Helper.getMonogramLines(result.lines);
        try {
            result.lines = _.filter(result.lines, function filterLines(line) {
                var lineFound = _.find(monogramLines, function findLine(monogramLine) {
                    return _.find(monogramLine, function find(lineItem) {
                        return lineItem.line.item.internalid === line.item.internalid && lineItem.isMonogram;
                    });
                });
                return !lineFound;
            });
        } catch (e) {
            nlapiLogExecution('ERROR', 'LiveOrder.submit', e);
        }
        return result;
    });


    /**
     * wraps the remove line function in order to remove all cost items
     * if the item to be updated is a personalization item
     */
    Application.on('before:LiveOrder.removeLine', function beforeLiveOrderRemove(Model, lineId, isFromUpdate) {
        var orderFields;
        var orderLines;
        var monogramLines;
        var itemsToRemove = [];
        try {
            if (!isFromUpdate) {
                orderFields = LiveOrderModel.getFieldValues();
                orderLines = Helper.getOrderLines(orderFields);
                monogramLines = Helper.getMonogramLines(orderLines);
                itemsToRemove = [];
                // personalizationLines is array identify by line id and each elements contains an array of PersonalizationLine
                _.each(monogramLines, function eachLine(monogramLine) {
                    var mainItem = _.find(monogramLine, function eachMonogramLine(line) {
                        return !line.isMonogramAlphabet;
                    });
                    if (mainItem && mainItem.lineInternalid === lineId) {
                        _.each(monogramLine, function eachMonogramMainLine(monogram) {
                            itemsToRemove.push(monogram.lineInternalid);
                        });
                    }
                });
                Helper.removeLinesFromCart(itemsToRemove);
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'LiveOrder.removeLine', e);
        }
    });
});
