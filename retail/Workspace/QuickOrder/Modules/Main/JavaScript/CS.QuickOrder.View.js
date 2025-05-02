/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.View', [
    'Backbone',
    'Item.Model',
    'CS.QuickOrder.Line.View',
    'Backbone.CollectionView',
    'Backbone.CompositeView',
    'CS.QuickOrder.Collection',
    'quickorder.tpl',
    'LiveOrder.Model',
    'jQuery',
    'underscore'
], function QuickOrderView(
    Backbone,
    ItemModel,
    QuickOrderLineView,
    BackboneCollectionView,
    BackboneCompositeView,
    QuickOrderCollection,
    quickOrderTpl,
    LiveOrderModel,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: quickOrderTpl,

        initialize: function initialize(options) {
            var self = this;
            // Get configuration for initial Line numbers
            var configInitialLines = 5; // this.options.container.getConfig('quickOrder.initialLines') || 5;
            this.container = options.container;
           // New collection - to store each line (index, query, search results)
            this.collection = new Backbone.Collection();
            // Add empty item model x initial lines in config
            _(configInitialLines).times(function times() { self.addLine(true); });
            // child views
            BackboneCompositeView.add(this);
        },

        events: {
            'click button[data-action="multiadd"]': 'addToCart',
            'click button[data-action="addEmptyLine"]': 'addLine',
            'click a[data-action="removeLine"]': 'removeLine',
            'click button[data-action="queryAgain"]': 'itemQuery',
            'focusout input[data-field="itemid"]': 'itemQuery',
            'change input[data-field="itemqty"]': 'updateQty',
            'change select[data-field="results"]': 'resultSelected',
            'keypress input[data-field="itemid"]': 'enterKey'
        },

        index: 1,

        childViews: {
            'QuickView.CollectionView': function QuickViewCollectionView() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: QuickOrderLineView
                });
            }
        },

        enterKey: function enterkey(e) {
            var self = this;
            var enter = true;
            if (event.keyCode === 13) {
                self.itemQuery(e, enter);
            }
        },

        addLine: function addLine() {
            var item;
            var line;
            // For each new line in collection add index, item model and search results
            this.collection.add(new Backbone.Model({
                internalid: this.index,
                item: new ItemModel(),
                suggestedResults: new QuickOrderCollection(),
                referenceLine: _.uniqueId('quickorder_'),
                addedToCart: false,
                cartMessage: '',
                cartCode: ''
            }));

            // Create quantity attribute and give initial value
            line = this.collection.findWhere({ internalid: this.index });
            item = line.get('item');
            item.set('quantity', 1);

            // Increment index number
            this.index ++;
            this.render();
        },

        addToCart: function addToCart() {
            // event.preventDefault();
            var self = this;
            var cart = LiveOrderModel.getInstance();

            // get each item
            var itempluck = this.collection.map(function map(line) {
                var item = line.get('item');

                // Set unique line id
                item.set('addedToCart', line.get('addedToCart'));
                item.set('referenceLine', line.get('referenceLine'));
                return line.get('item');
            });
            // filter out empty line items (e.g. new line) & lines already added to cart
            var filtered = _.reject(itempluck, function filtered(num) {
                return !_.has(num, 'id') || num.get('addedToCart') === true || num.get('_isPurchasable') === false;
            });

            cart.addMultipleItems(filtered).done(function done(response) {
                // map through returned properties and assign against appropriate item model
                _.map(response.multilineResponse, function map(x, y) {
                    var line = self.collection.findWhere({ 'referenceLine': y });
                    if (typeof x === 'string' && x.indexOf('item') !== -1) {
                        line.set('addedToCart', true);
                    } else {
                        line.set('addedToCart', false);
                        line.set('cartMessage', x.message);
                        line.set('cartCode', x.code);
                    }
                });
                self.render();
            });
        },

        removeLine: function removeLine(e) {
            var $button = jQuery(e.currentTarget);
            // line internal id, stored as data attr
            var index = $button.data('index');
            // Find correct internalid in model array
            var linewithid = this.collection.findWhere({ internalid: index });
            this.collection.remove(linewithid);
            this.render();
        },

        updateQty: function updateQty(e) {
            var $element = jQuery(e.target);
            var self = this;
            var index = $element.data('index');
            var quantity = parseInt(jQuery('[data-field="itemqty"][data-index=' + index + ']').val(), 10);
            var line = this.collection.findWhere({ internalid: index });
            var item = line.get('item');
            var minQuantity = item.get('_minimumQuantity');

            // Set quantity to minimum if current value is lower
            if (quantity >= minQuantity) {
                item.set('quantity', quantity);
            } else {
                item.set('quantity', quantity);
            }
            self.render();
            $element.focus();
        },

        resultSelected: function itemQuery(e) {
            var $select = jQuery(e.target);
            var index = $select.data('index');
            var quantity = parseInt(jQuery('[data-field="itemqty"][data-index=' + index + ']').val(), 10);
            // Get query string from data attr in select (passed over to child view)
            // Get internalid from data attribute on selected option
            var $selectedinternalid = parseInt($select.val(), 10);
            // Create object key/value before using in findWHere
            // Get object first based on query string then find using internalid
            var line = this.collection.findWhere({ internalid: index });
            var itemSelected = line.get('suggestedResults').findWhere({ internalid: $selectedinternalid });
            var item;
            var minQuantity;
            line.set('item', itemSelected);
            item = line.get('item');
            minQuantity = item.get('_minimumQuantity');

            // Set quantity to minimum if current value is lower
            if (quantity >= minQuantity) {
                item.set('quantity', quantity);
            } else {
                item.set('quantity', minQuantity);
            }
            this.render();
        },

        itemQuery: function itemQuery(e, enter) {
            var self = this;
            var $element = jQuery(e.target);
            var index = $element.data('index');
            // Get query based on index due to button
            var query = jQuery('[data-field="itemid"][data-index=' + index + ']').val().trim();
            var querylength = query.length;
            // Get previous search term, only needed for focusout
            var previousquery = $element.data('lastquery');
            var quantity = parseInt(jQuery('[data-field="itemqty"][data-index=' + index + ']').val(), 10);
            // find internal id in collection and
            var line = this.collection.findWhere({ internalid: index });
            var item;
            var minQuantity;

            if (querylength < 3) {
                return;
            }

            line.set('suggestedResults', new QuickOrderCollection());
            line.set('query', query);
            // reset ItemModel
            line.set('item', new ItemModel());
            // Add the Qty back - removed by new ItemModel
            item = line.get('item');
            item.set('quantity', quantity);

            // if query empty or same as previous do not fetch
            if (query !== '' && (query !== previousquery || enter === true)) {
                // use fetch method for ajax call, data object for params to send
                line.get('suggestedResults').fetch({
                    data: {
                        keyword: query
                    }
                }).done(function done() {
                // if collection empty show error use error handler maybe 'showerror'
                    if (line.get('suggestedResults').length === 1) {
                        // add
                        line.set('item', line.get('suggestedResults').at(0));
                        item = line.get('item');
                        minQuantity = item.get('_minimumQuantity');

                        // Set quantity to minimum is current value is lower
                        if (quantity >= minQuantity) {
                            item.set('quantity', quantity);
                        } else {
                            item.set('quantity', minQuantity);
                        }
                    } else if (line.get('suggestedResults').length === 0) {
                        // no results
                    }
                    self.render();
                });
            }
        }
    });
});
