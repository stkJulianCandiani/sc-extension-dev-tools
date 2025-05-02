/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.TroopNumerals.View', [
    'ironon_troop_numerals.tpl',
    'Backbone',
    'underscore'
], function IronOnTroopNumeralsView(
    irononTroopNumeralTpl,
    Backbone,
    _
) {
    'use strict';

    // @class ACS.IronOn.IronOn.View @extends Backbone.View
    return Backbone.View.extend({

        template: irononTroopNumeralTpl,

        initialize: function initialize(options) {
            this.container = options.container;
            this.configuration = this.container.getComponent('Environment').getConfig('extensions').ironon;
        },

        /**
         * @method getTroopNumeralOptions get the values of the troop numeral item option
         * @returns {obj}
         */
        getTroopNumeralOptions: function getTroopNumeralOptions() {
            var troopNumeralItem = this.model.get('troopNumeralItem');
            var itemOptions;
            var troopNumeralOption;
            var self = this;
            if (troopNumeralItem) {
                itemOptions = troopNumeralItem.itemoptions_detail.fields;
                troopNumeralOption = _.find(itemOptions, function find(option) {
                    return option.internalid === self.configuration.troopNumeralItemOption;
                });
            }
            return troopNumeralOption;
        },

        /**
         * @method getTroopNumeralMatrixChildItems given the list of options it searches the corresponding child item internalid
         * @param {[obj]} troopNumeralOption
         * @return {[obj]}
         */
        getTroopNumeralMatrixChildItems: function getTroopNumeralMatrixChildItems(troopNumeralOption) {
            var troopNumeralItem = this.model.get('troopNumeralItem');
            var troopNumerals;
            var self = this;
            var hasUnifyNumber = false;
            if (troopNumeralOption) {
                troopNumerals = _.map(troopNumeralOption, function map(option) {
                    var matrixChild = _.find(troopNumeralItem.matrixchilditems_detail, function findItem(childItem) {
                        return childItem[self.configuration.troopNumeralItemField] === option.label;
                    });
                    return _.extend(option, {
                        itemId: matrixChild ? matrixChild.internalid : matrixChild
                    });
                });
                hasUnifyNumber = _.find(troopNumerals, function find(numeral) {
                    return numeral.label.indexOf('6/9') > -1;
                });
                hasUnifyNumber = _.extend({}, hasUnifyNumber);
                if (hasUnifyNumber) {
                    troopNumerals = _.map(troopNumerals, function find(numeral) {
                        if (numeral.label.indexOf('6/9') > -1) {
                            // eslint-disable-next-line no-param-reassign
                            numeral = _.extend({}, numeral);
                            numeral.label = numeral.label.replace('6/9', '6');
                        }
                        return numeral;
                    });
                    hasUnifyNumber.label = hasUnifyNumber.label.replace('6/9', '9');
                    troopNumerals.push(hasUnifyNumber);
                }
            }
            return troopNumerals;
        },

        // @method getContext @return IronOn.View.Context
        getContext: function getContext() {
            var troopNumeral = this.model.get('troopNumeral');
            var troopNumeralOption = this.getTroopNumeralOptions();
            var troopNumerals;
            if (troopNumeralOption && troopNumeralOption.values) {
                troopNumerals = this.getTroopNumeralMatrixChildItems(troopNumeralOption.values);
                troopNumerals = _.filter(troopNumerals, function filter(numeral) {
                    return numeral.internalid; // removes "- select -" option
                });
                troopNumerals = _.map(troopNumerals, function map(numeral) {
                    numeral.isSelected = parseInt(numeral.internalid, 10) === parseInt(troopNumeral.value, 10) && numeral.label === troopNumeral.label;
                    // numeral.label = numeral.label.replace('#', '');
                    return numeral;
                });
            }
            return {
                showTroopNumerals: troopNumeralOption && troopNumeralOption.values,
                index: this.model.get('index'),
                troopNumerals: troopNumerals
            };
        }
    });
});
