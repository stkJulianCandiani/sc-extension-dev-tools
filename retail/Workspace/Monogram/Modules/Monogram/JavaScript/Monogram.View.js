/* eslint-disable max-len */
/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module Monogram
define('Monogram.View', [
    'Monogram.Alphabet.View',
    'Monogram.Values',
    'Monogram.Item.Model',
    'monogram.tpl',
    'Backbone',
    'Backbone.CollectionView',
    'jQuery',
    'underscore',
    'Utils'
], function MonogramView(
    MonogramAlphabetView,
    MonogramValues,
    MonogramItemModel,
    monogramTpl,
    Backbone,
    BackboneCollectionView,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: monogramTpl,

        events: {
            'click [data-action="remove-monogram"]': 'removeMonogram',
            'click [data-action="add-monogram"]': 'addMonogram',
            'change [data-action="monogram-change"]': 'changeMonogram',
            'click [data-action="monogram-confirmation"]': 'confirmMonogram',
            'click [data-action="remove-customization"]': 'removeCustomization',
            'click [data-action="show-customization"]': 'showCustomization',
            'change [data-toggle="select-option"]': 'setItemOptions'
        },

        initialize: function initialize(options) {
            this.pdp = options.container.getComponent('PDP');
            this.collection = ['', ''];
            this.orderConfirmed = false;
            this.container = options.container;
            this.configuration = this.container.getComponent('Environment').getConfig('extensions').monogram;
            this.monogramItem = new MonogramItemModel({
                container: this.container
            });
            this.removeCustomizationOptions();
            this.once('afterCompositeViewRender', this.loadItems, this);

            this.onAfterQuantityChangeFn = _.bind(this.onAfterQuantityChange, this);

            this.pdp.on('afterQuantityChange', this.onAfterQuantityChangeFn);
        },

        onAfterQuantityChange: function onAfterQuantityChange() {
            var item = this.contextData.item();
            var showMonogram = item.custitem_acs_monogram_enabled;
            if (showMonogram) {
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

        loadItems: function loadItems() {
            var self = this;
            var alphabetItemId = this.configuration.monogramAlphabetItem;
            var serviceItem = this.configuration.serviceFeeItem;
            var data = alphabetItemId + ',' + serviceItem;
            if (alphabetItemId && serviceItem) {
                this.monogramItem.fetch({
                    data: {
                        id: data
                    }
                }).then(function then(monogramItems) {
                    self.alphabetItem = _.find(monogramItems.items, function findCouncil(monogramItem) {
                        return monogramItem.internalid === parseInt(alphabetItemId, 10);
                    });
                    self.serviceItem = _.find(monogramItems.items, function findCouncil(monogramItem) {
                        return monogramItem.internalid === parseInt(serviceItem, 10);
                    });
                    self.render();
                });
            }
        },

        contextDataRequest: ['item'],

        confirmMonogram: function confirmMonogram(e) {
            this.orderConfirmed = jQuery(e.target).prop('checked');
            this.setCustomizationOptions();
        },

        changeMonogram: function changeMonogram(e) {
            var value = jQuery(e.target).val();
            var index = parseInt(jQuery(e.target).attr('data-index'), 10);
            var item = parseInt(e.target.options[e.target.selectedIndex].dataset.item, 10);
            var label = e.target.options[e.target.selectedIndex].dataset.label;
            this.orderConfirmed = false;
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
            this.render();
        },

        getItemPrice: function getItemPrice(item) {
            var price = 0;
            if (this[item]) {
                price = this[item].onlinecustomerprice;
            }
            return price;
        },

        getCustomizationCost: function getCustomizationCost() {
            var customizationCost = 0;
            var alphabetPrice = this.getItemPrice('alphabetItem');
            if (this.hasAlphabetSelection()) {
                customizationCost = this.collection.length * alphabetPrice;
            }
            customizationCost += this.getItemPrice('serviceItem');
            customizationCost = customizationCost ? customizationCost.toString() : customizationCost;
            return customizationCost;
        },

        getBackOrderItems: function getBackOrderItems() {
            var self = this;
            var pdp = this.container.getComponent('PDP');
            var item = pdp.getItemInfo();
            var quantity = item.quantity;
            var alphabetSelection = [];
            var hasOutOfStockItems;
            var layout = this.container.getComponent('Layout');
            if (this.hasAlphabetSelection()) {
                _.each(this.collection, function eachLetter(letter) {
                    var letterFound = false;
                    alphabetSelection = _.map(alphabetSelection, function mapAlphabet(selected) {
                        if (selected.item === letter) {
                            selected.quantity += 1;
                            letterFound = true;
                        }
                        return selected;
                    });
                    if (!letterFound) {
                        alphabetSelection.push({
                            item: letter,
                            quantity: 1
                        });
                    }
                });
                _.each(alphabetSelection, function eachLetter(letter) {
                    _.each(self.alphabetItem.matrixchilditems_detail, function child(childItem) {
                        var sameItem = parseInt(childItem.internalid, 10) === parseInt(letter.item, 10);
                        var lessQtyAvailable = childItem.quantityavailable < (quantity * letter.quantity);
                        if (sameItem && lessQtyAvailable) {
                            hasOutOfStockItems = true;
                        }
                    });
                });
            }
            jQuery("[data-view='Monogram.BackOrderMessage']").html('');
            if (hasOutOfStockItems) {
                layout.showMessage({
                    message: Utils.translate('At least one of the selected items is on Backorder.'),
                    type: 'warning',
                    selector: 'Monogram.BackOrderMessage'
                });
            }
        },

        removeCustomizationOptions: function removeCustomizationOptions() {
            this.showCustomizationOptions = false;
            this.patchesPinsToAdd = [];
            this.clearOptionValue(MonogramValues.itemOptions.alphabetSelection);
            this.clearOptionValue(MonogramValues.itemOptions.extraItems);
            this.clearOptionValue(MonogramValues.itemOptions.lineId);
            this.clearOptionValue(MonogramValues.itemOptions.cost);
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

        getExtraItemsToAdd: function getExtraItemsToAdd() {
            var itemsToAdd = this.serviceItem.internalid;
            return itemsToAdd.toString();
        },

        setCustomizationOptions: function setCustomizationOptions() {
            var pdp = this.container.getComponent('PDP');
            var alphabetSelection = '';
            var itemSelection = '';
            var customizationCost = this.getCustomizationCost();
            if (!this.orderConfirmed) {
                alphabetSelection = 'CONFIRMATION_NEEDED';
            } else {
                _.each(this.collection, function each(letter) {
                    if (letter && !_.isNaN(parseInt(letter.value, 10)) && !_.isNull(alphabetSelection)) {
                        alphabetSelection += alphabetSelection.length === 0 ? letter.label : '-' + letter.label;
                        itemSelection += itemSelection.length === 0 ? letter.item + '_' + letter.value : '-' + letter.item + '_' + letter.value;
                    } else {
                        alphabetSelection = null;
                    }
                });
                if (!alphabetSelection) {
                    alphabetSelection = 'INCOMPLETE';
                }
            }
            pdp.setOption(MonogramValues.itemOptions.alphabetSelection, alphabetSelection);
            pdp.setOption(MonogramValues.itemOptions.alphabetSelectionItems, itemSelection);
            pdp.setOption(MonogramValues.itemOptions.cost, customizationCost);
            pdp.setOption(MonogramValues.itemOptions.extraItems, this.getExtraItemsToAdd());
            this.showNewItemPrice(customizationCost);
            this.getBackOrderItems();
        },

        // view to show price at the bottom of the page. Currently disabled
        showNewItemPrice: function showNewItemPrice(alphabetCost) {
            var itePriceView = this.getChildViewInstance('Extra.ItemPrice');
            if (itePriceView) {
                this.monogramPrice = alphabetCost;
                // itePriceView.render();
            }
        },

        removeMonogram: function removeMonogram() {
            var layout = this.container.getComponent('Layout');
            var minimunLimit = this.configuration.minLength || 2;
            if (this.collection.length > minimunLimit) {
                this.collection.pop();
                this.renderChildViews();
            } else {
                jQuery("[data-view='Monogram.Error']").html('');
                layout.showMessage({
                    message: Utils.translate('At least 2 letters are needed.'),
                    type: 'warning',
                    selector: 'Monogram.Error'
                });
            }
            this.unSetConfirmation();
        },

        addMonogram: function addMonogram() {
            var limit = this.configuration.maxLength || 3;
            var layout = this.container.getComponent('Layout');
            if (this.collection.length < limit) {
                this.collection.push('');
                this.renderChildViews();
            } else {
                jQuery("[data-view='Monogram.Error']").html('');
                layout.showMessage({
                    message: Utils.translate('You can`t add more than $(0) letters', limit),
                    type: 'warning',
                    selector: 'Monogram.Error'
                });
            }
            this.unSetConfirmation();
        },

        setItemOptions: function setItemOptions(e) {
            var pdp = this.container.getComponent('PDP');
            var selectedOptionValue = jQuery(e.target).val();
            var selectedOption = jQuery(e.target).attr('id');
            pdp.setOption(selectedOption, selectedOptionValue);
        },

        unSetConfirmation: function unSetConfirmation() {
            jQuery('[data-action="monogram-confirmation"]').prop('checked', false);
            this.orderConfirmed = false;
            this.setCustomizationOptions();
        },

        getMonogramView: function getMonogramView(currentCollection, currentIndex) {
            var index = currentIndex;
            var self = this;
            var collection = new Backbone.Collection(_.map(currentCollection, function each(monogramAlphabet) {
                var model = new Backbone.Model({
                    monogramAlphabet: monogramAlphabet || '',
                    alphabetItem: self.alphabetItem,
                    index: index
                });
                index++;
                return model;
            }));

            return new BackboneCollectionView({
                childView: MonogramAlphabetView,
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

        childViews: {
            'Monogram.Alphabet': function MonogramAlphabet() {
                var currentCollection = this.collection;
                return this.getMonogramView(currentCollection, 0);
            }
        },

        renderChildViews: function renderChildViews() {
            this.renderChild('Monogram.Alphabet');
        },

        hasAlphabetSelection: function hasAlphabetSelection() {
            var letterSelected = false;
            _.each(this.collection, function eachLetter(letter) {
                if (letter) {
                    letterSelected = true;
                }
            });
            return letterSelected;
        },


        getContext: function getContext() {
            var item = this.contextData.item();
            var showMonogram = item.custitem_acs_monogram_enabled;
            var showCustomizationOptions = this.showCustomizationOptions;
            var confirmationText = Utils.translate('Please verify the monogramming letters and order are correct.');
            var serviceFeeMessage = this.configuration.serviceFeeMessage;
            var serviceFeeCost;
            if (this.serviceItem) {
                serviceFeeCost = Utils.formatCurrency(this.serviceItem.onlinecustomerprice);
            }
            serviceFeeMessage = serviceFeeMessage.replace('[ITEMNAME]', item.storedisplayname2);
            serviceFeeMessage = serviceFeeMessage.replace('[SERVICECOST]', serviceFeeCost);
            return {
                orderConfirmed: this.orderConfirmed,
                showCustomizationOptions: showCustomizationOptions,
                confirmationText: confirmationText,
                showMonogram: showMonogram,
                serviceFeeMessage: serviceFeeMessage
            };
        }
    });
});
