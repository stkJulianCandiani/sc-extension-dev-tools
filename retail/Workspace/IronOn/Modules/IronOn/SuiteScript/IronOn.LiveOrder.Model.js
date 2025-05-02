// IronOn.LiveOrder.Model.js
// ----------------
define('IronOn.LiveOrder.Model', [
    'Application',
    'Configuration',
    'SC.Models.Init',
    'LiveOrder.Model',
    'IronOn.LiveOrder.Helper',
    'underscore'
], function IronOnLiveOrderModel(
    Application,
    Configuration,
    ModelsInit,
    LiveOrderModel,
    Helper,
    _
) {
    'use strict';

    // @method updateLine
    // @param {String} lineId
    // @param {LiveOrder.Model.Line} lineData
    _.extend(LiveOrderModel, {
        updateLine: function updateLine(lineId, lineData) {
            var linesSort;
            var currentPosition;
            var originalLineObject;
            var newLineId;
            var rollBackItem;
            try {
                Helper.updateIronOnItems(lineId, lineData);
            } catch (e) {
                nlapiLogExecution('ERROR', 'LiveOrder.updateIronOnItems', e);
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
        var ironOnLines;
        var linesChanged;
        var orderFields;
        var shippingMethodRemoved;
        try {
            if (response.lines) {
                ironOnLines = Helper.getIronInLines(response.lines);
                if (!_.isEmpty(ironOnLines)) {
                    shippingMethodRemoved = Helper.validateShippingMethod(response);
                    if (shippingMethodRemoved) {
                        response.shipmethod = '';
                        orderFields = LiveOrderModel.getFieldValues();
                        response.summary = Helper.getOrderSummary(orderFields);
                    }
                    nlapiLogExecution('DEBUG', 'ironOnLines', ironOnLines);
                    linesChanged = Helper.validateIronOnLines(response.lines, ironOnLines);
                    nlapiLogExecution('DEBUG', 'linesChanged', linesChanged);
                    if (linesChanged) {
                        orderFields = LiveOrderModel.getFieldValues();
                        response.lines = LiveOrderModel.getLines(orderFields);
                        ironOnLines = Helper.getIronInLines(response.lines);
                        response.summary = Helper.getOrderSummary(orderFields);
                    }
                    nlapiLogExecution('DEBUG', 'response.lines', JSON.stringify(response.lines.length));
                    response.lines = Helper.updateCartLines(ironOnLines, response.lines);
                }
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'LiveOrder.get', e);
        }
    });

    Application.on('after:LiveOrder.submit', function afterLiveOrderSubmit(model, result) {
        var ironOnLines = Helper.getIronInLines(result.lines);
        try {
            result.lines = _.filter(result.lines, function filterLines(line) {
                var lineFound = _.find(ironOnLines, function findLine(ironOnLine) {
                    return _.find(ironOnLine, function find(ironOnLineItem) {
                        return ironOnLineItem.line.item.internalid === line.item.internalid && (ironOnLineItem.isTroopNumeral || ironOnLineItem.isExtraItem);
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
        var ironOnLines;
        var itemsToRemove = [];
        try {
            if (!isFromUpdate) {
                orderFields = LiveOrderModel.getFieldValues();
                orderLines = Helper.getOrderLines(orderFields);
                ironOnLines = Helper.getIronInLines(orderLines);
                itemsToRemove = [];
                // personalizationLines is array identify by line id and each elements contains an array of PersonalizationLine
                _.each(ironOnLines, function eachLine(ironOnLine) {
                    var mainItem = _.find(ironOnLine, function eachIronOnLine(line) {
                        return !line.isTroopNumeral;
                    });
                    if (mainItem && mainItem.lineInternalid === lineId) {
                        _.each(ironOnLine, function eachIronOnLine(troopNumeral) {
                            itemsToRemove.push(troopNumeral.lineInternalid);
                        });
                    }
                });
                Helper.removeLinesFromCart(itemsToRemove);
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'LiveOrder.removeLine', e);
        }
    });

    Application.on('before:LiveOrder.addLine', function beforeLiveOrderAddLine(Model, lineData) {
        var isValid = Helper.validateAddToCart(lineData);
        if (!isValid) {
            throw 'Missing Information in customized Item.';
        }
    });

    Application.on('before:LiveOrder.addLines', function beforeLiveOrderAddLines(Model, linesData) {
        var isValid = true;
        _.each(linesData, function eachLine(lineData) {
            isValid = isValid ? Helper.validateAddToCart(lineData) : isValid;
        });
        if (!isValid) {
            throw 'Missing Information in customized Item.';
        }
    });
});
