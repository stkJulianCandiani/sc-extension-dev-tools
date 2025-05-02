/* eslint-disable max-len */
/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.View', [
    'IronOn.TroopNumerals.View',
    'IronOn.PatchesAndPinsView',
    'IronOn.ItemPrice',
    'ProductViews.Option.View',
    'IronOn.Item.Model',
    'ironon.tpl',
    'Backbone',
    'Backbone.CollectionView',
    'jQuery',
    'underscore',
    'Utils'
], function IronOnView(
    IronOnTroopNumeralsView,
    PatchesAndPinsView,
    IronOnItemPrice,
    ProductViewsOptionView,
    IronOnItemModel,
    irononTpl,
    Backbone,
    BackboneCollectionView,
    jQuery,
    _,
    Utils
) {
    'use strict';

    // @class ACS.IronOn.IronOn.View @extends Backbone.View
    return Backbone.View.extend({

        template: irononTpl,

        events: {
            'click [data-action="remove-troop-numerals"]': 'removeTroopNumeral',
            'click [data-action="add-troop-numerals"]': 'addTroopNumeral',
            'change [data-action="troop-numeral"]': 'changeTroopNumeral',
            'click [data-action="remove-customization"]': 'removeCustomization',
            'click [data-action="show-customization"]': 'showCustomization',
            'change [data-toggle="select-option"]': 'setItemOptions',
            'change [name="custcol_acs_council_text"]': 'setCustomizationOptions',
            'click [data-action="add-all-insignia"]': 'addAllInsignia'
        },

        initialize: function initialize(options) {
            // var self = this;
            this.pdp = options.container.getComponent('PDP');
            this.collection = ['', '', '', '', ''];
            this.patchesAndPins = [];
            this.patchesPinsToAdd = [];
            this.container = options.container;
            this.configuration = this.container.getComponent('Environment').getConfig('extensions').ironon;
            this.ironOnItem = new IronOnItemModel({
                container: this.container
            });
            this.removeCustomizationOptions();
            this.once('afterCompositeViewRender', this.loadTroopNumeralItem, this);
          /*  this.on('afterViewRender', function afterViewRender() {
                var mobileRow = self.$el.find('.ironon-feature-numerals-row-mobile');
                if (self.collection.length > 5) {
                    jQuery(mobileRow).show();
                } else {
                    jQuery(mobileRow).hide();
                }
            });*/

            this.onAfterQuantityChangeFn = _.bind(this.onAfterQuantityChange, this);

            this.pdp.on('afterQuantityChange', this.onAfterQuantityChangeFn);
        },

        onAfterQuantityChange: function onAfterQuantityChange() {
            var item = this.contextData.item();
            var showIronOn = item.custitem_acs_iron_on_enabled;
            if (showIronOn) {
                if (this.showCustomizationOptions) {
                    this.setCustomizationOptions();
                } else {
                    this.removeCustomizationOptions();
                }
            }
        },

        destroy: function destroy() {
            this.pdp.off('afterQuantityChange', this.onAfterQuantityChangeFn);
        },

        loadTroopNumeralItem: function loadTroopNumeralItem() {
            var self = this;
            var item = this.contextData.item();
            var troopNumeralItemId = item[this.configuration.troopNumeralField];
            var councilItemId = item.custitem_acs_council_patch_item_id;
            var patchItem = this.configuration.flagPatchItem;
            var serviceItem = item[this.configuration.serviceFeeField];
            var insigniaPinId = item.custitem_acs_insignia_tab_id;
            var membershipPinId = item.custitem_acs_membership_pin_item_id;
            var TrefoilPinId = parseInt(this.configuration.trefoilPinParent, 10);
            var troopCrestIds = this.configuration.troopCrestPatches;
            var data = troopNumeralItemId + ',' + councilItemId + ',' + patchItem + ',' + serviceItem + ',' + troopCrestIds.toString();
            var patchesAndPins = [];
            var troopCrestItems;
            patchesAndPins.push(parseInt(patchItem, 10));
            if (insigniaPinId) {
                data += ',' + insigniaPinId;
                patchesAndPins.push(insigniaPinId);
            }
            if (membershipPinId) {
                data += ',' + membershipPinId;
                patchesAndPins.push(membershipPinId);
            }
            if (TrefoilPinId) {
                data += ',' + TrefoilPinId;
                patchesAndPins.push(TrefoilPinId);
            }
            if (troopNumeralItemId && councilItemId && serviceItem) {
                this.ironOnItem.fetch({
                    data: {
                        id: data
                    }
                }).then(function then(ironOnItems) {
                    self.councilItem = _.find(ironOnItems.items, function findCouncil(ironOnItem) {
                        return ironOnItem.internalid === councilItemId;
                    });
                    self.troopNumeralItem = _.find(ironOnItems.items, function findCouncil(ironOnItem) {
                        return ironOnItem.internalid === troopNumeralItemId;
                    });
                    self.patchItem = _.find(ironOnItems.items, function findCouncil(ironOnItem) {
                        return ironOnItem.internalid === parseInt(patchItem, 10);
                    });
                    self.serviceItem = _.find(ironOnItems.items, function findCouncil(ironOnItem) {
                        return ironOnItem.internalid === parseInt(serviceItem, 10);
                    });
                    self.extraItems = ironOnItems.items;
                    self.patchesAndPins = _.filter(ironOnItems.items, function findPatchesAndPins(ironOnItem) {
                        return _(patchesAndPins).contains(ironOnItem.internalid);
                    });
                    self.patchesAndPins = _.sortBy(self.patchesAndPins, function (a, b) {
                        return patchesAndPins.indexOf(a.internalid) - patchesAndPins.indexOf(b.internalid);
                    });
                    troopCrestItems = _.filter(ironOnItems.items, function findPatchesAndPins(ironOnItem) {
                        return _(troopCrestIds).contains(ironOnItem.internalid.toString());
                    });
                    troopCrestItems = _.sortBy(troopCrestItems, function sortTroopCrest(tcItem) {
                        return tcItem.storedisplayname2;
                    });
                    self.patchesAndPins.splice(1, 0, { isTroopCrest: true, showTroopCrest: item.custitem_acs_enable_troop_crest, troopCrestItems: troopCrestItems });
                    self.render();
                });
            }
        },

        contextDataRequest: ['item'],

        changeTroopNumeral: function changeTroopNumeral(e) {
            var value = jQuery(e.target).val();
            var index = parseInt(jQuery(e.target).attr('data-index'), 10);
            var item = parseInt(e.target.options[e.target.selectedIndex].dataset.item, 10);
            var label = e.target.options[e.target.selectedIndex].dataset.label;
            if (value) {
                this.collection[index] = {
                    value: value,
                    item: item,
                    label: label
                };
            } else {
                this.collection[index] = '';
            }
            this.setCustomizationOptions();
        },

        getTroopNumeralPrice: function getTroopNumeralPrice() {
            var price = 0;
            if (this.troopNumeralItem) {
                price = this.troopNumeralItem.onlinecustomerprice;
            }
            return price;
        },

        getExtraItemsCost: function getExtraItemsCost(extraItems) {
            var cost = 0;
            var self = this;
            var extraItemsIds = extraItems.split('-');
            if (this.missingItemOptionsSelection(extraItems)) {
                _.each(extraItemsIds, function eachExtraItem(extraItem) {
                    var matrixCost;
                    var itemValues = _.find(self.extraItems, function findExtraItem(item) {
                        var found;
                        var selectedCouncilOption = _.find(item.itemoptions_detail.fields, function findCouncil(options) {
                            return options.internalid === 'custcol_council';
                        });
                        if (selectedCouncilOption) {
                            found = _.find(item.matrixchilditems_detail, function findCouncil(councilItem) {
                                return parseInt(councilItem.internalid, 10) === parseInt(extraItem, 10);
                            });
                        } else {
                            found = parseInt(item.internalid, 10) === parseInt(extraItem, 10);
                        }
                        return found;
                    });
                    if (itemValues) {
                        cost += itemValues.onlinecustomerprice_detail.onlinecustomerprice;
                    } else {
                        _.each(self.extraItems, function finMatrix(item) {
                            if (item.matrixchilditems_detail && item.matrixchilditems_detail.length > 0) {
                                _.each(item.matrixchilditems_detail, function findMatrix(child) {
                                    if (parseInt(child.internalid, 10) === parseInt(extraItem, 10)) {
                                        matrixCost = child.onlinecustomerprice_detail.onlinecustomerprice;
                                    }
                                });
                            }
                        });
                        if (matrixCost) {
                            cost += matrixCost;
                        }
                    }
                });
            }
            return cost;
        },

        getNumeralCost: function getTroopNumeralPrice() {
            var numeralCost = 0;
            var numeralPrice = this.getTroopNumeralPrice();
            var extraItems;
            if (this.hasNumeralSelection()) {
                numeralCost = this.collection.length * numeralPrice;
            }
            if (this.extraItems) {
                extraItems = this.getExtraItemsToAdd();
                if (this.extraItems) {
                    numeralCost += this.getExtraItemsCost(extraItems);
                }
            }
            numeralCost = numeralCost ? numeralCost.toString() : numeralCost;
            return numeralCost;
        },

        getBackOrderItems: function getBackOrderItems() {
            var extraItems;
            var self = this;
            var pdp = this.container.getComponent('PDP');
            var item = pdp.getItemInfo();
            var quantity = item.quantity;
            var numeralSelection = [];
            var hasOutOfStockItems;
            var extraItemsIds;
            var layout = this.container.getComponent('Layout');
            if (this.hasNumeralSelection()) {
                _.each(this.collection, function eachNumeral(numeral) {
                    var numeralFound = false;
                    numeralSelection = _.map(numeralSelection, function mapNumeral(selected) {
                        if (selected.item === numeral) {
                            selected.quantity += 1;
                            numeralFound = true;
                        }
                        return selected;
                    });
                    if (!numeralFound) {
                        numeralSelection.push({
                            item: numeral,
                            quantity: 1
                        });
                    }
                });
                _.each(numeralSelection, function eachNumeral(numeral) {
                    _.each(self.troopNumeralItem.matrixchilditems_detail, function childNumerals(childNumeral) {
                        var sameItem = parseInt(childNumeral.internalid, 10) === parseInt(numeral.item, 10);
                        var lessQtyAvailable = childNumeral.quantityavailable < (quantity * numeral.quantity);
                        if (sameItem && lessQtyAvailable) {
                            hasOutOfStockItems = true;
                        }
                    });
                });
            }
            if (this.extraItems) {
                extraItems = this.getExtraItemsToAdd();
                if (this.extraItems) {
                    extraItemsIds = extraItems.split('-');
                    if (this.missingItemOptionsSelection(extraItems)) {
                        _.each(extraItemsIds, function eachExtraItem(extraItemId) {
                            var quantityavailable;
                            var itemValues = _.find(self.extraItems, function findExtraItem(extraItem) {
                                var found;
                                var selectedCouncilOption = _.find(extraItem.itemoptions_detail.fields, function findCouncil(options) {
                                    return options.internalid === 'custcol_council';
                                });
                                if (selectedCouncilOption) {
                                    found = _.find(extraItem.matrixchilditems_detail, function findCouncil(councilItem) {
                                        return parseInt(councilItem.internalid, 10) === parseInt(extraItemId, 10);
                                    });
                                    quantityavailable = found ? found.quantityavailable : null;
                                } else {
                                    found = parseInt(extraItem.internalid, 10) === parseInt(extraItemId, 10);
                                    quantityavailable = extraItem.quantityavailable;
                                }
                                return found;
                            });
                            if (itemValues && quantityavailable) {
                                if (quantityavailable < quantity) {
                                    hasOutOfStockItems = true;
                                }
                            }
                        });
                    }
                }
            }
            jQuery("[data-view='Troop.Numerals.BackOrderMessage']").html('');
            if (hasOutOfStockItems) {
                layout.showMessage({
                    message: Utils.translate('At least one of the selected items is on Backorder.'),
                    type: 'warning',
                    selector: 'Troop.Numerals.BackOrderMessage'
                });
            }
        },

        removeCustomizationOptions: function removeCustomizationOptions() {
            var options = this.getIronOnOptions();
            var self = this;
            this.patchesPinsToAdd = [];
            this.clearOptionValue(this.configuration.troopNumeralSelectionItemOption);
            this.clearOptionValue(this.configuration.troopNumeralItemsItemOption);
            this.clearOptionValue(this.configuration.troopNumeralItemCostOption);
            this.clearOptionValue(this.configuration.lineIdItemOption);
            this.clearOptionValue(this.configuration.extraItemsOptions);
            _.each(options, function each(option) {
                self.clearOptionValue(option.cartOptionId);
            });
        },

        // method needed when setOption with empty value fails
        clearOptionValue: function clearOptionValue(option) {
            var pdp = this.container.getComponent('PDP');
            var hasValue;
            pdp.setOption(option, '');
            hasValue = Utils.getParameterByName(window.location.href, option);
            if (hasValue) {
                Backbone.history.navigate('#' + pdp.getItemInfo().item.urlcomponent);
            }
        },

        missingItemOptionsSelection: function missingItemOptionsSelection(itemsToAdd) {
            return itemsToAdd !== 'COUNCIL_NEEDED';
        },

        councilSelected: function councilSelected() {
            var pdp = this.container.getComponent('PDP');
            var item = pdp.getItemInfo();
            var selectedCouncil = item.custcol_acs_council_text;
            var selectedCouncilOption = _.find(this.councilItem.itemoptions_detail.fields, function findCouncil(options) {
                return options.internalid === 'custcol_council';
            });
            var selectedCouncilText = _.find(selectedCouncilOption.values, function findCouncil(values) {
                return values.internalid === selectedCouncil;
            });
            var councilItem;
            if (selectedCouncilText) {
                councilItem = _.find(this.councilItem.matrixchilditems_detail, function findCouncil(councilChild) {
                    return councilChild.custitem_council === selectedCouncilText.label;
                });
            }
            return councilItem;
        },

        getExtraItemsToAdd: function getExtraItemsToAdd() {
            var itemsToAdd = '';
            var councilItem = this.councilSelected();
            if (councilItem) {
                itemsToAdd += councilItem.internalid;
            }

            itemsToAdd += itemsToAdd ? '-' + this.serviceItem.internalid : this.serviceItem.internalid;
            _.each(this.patchesPinsToAdd, function eachPatchesPins(patchPin) {
                itemsToAdd += '-' + patchPin;
            });
            return itemsToAdd;
        },

        setCustomizationOptions: function setCustomizationOptions() {
            var pdp = this.container.getComponent('PDP');
            var numeralSelection = '';
            var itemSelection = '';
            var numeralCost = this.getNumeralCost();
            var councilItem = this.councilSelected();
            _.each(this.collection, function each(numeral) {
                if (numeral && !_.isNaN(parseInt(numeral.value, 10)) && !_.isNull(numeralSelection)) {
                    numeralSelection += numeralSelection.length === 0 ? numeral.label : '-' + numeral.label;
                    itemSelection += itemSelection.length === 0 ? numeral.item + '_' + numeral.value : '-' + numeral.item + '_' + numeral.value;
                } else {
                    numeralSelection = null;
                }
            });
            if (!this.hasNumeralSelection()) {
                numeralSelection = null;
                itemSelection = null;
            } else if (!numeralSelection) {
                numeralSelection = 'INCOMPLETE';
            }
            pdp.setOption(this.configuration.troopNumeralSelectionItemOption, numeralSelection);
            pdp.setOption(this.configuration.troopNumeralItemsItemOption, itemSelection);
            pdp.setOption(this.configuration.troopNumeralItemCostOption, numeralCost);
            pdp.setOption(this.configuration.extraItemsOptions, this.getExtraItemsToAdd());
            if (!councilItem) {
                pdp.setOption('custcol_acs_council_text', 'COUNCIL_NEEDED');
            }
            this.showNewItemPrice(numeralCost);
            this.updateSelectAllInsignia();
            this.getBackOrderItems();
        },

        showNewItemPrice: function showNewItemPrice(numeralCost) {
            var itemPriceView = this.getChildViewInstance('Extra.ItemPrice');
            if (itemPriceView) {
                this.ironOnPrice = numeralCost;
                itemPriceView.render();
            }
        },

        updateSelectAllInsignia: function updateSelectAllInsignia() {
            var self = this;
            var patchesAndPins = _.filter(this.patchesAndPins, function filterPins(patches) {
                return !patches.isTroopCrest;
            });
            var selectedPatchesAndPins = _.filter(this.patchesPinsToAdd, function filterPins(patches) {
                var isTroopCrest = _.find(self.patchesAndPins, function findTroopCrest(pin) {
                    var found = false;
                    if (pin.isTroopCrest) {
                        found = _.find(pin.troopCrestItems, function findTroop(troopCrestItem) {
                            return troopCrestItem.internalid === patches;
                        });
                    }
                    return found;
                });
                return !isTroopCrest;
            });
            if (selectedPatchesAndPins.length === patchesAndPins.length) {
                jQuery('[name="add-all-insignia"]').prop('checked', true);
            } else {
                jQuery('[name="add-all-insignia"]').prop('checked', false);
            }
        },

        removeTroopNumeral: function removeTroopNumeral() {
            var minimumLimit = parseInt(this.configuration.numberMinLength, 10) || 2;
            if (this.collection.length > minimumLimit) {
                this.collection.pop();
                this.renderChildViews();
                this.setCustomizationOptions();
                if (this.collection.length === minimumLimit) {
                    jQuery('.remove-troop-numerals').attr('disabled', true);
                }
                jQuery('.add-troop-numerals').attr('disabled', false);
            }
        },

        addTroopNumeral: function addTroopNumeral() {
            var limit = parseInt(this.configuration.numberLength, 10) || 6;
            if (this.collection.length < limit) {
                this.collection.push('');
                this.renderChildViews();
                this.setCustomizationOptions();
                if (this.collection.length === limit) {
                    jQuery('.add-troop-numerals').attr('disabled', true);
                }
                jQuery('.remove-troop-numerals').attr('disabled', false);
            }
        },

        setItemOptions: function setItemOptions(e) {
            var pdp = this.container.getComponent('PDP');
            var selectedOptionValue = jQuery(e.target).val();
            var selectedOption = jQuery(e.target).attr('id');
            pdp.setOption(selectedOption, selectedOptionValue);
        },

        getTroopNumeralView: function getTroopNumeralView(currentCollection, currentIndex) {
            var index = currentIndex;
            var self = this;
            var collection = new Backbone.Collection(_.map(currentCollection, function each(troopNumeral) {
                var model = new Backbone.Model({
                    troopNumeral: troopNumeral || '',
                    troopNumeralItem: self.troopNumeralItem,
                    index: index
                });
                index++;
                return model;
            }));

            return new BackboneCollectionView({
                childView: IronOnTroopNumeralsView,
                collection: collection,
                viewsPerRow: 1,
                childViewOptions: {
                    container: this.container
                }
            });
        },

        removeCustomization: function removeCustomization() {
            this.showCustomizationOptions = false;
            this.removeCustomizationOptions();
            this.render();
        },

        showCustomization: function showCustomization() {
            this.showCustomizationOptions = true;
            this.setCustomizationOptions();
            this.render();
        },

        getIronOnOptions: function getIronOnOptions() {
            var self = this;
            var pdp = this.container.getComponent('PDP');
            var item = pdp.getItemInfo();
            var options;
            if (item) {
                options = _.filter(item.options, function filter(option) {
                    return option.cartOptionId === 'custcol_acs_council_text';
                });
                options = _.map(options, function mapOptions(option) {
                    var value;
                    var councilOption;
                    if (option.cartOptionId === 'custcol_acs_council_text' && self.councilItem) {
                        councilOption = _.find(self.councilItem.itemoptions_detail.fields, function findOption(councilOptions) {
                            return councilOptions.internalid === 'custcol_council';
                        });
                        if (option.value) {
                            value = _.find(councilOption.values, function findOption(councilOptions) {
                                return option.value.internalid === councilOptions.internalid;
                            });
                        }
                        _.extend(option, {
                            values: councilOption.values,
                            value: value
                        });
                    }
                    return _.extend(option, {
                        type: 'dropdown'
                    });
                });
            }
            return options;
        },

        childViews: {
            'Troop.Numerals': function TroopNumerals() {
                var currentCollection = this.collection;
               /* if (this.isMobileDevice() && currentCollection.length > 5) {
                    currentCollection = currentCollection.slice(0, 5);
                }*/
                return this.getTroopNumeralView(currentCollection, 0);
            },
            'Troop.Numerals.Mobile.Row': function TroopNumerals() {
                var currentCollection = this.collection;
                if (this.isMobileDevice() && currentCollection.length > 5) {
                    currentCollection = currentCollection.slice(5, this.configuration.numberLength || 6);
                } else {
                    currentCollection = [];
                }
                return this.getTroopNumeralView(currentCollection, 5);
            },
            'Extra.Customization.Options': function extraCustomizationOptions() {
                return new BackboneCollectionView({
                    collection: this.getIronOnOptions(),
                    childView: ProductViewsOptionView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        templateName: 'selector',
                        show_required_label: true
                    }
                });
            },
            // view to show price at the bottom of the page. Currently disabled
            'Extra.ItemPrice': function extraItemPrice() {
                return new IronOnItemPrice({
                    container: this.container,
                    parent: this
                });
            },
            'Extra.TroopCrest': function extraPatchesAndPin() {
                return new BackboneCollectionView({
                    collection: _.filter(this.patchesAndPins, function filterPins(patches) {
                        return patches.isTroopCrest;
                    }),
                    childView: PatchesAndPinsView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        parent: this
                    }
                });
            },
            'Extra.PatchesAndPin': function extraPatchesAndPin() {
                return new BackboneCollectionView({
                    collection: _.filter(this.patchesAndPins, function filterPins(patches) {
                        return !patches.isTroopCrest;
                    }),
                    childView: PatchesAndPinsView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        parent: this
                    }
                });
            }
        },

        renderChildViews: function renderChildViews() {
           // var mobileRow = this.$el.find('.ironon-feature-numerals-row-mobile');
            this.renderChild('Troop.Numerals');
        /*    if (this.isMobileDevice()) {
                this.renderChild('Troop.Numerals.Mobile.Row');
                if (this.collection.length > 3) {
                    jQuery(mobileRow).show();
                } else {
                    jQuery(mobileRow).hide();
                }
            }*/
        },

        isMobileDevice: function isMobileDevice() {
            return Utils.isPhoneDevice() || Utils.isTabletDevice();
        },

        /**
         * @method hasNumeralSelection
         * return true or false if the user has select any troop numeral option
         * @return {boolean}
         */
        hasNumeralSelection: function hasNumeralSelection() {
            var numeralSelected = false;
            _.each(this.collection, function eachNumeral(numeral) {
                if (numeral) {
                    numeralSelected = true;
                }
            });
            return numeralSelected;
        },

        addAllInsignia: function addAllInsignia(e) {
            var self = this;
            var addAll = jQuery(e.target).prop('checked');
            var insigniasAndPins = _.filter(this.patchesAndPins, function filterPins(patches) {
                return !patches.isTroopCrest;
            });
            var hasTroopCrest = _.filter(this.patchesPinsToAdd, function filterPins(patches) {
                var isTroopCrest = _.find(self.patchesAndPins, function findTroopCrest(pin) {
                    var found = false;
                    if (pin.isTroopCrest) {
                        found = _.find(pin.troopCrestItems, function findTroop(troopCrestItem) {
                            return troopCrestItem.internalid === patches;
                        });
                    }
                    return found;
                });
                return isTroopCrest;
            });
            if (addAll) {
                insigniasAndPins = _.map(insigniasAndPins, function map(patches) {
                    var child;
                    var internalid = patches.internalid;
                    var trefoilPinItemId = self.configuration.trefoilPin;
                    var trefoilParentPinItemId = self.configuration.trefoilPinParent;
                    if (parseInt(trefoilParentPinItemId, 10) === parseInt(patches.internalid, 10)) {
                        child = _.find(patches.matrixchilditems_detail, function findChild(children) {
                            return children.internalid === parseInt(trefoilPinItemId, 10);
                        });
                        internalid = child.internalid;
                    }
                    return internalid;
                });
                this.patchesPinsToAdd = insigniasAndPins;
                jQuery('.iron-on-extra-patches-area-cell').addClass('iron-on-extra-patches-area-cell-selected');
            } else {
                jQuery('.iron-on-extra-patches-area-cell').removeClass('iron-on-extra-patches-area-cell-selected');
                this.patchesPinsToAdd = [];
            }
            if (hasTroopCrest && hasTroopCrest.length > 0) {
                this.patchesPinsToAdd.push(hasTroopCrest[0]);
                this.setCustomizationOptions();
            }
        },

        getCouncilPrice: function getCouncilPrice() {
            return this.councilItem ? this.councilItem.onlinecustomerprice_detail.onlinecustomerprice_formatted : null;
        },

        // @method getContext @return IronOn.View.Context
        getContext: function getContext() {
            var item = this.contextData.item();
            var showIronOn = item.custitem_acs_iron_on_enabled && item[this.configuration.troopNumeralField] && item[this.configuration.serviceFeeField] && item.custitem_acs_council_patch_item_id;
            var showCustomizationOptions = this.showCustomizationOptions;
            var confirmationText = Utils.translate('The troop numeral entered is correct.');
            var serviceFeeMessage = this.configuration.serviceFeeMessage;
            var serviceFeeCost;
            var troopNumeralPrice = Utils.formatCurrency(this.getTroopNumeralPrice());
            var councilPrice = this.getCouncilPrice();
            if (this.serviceItem) {
                serviceFeeCost = Utils.formatCurrency(this.serviceItem.onlinecustomerprice);
            }
            serviceFeeMessage = serviceFeeMessage.replace('[ITEMNAME]', item.storedisplayname2);
            serviceFeeMessage = serviceFeeMessage.replace('[SERVICECOST]', serviceFeeCost);
            return {
                showTroopCrest: item.custitem_acs_enable_troop_crest,
                showNumerals: this.showNumerals,
                activeShowNumerals: this.activeShowNumerals,
                showCustomizationOptions: showCustomizationOptions,
                confirmationText: confirmationText,
                showIronOn: showIronOn,
                showMobileRow: this.isMobileDevice(),
                serviceFeeMessage: serviceFeeMessage,
                serviceFeeCost: serviceFeeCost,
                troopNumeralPrice: troopNumeralPrice,
                councilPrice: councilPrice
            };
        }
    });
});
