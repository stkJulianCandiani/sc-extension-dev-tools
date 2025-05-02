define('Monogram.LiveOrder.Helper', [
    'LiveOrder.Model',
    'Configuration',
    'SC.Models.Init',
    'StoreItem.Model',
    'underscore',
    'Utils'
], function MonogramLiveOrderHelper(
    LiveOrderModel,
    Configuration,
    ModelsInit,
    StoreItem,
    _,
    Utils
) {
    'use strict';

    var staticValues = {
        itemFields: {
            monogramAlphabet: 'custitem_monogram_alphabet'
        },
        itemOptions: {
            monogramAlphabet: 'custcol_monogram_alphabet',
            alphabetSelection: 'custcol_acs_monogram_selection',
            alphabetSelectionItems: 'custcol_acs_monogram_selection_items',
            cost: 'custcol_acs_troop_numeral_cost',
            extraItems: 'custcol_acs_extra_customized_items',
            lineId: 'custcol_acs_monogram_line_id'
        }
    };

    return {

        addItemToCart: function addItemToCart(itemId, monogramAlphabet, lineIdentifier, lineData) {
            var lineId;
            var item;
            var options = {};
            if (monogramAlphabet) {
                options[staticValues.itemOptions.monogramAlphabet] = monogramAlphabet;
            }
            options[staticValues.itemOptions.lineId] = lineIdentifier;
            item = {
                internalid: itemId,
                quantity: _.isNumber(lineData.quantity) ? parseInt(lineData.quantity, 10) : 1,
                options: options
            };
            if (LiveOrderModel.isPickupInStoreEnabled && lineData.fulfillmentChoice === 'pickup' && lineData.location) {
                item.fulfillmentPreferences = {
                    fulfillmentChoice: 'pickup',
                    pickupLocationId: parseInt(lineData.location, 10)
                };
            }
            // Adds the line to the order
            lineId = ModelsInit.order.addItem(item);
            if (LiveOrderModel.isMultiShippingEnabled && lineData.fulfillmentChoice !== 'pickup') {
                // Sets it ship address (if present)
                if (lineData.shipaddress) {
                    ModelsInit.order.setItemShippingAddress(lineId, lineData.shipaddress);
                }
                // Sets it ship method (if present)
                if (lineData.shipaddress) {
                    ModelsInit.order.setItemShippingMethod(lineId, lineData.shipmethod);
                }
            }
        },

        removeLinesResults: function removeLinesResults(orderLines, itemsToRemove) {
            return _.filter(orderLines, function filterLines(line) {
                var lineFound = _.find(itemsToRemove, function findLine(item) {
                    return item === line.internalid;
                });
                return !lineFound;
            });
        },

        getMainMonogramItem: function getMainMonogramItem(monogramLine) {
            return _.find(monogramLine, function eachLine(line) {
                return !line.isMonogramAlphabet && !line.isExtraItem;
            });
        },

        getsMonogramAlphabetItems: function getsMonogramAlphabetItems(monogramLine) {
            return _.filter(monogramLine, function eachLine(line) {
                return line.isMonogramAlphabet;
            });
        },

        getExtraItems: function getExtraItems(monogramLine) {
            return _.filter(monogramLine, function eachLine(line) {
                return line.isExtraItem;
            });
        },

        findLineOption: function findLineOption(optionId, line) {
            return _.find(line.options, function find(option) {
                return option.cartOptionId === optionId;
            });
        },

        updateCartLines: function updateCartLines(monogramLines, lines) {
            var self = this;
            var itemsToRemove = [];
            var updatedLines = lines;
            var mainItem;
            var extraItems;
            var monogramSelection;
            var monogramAlphabetSelectionValue;
            var monogramAlphabetItems;
            var serviceFeeId = Configuration.get('extensions.monogram.serviceFeeItem');
            _.each(monogramLines, function eachMonogramLine(monogramLine) {
                var newTotal = 0;
                mainItem = self.getMainMonogramItem(monogramLine);
                monogramAlphabetItems = self.getsMonogramAlphabetItems(monogramLine);
                extraItems = self.getExtraItems(monogramLine);
                if (mainItem) {
                    _.each(monogramAlphabetItems, function eachLine(letter) {
                        newTotal += letter.totalCost;
                        itemsToRemove.push(letter.lineInternalid);
                    });
                    monogramSelection = _.find(lines[mainItem.lineIndex].options, function findUniqueLineOption(option) {
                        return option.cartOptionId === staticValues.itemOptions.alphabetSelection;
                    });
                    if (monogramSelection && monogramSelection.value) {
                        // eslint-disable-next-line max-len
                        monogramAlphabetSelectionValue = monogramSelection.value.label ? monogramSelection.value.label : monogramSelection.value.internalid;
                        lines[mainItem.lineIndex].monogramSelection = monogramAlphabetSelectionValue;
                        lines[mainItem.lineIndex].showMonogram = monogramAlphabetSelectionValue;
                        lines[mainItem.lineIndex].monogramCost = newTotal;
                    }
                    _.each(extraItems, function eachLine(item) {
                        if (parseInt(serviceFeeId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].monogramCost += item.totalCost;
                        }
                        newTotal += item.totalCost;
                        itemsToRemove.push(item.lineInternalid);
                    });
                    nlapiLogExecution('DEBUG', 'newTotal updateCartLines', newTotal);
                    newTotal += mainItem.totalCost;
                    lines[mainItem.lineIndex].monogramCost = Utils.formatCurrency(lines[mainItem.lineIndex].monogramCost);
                    lines[mainItem.lineIndex].aggregatedTotal = Utils.formatCurrency(newTotal);
                }
            });
            updatedLines = this.removeLinesResults(lines, itemsToRemove);
            return updatedLines;
        },

        isMonogramAlphabet: function isMonogramAlphabet(line) {
            var monogramFound = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === staticValues.itemOptions.monogramAlphabet;
            });
            return monogramFound;
        },

        isMainItem: function isExtraItem(line) {
            var extraItemOption = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === staticValues.itemOptions.extraItems;
            });
            var monogramSelectionOption = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === staticValues.itemOptions.alphabetSelection;
            });
            return extraItemOption || monogramSelectionOption;
        },

        createMonogramLine: function createMonogramLine(line, index) {
            var lineValue = {};
            if (line) {
                lineValue.isMonogramAlphabet = this.isMonogramAlphabet(line);
                lineValue.isExtraItem = !lineValue.isMonogramAlphabet && !this.isMainItem(line);
                lineValue.totalCost = line.total;
                lineValue.lineInternalid = line.internalid;
                lineValue.lineIndex = index;
                lineValue.line = line;
            }
            return lineValue;
        },

        getMonogramLines: function getMonogramLines(orderLines) {
            var monogramLines = {};
            var lineId;
            var self = this;
            _.each(orderLines, function eachLine(line, index) {
                var uniqueLineOption = _.find(line.options, function findUniqueLineOption(option) {
                    return option.cartOptionId === staticValues.itemOptions.lineId;
                });
                if (uniqueLineOption && uniqueLineOption.value && uniqueLineOption.value.internalid) {
                    lineId = uniqueLineOption.value.internalid;
                    monogramLines[lineId] = monogramLines[lineId] ? monogramLines[lineId] : [];
                    monogramLines[lineId].push(self.createMonogramLine(line, index));
                }
            });
            return monogramLines;
        },

        removeLinesFromCart: function removeLinesFromCart(itemsToRemove) {
            _.each(itemsToRemove, function eachLine(lineId) {
                // Removes the line
                ModelsInit.order.removeItem(lineId);
            });
        },

        getOrderLines: function getOrderLines(orderFields) {
            var lines = [];
            var itemsToPreload = [];
            if (orderFields.items && orderFields.items.length) {
                _.each(orderFields.items, function eachItem(originalLine) {
                    var lineToAdd;
                    // @class LiveOrder.Model.Line represents a line in the LiveOrder
                    lineToAdd = {
                        // @property {String} internalid
                        internalid: originalLine.orderitemid,
                        // @property {Number} quantity
                        quantity: originalLine.quantity,
                        // @property {String} item internal id of the line's item
                        item: originalLine.internalid,
                        // @property {String} itemtype
                        itemtype: originalLine.itemtype,
                        // @property {Array<LiveOrder.Model.Line.Option>} options
                        options: LiveOrderModel.parseLineOptionsFromCommerceAPI(originalLine.options)
                    };
                    lines.push(lineToAdd);
                    itemsToPreload.push({
                        id: originalLine.internalid,
                        type: originalLine.itemtype
                    });
                });
                StoreItem.preloadItems(itemsToPreload);
                lines.forEach(function forEach(line) {
                    line.item = StoreItem.get(line.item, line.itemtype);
                });

                lines = _.filter(lines, function filterLines(line) {
                    return !!line.item;
                });
            }
            return lines;
        },

        updateItemQuantity: function updateItemQuantity(itemLine, lineData, mainItemQty) {
            var line;
            var quantity = lineData.quantity;
            quantity = this.calculateUpdateQuantity(quantity, mainItemQty, itemLine.line.quantity);
            this.removeLinesFromCart([itemLine.lineInternalid]);
            if (!_.isNumber(quantity) || quantity > 0) {
                line = itemLine.line;
                line.quantity = quantity;
                LiveOrderModel.addLine(itemLine.line);
            }
        },

        calculateUpdateQuantity: function calculateUpdateQuantity(quantity, mainItemQty, lineItemQty) {
            var updateQty = quantity;
            if (mainItemQty !== lineItemQty) {
                updateQty = (lineItemQty / mainItemQty) * quantity;
            }
            return updateQty;
        },

        updateMonogramItems: function updateMonogramItems(lineId, lineData) {
            var self = this;
            var orderFields = LiveOrderModel.getFieldValues();
            var orderLines = this.getOrderLines(orderFields);
            var monogramLines = this.getMonogramLines(orderLines);
            _.each(monogramLines, function eachLine(line) {
                var mainItem = self.getMainMonogramItem(line);
                var monogramItems = self.getsMonogramAlphabetItems(line);
                var extraItems = self.getExtraItems(line);
                if (mainItem && mainItem.lineInternalid === lineId) {
                    _.each(monogramItems, function each(monogramItem) {
                        self.updateItemQuantity(monogramItem, lineData, mainItem.line.quantity);
                    });
                    _.each(extraItems, function each(extraLine) {
                        self.updateItemQuantity(extraLine, lineData, mainItem.line.quantity);
                    });
                }
            });
        },

        validateMonogramLines: function validateMonogramLines(monogramLines) {
            var self = this;
            var linesChanged = false;
            var itemsAdded;
            _.each(monogramLines, function eachLine(monogramLine) {
                var mainItem = self.getMainMonogramItem(monogramLine);
                var monogramAlphabetItems = self.getsMonogramAlphabetItems(monogramLine);
                var extraItems = self.getExtraItems(monogramLine);
                var itemsToRemove = [];
                nlapiLogExecution('DEBUG', 'mainItem', JSON.stringify(mainItem));
                nlapiLogExecution('DEBUG', 'monogram', JSON.stringify(monogramAlphabetItems));
                nlapiLogExecution('DEBUG', 'extraItems', JSON.stringify(extraItems));
                if (mainItem) {
                    itemsAdded = self.validateCustomizedItemsInCart(mainItem, monogramAlphabetItems, extraItems);
                    if (!linesChanged && itemsAdded) {
                        linesChanged = itemsAdded;
                    }
                } else {
                    _.each(monogramAlphabetItems, function eachMonogramLine(line) {
                        itemsToRemove.push(line.lineInternalid);
                    });
                    _.each(extraItems, function eachMonogramLine(extraItem) {
                        itemsToRemove.push(extraItem.lineInternalid);
                    });
                    self.removeLinesFromCart(itemsToRemove);
                    linesChanged = true;
                }
            });
            return linesChanged;
        },

        validateCustomizedItemsInCart: function validateCustomizedItemsInCart(mainItem, monogramAlphabetItems, extraItems) {
            var self = this;
            var monogramItems = {};
            var quantity;
            var itemsSelection = this.getsMonogramAlphabetSelection(mainItem.line);
            var extraItemsSelection = this.getExtraItemSelection(mainItem.line);
            var lineIdentifier = this.getLineIdentifier(mainItem.line);
            var linesChanged = false;
            quantity = mainItem.line.quantity;
            if (itemsSelection && itemsSelection.value && itemsSelection.value.internalid) {
                itemsSelection = itemsSelection.value.internalid.split('-');
                _.each(monogramAlphabetItems, function eachMonogramLine(monogramLine) {
                    var monogram = monogramLine.isMonogramAlphabet.value ? monogramLine.isMonogramAlphabet.value.internalid : '';
                    var lineQty = monogramLine.line.quantity;
                    if (monogram && !monogramItems[monogram]) {
                        monogramItems[monogram] = {
                            monogram: monogram,
                            lineQty: lineQty,
                            lineInternalid: monogramLine.lineInternalid
                        };
                    } else if (monogram && monogramItems[monogram]) {
                        self.removeLinesFromCart([monogram.lineInternalid]);
                    }
                });
                _.each(itemsSelection, function eachCartMonogramItems(itemSelected) {
                    var monogram = itemSelected.split('_')[1];
                    var monogramLine = _.find(monogramItems, function find(line) {
                        return parseInt(monogram, 10) === parseInt(line.monogram, 10);
                    });
                    if (monogramLine) {
                        monogramItems[monogramLine.monogram].lineQty -= quantity;
                    }
                });
                _.each(monogramItems, function eachMonogramItems(line) {
                    if (line && line.lineQty > 0) {
                        self.removeLinesFromCart([line.lineInternalid]);
                    }
                });
                _.each(itemsSelection, function eachCartMonogramItems(itemSelected) {
                    var itemId = itemSelected.split('_')[0];
                    var newLineQuantity = 0;
                    var addToCart = false;
                    var monogram = itemSelected.split('_')[1];
                    var monogramLine = _.find(monogramItems, function find(line) {
                        return parseInt(monogram, 10) === parseInt(line.monogram, 10);
                    });
                    // if there are more monogram than selected remove and add to cart the correct qty (update qty does not work)
                    if (monogramLine && monogramLine.lineQty > 0) {
                        newLineQuantity = quantity;
                        addToCart = true;
                        // if there are missing monogram items add the remaining onces
                    } else if (monogramLine && monogramLine.lineQty < 0) {
                        newLineQuantity = quantity + monogramLine.lineQty;
                        addToCart = true;
                        // if monogram is missing, add the missing item to the cart
                    } else if (!monogramLine) {
                        newLineQuantity = quantity;
                        addToCart = true;
                    }
                    if (addToCart) {
                        linesChanged = true;
                        self.addItemToCart(itemId, monogram, lineIdentifier.value.internalid, {
                            quantity: newLineQuantity
                        });
                    }
                });
            }
            if (extraItemsSelection && extraItemsSelection.value && extraItemsSelection.value.internalid) {
                itemsSelection = extraItemsSelection.value.internalid.split('-');
                _.each(itemsSelection, function eachCartMonogramItems(itemSelected) {
                    var addToCart = false;
                    var extraItemLine = _.find(extraItems, function find(line) {
                        return parseInt(itemSelected, 10) === parseInt(line.line.item.internalid, 10);
                    });
                    // if there are different items than selected remove and add to cart the correct qty (update qty does not work)
                    if (extraItemLine && extraItemLine.line.quantity !== quantity) {
                        self.removeLinesFromCart([extraItemLine.lineInternalid]);
                        addToCart = true;
                        // if extra item is missing, add the missing item to the cart
                    } else if (!extraItemLine) {
                        addToCart = true;
                    }
                    if (addToCart) {
                        linesChanged = true;
                        nlapiLogExecution('DEBUG', 'itemSelected', itemSelected);
                        self.addItemToCart(itemSelected, false, lineIdentifier.value.internalid, {
                            quantity: quantity
                        });
                    }
                });
            }
            return linesChanged;
        },

        getLineIdentifier: function getLineIdentifier(line) {
            var lineIdentifier = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === staticValues.itemOptions.lineId;
            });
            return lineIdentifier;
        },

        getsMonogramAlphabetSelection: function getsMonogramAlphabetSelection(line) {
            var itemsSelection = _.find(line.options, function findMonogramItemsItemOption(option) {
                return option.cartOptionId === staticValues.itemOptions.alphabetSelectionItems;
            });
            return itemsSelection;
        },

        getExtraItemSelection: function getExtraItemSelection(line) {
            var itemsSelection = _.find(line.options, function findMonogramItemsItemOption(option) {
                return option.cartOptionId === staticValues.itemOptions.extraItems;
            });
            return itemsSelection;
        },

        getOrderSummary: function getOrderSummary(orderFields) {
            var summary = orderFields.summary;
            if (summary) {
                summary.discountrate = Utils.toCurrency(summary.discountrate);
                summary.discounttotal_formatted = Utils.formatCurrency(
                    summary.discounttotal
                );
                summary.taxonshipping_formatted = Utils.formatCurrency(
                    summary.taxonshipping
                );
                summary.taxondiscount_formatted = Utils.formatCurrency(
                    summary.taxondiscount
                );
                summary.taxonhandling_formatted = Utils.formatCurrency(
                    summary.taxonhandling
                );
                summary.discountedsubtotal_formatted = Utils.formatCurrency(
                    summary.discountedsubtotal
                );
                summary.handlingcost_formatted = Utils.formatCurrency(
                    summary.handlingcost
                );
                summary.taxtotal_formatted = Utils.formatCurrency(summary.taxtotal);
                summary.giftcertapplied_formatted = Utils.formatCurrency(
                    summary.giftcertapplied
                );
                summary.shippingcost_formatted = Utils.formatCurrency(
                    summary.shippingcost
                );
                summary.tax2total_formatted = Utils.formatCurrency(summary.tax2total);
                summary.discountrate_formatted = Utils.formatCurrency(
                    summary.discountrate
                );
                summary.estimatedshipping_formatted = Utils.formatCurrency(
                    summary.estimatedshipping
                );
                summary.total_formatted = Utils.formatCurrency(summary.total);
                summary.subtotal_formatted = Utils.formatCurrency(summary.subtotal);
            }
            return summary;
        },

        validateShippingMethod: function validateShippingMethod(response) {
            var acceptedShippingMethods = Configuration.get('extensions.monogram.acceptedShippingMethods');
            var currentShippingMethod = response.shipmethod;
            var shipMethodFound;
            if (acceptedShippingMethods && currentShippingMethod) {
                shipMethodFound = parseInt(acceptedShippingMethods, 10) === parseInt(currentShippingMethod, 10);
                if (!shipMethodFound) {
                    ModelsInit.order.removeShippingMethod();
                }
            }
            return !shipMethodFound;
        }
    };
});
