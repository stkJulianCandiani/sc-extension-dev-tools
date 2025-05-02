define('Monogram.Alphabet.View', [
    'Monogram.Values',
    'monogram_alphabet_view.tpl',
    'Backbone',
    'underscore'
], function MonogramAlphabetView(
    MonogramValues,
    monogramAlphabetViewTpl,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: monogramAlphabetViewTpl,

        initialize: function initialize(options) {
            this.container = options.container;
        },

        getMonogramOptions: function getMonogramOptions() {
            var alphabetItem = this.model.get('alphabetItem');
            var itemOptions;
            var monogramOptions;
            if (alphabetItem) {
                itemOptions = alphabetItem.itemoptions_detail.fields;
                monogramOptions = _.find(itemOptions, function find(option) {
                    return option.internalid === MonogramValues.itemOptions.monogramAlphabet;
                });
            }
            return monogramOptions;
        },

        getMonogramMatrixChildItems: function geMonogramlMatrixChildItems(monogramAlphabetOption) {
            var alphabetItem = this.model.get('alphabetItem');
            var monogramOptions;
            if (monogramAlphabetOption) {
                monogramOptions = _.map(monogramAlphabetOption, function map(option) {
                    var matrixChild = _.find(alphabetItem.matrixchilditems_detail, function findItem(childItem) {
                        return childItem[MonogramValues.itemFields.monogramAlphabet] === option.label;
                    });
                    return _.extend(option, {
                        itemId: matrixChild ? matrixChild.internalid : matrixChild
                    });
                });
            }
            return monogramOptions;
        },

        getContext: function getContext() {
            var monogramAlphabet = this.model.get('monogramAlphabet');
            var monogramOptions = this.getMonogramOptions();
            var letters;
            if (monogramOptions && monogramOptions.values) {
                letters = this.getMonogramMatrixChildItems(monogramOptions.values);
                letters = _.filter(letters, function filter(letter) {
                    return letter.internalid; // removes "- select -" option
                });
                letters = _.map(letters, function map(letter) {
                    letter.isSelected = parseInt(letter.internalid, 10) === parseInt(monogramAlphabet.value, 10) && letter.label === monogramAlphabet.label;
                    return letter;
                });
            }
            return {
                showMonogram: monogramOptions && monogramOptions.values,
                index: this.model.get('index'),
                monogramAlphabet: letters
            };
        }
    });
});
