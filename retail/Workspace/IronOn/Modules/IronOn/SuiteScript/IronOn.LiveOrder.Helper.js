/* eslint-disable max-len */
define('IronOn.LiveOrder.Helper', [
    'LiveOrder.Model',
    'Configuration',
    'SC.Models.Init',
    'StoreItem.Model',
    'underscore',
    'Utils'
], function IronOnLiveOrderHelper(
    LiveOrderModel,
    Configuration,
    ModelsInit,
    StoreItem,
    _,
    Utils
) {
    'use strict';

    return {

        /**
         * @method addItemToCart adds an item to the cart
         * @param {*} itemId internalid of the item
         * @param {*} troopNumeral internalid of the troopNumeral option
         * @param {*} lineIdentifier unique line identifier option
         * @param {*} lineData original item data
         */
        addItemToCart: function addItemToCart(itemId, troopNumeral, lineIdentifier, lineData) {
            var lineId;
            var item;
            var options = {};
            if (troopNumeral) {
                options[Configuration.get('extensions.ironon.troopNumeralItemOption')] = troopNumeral;
            }
            options[Configuration.get('extensions.ironon.lineIdItemOption')] = lineIdentifier;
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

        /**
         * @method removeLinesResults Removes the items type TroopNumeral from the shopping cart results
         * @param {[object]} orderLines cart lines
         * @param {[int]} itemsToRemove array of internalid of the line
         */
        removeLinesResults: function removeLinesResults(orderLines, itemsToRemove) {
            return _.filter(orderLines, function filterLines(line) {
                var lineFound = _.find(itemsToRemove, function findLine(costItem) {
                    return costItem === line.internalid;
                });
                return !lineFound;
            });
        },

        getMainIronOnItem: function getMainIronOnItem(ironOnLine) {
            return _.find(ironOnLine, function eachLine(line) {
                return !line.isTroopNumeral && !line.isExtraItem;
            });
        },

        getTroopNumeralItems: function getTroopNumeralItems(ironOnLine) {
            return _.filter(ironOnLine, function eachLine(line) {
                return line.isTroopNumeral;
            });
        },

        getExtraItems: function getExtraItems(ironOnLine) {
            return _.filter(ironOnLine, function eachLine(line) {
                return line.isExtraItem;
            });
        },

        findLineOption: function findLineOption(optionId, line) {
            return _.find(line.options, function find(option) {
                return option.cartOptionId === optionId;
            });
        },

        /**
         * @method updateCartLines the cart lines it removes the troopNumeral iron on item and add the values to the corresponding vest item
         * @param {object} ironOnLines
         * @param {object} lines
         */
        updateCartLines: function updateCartLines(ironOnLines, lines) {
            var self = this;
            var itemsToRemove = [];
            var updatedLines = lines;
            var mainItem;
            var troopNumeralItem;
            var extraItems;
            var troopNumeralSelection;
            var troopNumeralSelectionValue;
            var troopCrestItems = Configuration.get('extensions.ironon.troopCrestPatches');
            var serviceFeeField = Configuration.get('extensions.ironon.serviceFeeField');
            var trefoilPinItemId = Configuration.get('extensions.ironon.trefoilPin');
            var flagItemId = Configuration.get('extensions.ironon.flagPatchItem');
            var serviceFeeId;
            var membershipPinId;
            var insigniaPinId;
            _.each(ironOnLines, function eachIronOnItem(ironOnLine) {
                var newTotal = 0;
                mainItem = self.getMainIronOnItem(ironOnLine);
                troopNumeralItem = self.getTroopNumeralItems(ironOnLine);
                extraItems = self.getExtraItems(ironOnLine);
                if (mainItem) {
                    serviceFeeId = mainItem.line.item[serviceFeeField];
                    membershipPinId = mainItem.line.item.custitem_acs_membership_pin_item_id;
                    insigniaPinId = mainItem.line.item.custitem_acs_insignia_tab_id;
                    _.each(troopNumeralItem, function eachLine(troopNumeral) {
                        newTotal += troopNumeral.totalCost;
                        itemsToRemove.push(troopNumeral.lineInternalid);
                    });
                    troopNumeralSelection = _.find(lines[mainItem.lineIndex].options, function findUniqueLineOption(option) {
                        return option.cartOptionId === Configuration.get('extensions.ironon.troopNumeralSelectionItemOption');
                    });
                    if (troopNumeralSelection && troopNumeralSelection.value) {
                        // eslint-disable-next-line max-len
                        troopNumeralSelectionValue = troopNumeralSelection.value.label ? troopNumeralSelection.value.label : troopNumeralSelection.value.internalid;
                        lines[mainItem.lineIndex].troopNumeralSelection = troopNumeralSelectionValue;
                        lines[mainItem.lineIndex].showTroopNumeral = troopNumeralSelectionValue;
                        lines[mainItem.lineIndex].troopNumeralCost = Utils.formatCurrency(newTotal);
                    }
                    _.each(extraItems, function eachLine(item) {
                        var councilOption = self.findLineOption('custcol_council', item.line);
                        var isTroopCrest = _.find(troopCrestItems, function findTroopCrestItems(troopCrestId) {
                            return parseInt(troopCrestId, 10) === parseInt(item.line.item.internalid, 10);
                        });
                        if (parseInt(serviceFeeId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].serviceFee = Utils.formatCurrency(item.totalCost);
                        }
                        if (parseInt(flagItemId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].flagFee = Utils.formatCurrency(item.totalCost);
                            lines[mainItem.lineIndex].flag = true;
                        }
                        if (parseInt(trefoilPinItemId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].trefoilFee = Utils.formatCurrency(item.totalCost);
                            lines[mainItem.lineIndex].trefoilName = item.line.item.matrix_parent.storedisplayname2;
                        }
                        if (parseInt(membershipPinId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].membershipPinFee = Utils.formatCurrency(item.totalCost);
                            lines[mainItem.lineIndex].membershipPinName = item.line.item.storedisplayname2;
                        }
                        if (parseInt(insigniaPinId, 10) === parseInt(item.line.item.internalid, 10)) {
                            lines[mainItem.lineIndex].insigniaPinFee = Utils.formatCurrency(item.totalCost);
                            lines[mainItem.lineIndex].insigniaPinName = item.line.item.storedisplayname2;
                        }
                        if (isTroopCrest) {
                            lines[mainItem.lineIndex].troopCrestFee = Utils.formatCurrency(item.totalCost);
                            lines[mainItem.lineIndex].troopCrestName = item.line.item.storedisplayname2;
                        }
                        newTotal += item.totalCost;
                        itemsToRemove.push(item.lineInternalid);
                        if (councilOption) {
                            lines[mainItem.lineIndex].council = councilOption.value.label;
                            lines[mainItem.lineIndex].councilCost = Utils.formatCurrency(item.totalCost);
                        }
                    });
                    nlapiLogExecution('DEBUG', 'newTotal updateCartLines', newTotal);
                    newTotal += mainItem.totalCost;
                    lines[mainItem.lineIndex].aggregatedTotal = Utils.formatCurrency(newTotal);
                }
            });
            updatedLines = this.removeLinesResults(lines, itemsToRemove);
            return updatedLines;
        },

        /**
         * @method isTroopNumeral identifies if an item is type troop numeral by the option
         * @param {obj} line
         */
        isTroopNumeral: function isTroopNumeral(line) {
            var troopNumeralFound = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.troopNumeralItemOption');
            });
            return troopNumeralFound;
        },

        isMainItem: function isExtraItem(line) {
            var extraItemOption = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.extraItemsOptions');
            });
            var numeralSelectionOption = _.find(line.options, function findUniqueLineOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.troopNumeralSelectionItemOption');
            });
            return extraItemOption || numeralSelectionOption;
        },

        /**
         * @method createIronOnLine Creates a PersonalizationLine object from a cart line
         * @param {object} line
         * @returns {PersonalizationLine}
         */
        createIronOnLine: function createIronOnLine(line, index) {
            var lineValue = {};
            if (line) {
                lineValue.isTroopNumeral = this.isTroopNumeral(line);
                lineValue.isExtraItem = !lineValue.isTroopNumeral && !this.isMainItem(line);
                lineValue.totalCost = line.total;
                lineValue.lineInternalid = line.internalid;
                lineValue.lineIndex = index;
                lineValue.line = line;
            }
            return lineValue;
        },

        /**
         * @method getIronInLines Given the lines of the sales order returns all items used for the personalization feature grouped by a unique line id
         * @param {*} orderLines
         * @returns {[lineId : [PersonalizationLine]]}
         */
        getIronInLines: function getIronInLines(orderLines) {
            var ironOnLines = {};
            var lineId;
            var self = this;
            _.each(orderLines, function eachLine(line, index) {
                var uniqueLineOption = _.find(line.options, function findUniqueLineOption(option) {
                    return option.cartOptionId === Configuration.get('extensions.ironon.lineIdItemOption');
                });
                if (uniqueLineOption && uniqueLineOption.value && uniqueLineOption.value.internalid) {
                    lineId = uniqueLineOption.value.internalid;
                    ironOnLines[lineId] = ironOnLines[lineId] ? ironOnLines[lineId] : [];
                    ironOnLines[lineId].push(self.createIronOnLine(line, index));
                }
            });
            return ironOnLines;
        },

        /**
         * @method removeLinesFromCart Given a list of lines id, it remove them from the shopping cart
         * @param {[int]} itemsToRemove
         */
        removeLinesFromCart: function removeLinesFromCart(itemsToRemove) {
            _.each(itemsToRemove, function eachLine(lineId) {
                // Removes the line
                ModelsInit.order.removeItem(lineId);
            });
        },

        /**
         * @method getOrderLines Returns the order fields lines
         * @param {object} orderFields
         */
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

        /**
         * Calculate the new qty of the troop numeral item based on the initial qty
         * @param {int} quantity
         * @param {int} mainItemQty
         * @param {int} lineItemQty
         */
        calculateUpdateQuantity: function calculateUpdateQuantity(quantity, mainItemQty, lineItemQty) {
            var updateQty = quantity;
            if (mainItemQty !== lineItemQty) {
                updateQty = (lineItemQty / mainItemQty) * quantity;
            }
            return updateQty;
        },

        /**
         * wrap the updateLine function in order to update the amount of iron on item to the same amount of items wanted
         * if the item to be updated is a iron on vest item
         */
        updateIronOnItems: function updateIronOnItems(lineId, lineData) {
            var self = this;
            var orderFields = LiveOrderModel.getFieldValues();
            var orderLines = this.getOrderLines(orderFields);
            var ironOnLines = this.getIronInLines(orderLines);
            _.each(ironOnLines, function eachLine(ironOnLine) {
                var mainItem = self.getMainIronOnItem(ironOnLine);
                var troopNumeralItem = self.getTroopNumeralItems(ironOnLine);
                var extraItems = self.getExtraItems(ironOnLine);
                if (mainItem && mainItem.lineInternalid === lineId) {
                    _.each(troopNumeralItem, function each(troopNumeral) {
                        self.updateItemQuantity(troopNumeral, lineData, mainItem.line.quantity);
                    });
                    _.each(extraItems, function each(extraLine) {
                        self.updateItemQuantity(extraLine, lineData, mainItem.line.quantity);
                    });
                }
            });
        },

        /**
         * Review the cart lines and validates if iron on lines are correct
         * If iron on main item is missing troop numerals, troop numerals are added to the cart
         * If troop numeral does not have a main item, is removed from the cart
         */
        validateIronOnLines: function validateIronOnLines(orderLines, ironOnLines) {
            var self = this;
            var linesChanged = false;
            var itemsAdded;
            _.each(ironOnLines, function eachLine(ironOnLine) {
                var mainItem = self.getMainIronOnItem(ironOnLine);
                var troopNumeralItem = self.getTroopNumeralItems(ironOnLine);
                var extraItems = self.getExtraItems(ironOnLine);
                var itemsToRemove = [];
                nlapiLogExecution('DEBUG', 'mainItem', JSON.stringify(mainItem));
                nlapiLogExecution('DEBUG', 'troopNumeralItem', JSON.stringify(troopNumeralItem));
                nlapiLogExecution('DEBUG', 'extraItems', JSON.stringify(extraItems));
                if (mainItem) {
                    itemsAdded = self.validateCustomizedItemsInCart(mainItem, troopNumeralItem, extraItems);
                    if (!linesChanged && itemsAdded) {
                        linesChanged = itemsAdded;
                    }
                } else {
                    // if no customized item was found and only troop numerals remove from cart
                    _.each(troopNumeralItem, function eachIronOnLine(troopNumeral) {
                        itemsToRemove.push(troopNumeral.lineInternalid);
                    });
                    _.each(extraItems, function eachIronOnLine(extraItem) {
                        itemsToRemove.push(extraItem.lineInternalid);
                    });
                    self.removeLinesFromCart(itemsToRemove);
                    linesChanged = true;
                }
            });
            return linesChanged;
        },

        validateCustomizedItemsInCart: function validateCustomizedItemsInCart(mainItem, troopNumeralItem, extraItems) {
            var self = this;
            var troopNumeralItems = {};
            var quantity;
            var itemsSelection = this.getTroopNumeralSelection(mainItem.line);
            var extraItemsSelection = this.getExtraItemSelection(mainItem.line);
            var lineIdentifier = this.getLineIdentifier(mainItem.line);
            var linesChanged = false;
            quantity = mainItem.line.quantity;
            if (itemsSelection && itemsSelection.value && itemsSelection.value.internalid) {
                itemsSelection = itemsSelection.value.internalid.split('-');
                _.each(troopNumeralItem, function eachIronOnLine(troopNumeralLine) {
                    var troopNumeral = troopNumeralLine.isTroopNumeral.value ? troopNumeralLine.isTroopNumeral.value.internalid : '';
                    var lineQty = troopNumeralLine.line.quantity;
                    if (troopNumeral && !troopNumeralItems[troopNumeral]) {
                        troopNumeralItems[troopNumeral] = {
                            troopNumeral: troopNumeral,
                            lineQty: lineQty,
                            lineInternalid: troopNumeralLine.lineInternalid
                        };
                    } else if (troopNumeral && troopNumeralItems[troopNumeral]) {
                        self.removeLinesFromCart([troopNumeralLine.lineInternalid]);
                    }
                });
                _.each(itemsSelection, function eachCartTroopNumeralsItems(itemSelected) {
                    var troopNumeral = itemSelected.split('_')[1];
                    var troopNumeralLine = _.find(troopNumeralItems, function find(line) {
                        return parseInt(troopNumeral, 10) === parseInt(line.troopNumeral, 10);
                    });
                    if (troopNumeralLine) {
                        troopNumeralItems[troopNumeralLine.troopNumeral].lineQty -= quantity;
                    }
                });
                _.each(troopNumeralItems, function eachTroopNumeralItems(troopNumeralLine) {
                    if (troopNumeralLine && troopNumeralLine.lineQty > 0) {
                        self.removeLinesFromCart([troopNumeralLine.lineInternalid]);
                    }
                });
                _.each(itemsSelection, function eachCartTroopNumeralsItems(itemSelected) {
                    var itemId = itemSelected.split('_')[0];
                    var newLineQuantity = 0;
                    var addToCart = false;
                    var troopNumeral = itemSelected.split('_')[1];
                    var troopNumeralLine = _.find(troopNumeralItems, function find(line) {
                        return parseInt(troopNumeral, 10) === parseInt(line.troopNumeral, 10);
                    });
                    // if there are more troop numerals than selected remove and add to cart the correct qty (update qty does not work)
                    if (troopNumeralLine && troopNumeralLine.lineQty > 0) {
                        newLineQuantity = quantity;
                        addToCart = true;
                        // if there are missing troop numerals items add the remaining onces
                    } else if (troopNumeralLine && troopNumeralLine.lineQty < 0) {
                        newLineQuantity = quantity + troopNumeralLine.lineQty;
                        addToCart = true;
                        // if troop numeral is missing, add the missing item to the cart
                    } else if (!troopNumeralLine) {
                        newLineQuantity = quantity;
                        addToCart = true;
                    }
                    if (addToCart) {
                        linesChanged = true;
                        self.addItemToCart(itemId, troopNumeral, lineIdentifier.value.internalid, {
                            quantity: newLineQuantity
                        });
                    }
                });
            }
            if (extraItemsSelection && extraItemsSelection.value && extraItemsSelection.value.internalid) {
                itemsSelection = extraItemsSelection.value.internalid.split('-');
                _.each(itemsSelection, function eachCartTroopNumeralsItems(itemSelected) {
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
                return option.cartOptionId === Configuration.get('extensions.ironon.lineIdItemOption');
            });
            return lineIdentifier;
        },

        getTroopNumeralSelection: function getTroopNumeralSelection(line) {
            var itemsSelection = _.find(line.options, function findTroopNumeralItemsItemOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.troopNumeralItemsItemOption');
            });
            return itemsSelection;
        },

        getExtraItemSelection: function getExtraItemSelection(line) {
            var itemsSelection = _.find(line.options, function findTroopNumeralItemsItemOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.extraItemsOptions');
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
            var acceptedShippingMethods = Configuration.get('extensions.ironon.acceptedShippingMethods');
            var currentShippingMethod = response.shipmethod;
            var shipMethodFound;
            if (acceptedShippingMethods && currentShippingMethod) {
                shipMethodFound = parseInt(acceptedShippingMethods, 10) === parseInt(currentShippingMethod, 10);
                if (!shipMethodFound) {
                    ModelsInit.order.removeShippingMethod();
                }
            }
            return !shipMethodFound;
        },

        validateAddToCart: function validateAddToCart(lineData) {
            var lineIdentifier = _.find(lineData.options, function findUniqueLineOption(option) {
                return option.cartOptionId === Configuration.get('extensions.ironon.lineIdItemOption');
            });
            var allOptionsPresent = true;
            var extraItemsOption;
            var councilOptions;
            if (lineIdentifier && lineIdentifier.value && lineIdentifier.value.internalid) {
                extraItemsOption = _.find(lineData.options, function findUniqueLineOption(option) {
                    return option.cartOptionId === Configuration.get('extensions.ironon.extraItemsOptions');
                });
                councilOptions = _.find(lineData.options, function findUniqueLineOption(option) {
                    return option.cartOptionId === 'custcol_acs_council_text';
                });
                if (lineIdentifier.value.internalid === '.' ||
                !extraItemsOption || !extraItemsOption.value || !extraItemsOption.value.internalid || extraItemsOption.value.internalid === '.' ||
                !councilOptions || !councilOptions.value || !councilOptions.value.internalid || councilOptions.value.internalid === '.') {
                    allOptionsPresent = false;
                }
            }
            return allOptionsPresent;
        }
    };
});
