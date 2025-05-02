/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
*/

define('QuickOrderAdd.View', [
    'Backbone',
    'Item.Collection',
    'Item.Model',
    'QuickOrder.Line.View',
    'Backbone.CollectionView',
    'Backbone.CompositeView',
    'quickorder_add.tpl',
    'cssteam_quickbuy_cssquickbuy.tpl',
    'LiveOrder.Model',
    'GlobalViews.Message.View',
    
    'jQuery',
    'underscore',
    'LiveOrder.Model.MultiLine'

], function QuickOrderView(
    Backbone,
    ItemCollection,
    ItemModel,
    QuickOrderLineView,
    CollectionView,
    CompositeView,
    quickorder_tpl,
    confirmationTempalte,
    LiveOrderModel,
    GlobalViewsMessageView,
    jQuery,
    _
) {
    'use strict';
    return Backbone.View.extend({

        template: quickorder_tpl,

        events: {
            'click button[data-action="multiadd"]': 'addToCart',
            'click button[data-action="addEmptyLine"]': 'addLine',
            'click a[data-action="removeLine"]': 'removeLine',
            'click button[data-action="queryAgain"]': 'itemQuery',
            'focusout input[data-field="itemid"]': 'itemQuery',
            'change input[data-field="itemqty"]': 'updateQty',
            'change select[data-field="results"]': 'resultSelected',
            'keypress input[data-field="itemid"]': 'enterKey',
            'click [data-action="reset"]':"resetAll"
        },
        index: 1,
        resetAll:function(){
            this.initialize(this.options);
            this.render();
            console.log("resetAll")
        },
        initialize: function initialize(options) {
            var self = this;
            this.options = options;
            // Get configuration for initial Line numbers
            var configInitialLines = 5
            // New collection - to store each line (index, query, search results)
            this.collection = new Backbone.Collection();
            this.container = options.container;
            // Add empty item model x initial lines in config
            _(configInitialLines).times(function times() { self.addLine(true); });
            // child views
            CompositeView.add(this);
            var layout = this.container.getComponent('Layout');
            layout.on("afterAppendToDom",function(){
                console.log("afterAppendToDom");
            })
            layout.on("afterAppendView",function(){
                console.log("afterAppendView");
            })
            layout.on("afterShowContent",function(){
                console.log("afterShowContent");
            })
        },


        childViews: {
            'QuickView.CollectionView': function QuickViewCollectionView() {
                return new CollectionView({
                    collection: this.collection,
                    childView: QuickOrderLineView
                });
            }
        },

        enterKey: function enterkey(e) {
            var self = this;
            var enter = true;
            if (event.keyCode === 13)  {
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
                suggestedResults: new ItemCollection(),
                referenceLine: _.uniqueId('quickorder_'),
                addedToCart: false,
                cartMessage: '',
                cartCode: ''
            }));

            // Create quantity attribute and give initial value
            line = this.collection.findWhere({internalid: this.index});
            item = line.get('item');
            item.set('quantity', 1);

            // Increment index number
            this.index ++;
            this.render();
            console.log("addLine");
        },

        addToCart: function addToCart() {
            // event.preventDefault();
            var self = this;
            
            var cart = this.container.getComponent('Cart');
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
            var linesFiltered = {lines:[]}
            _.each(filtered,function(item){
                linesFiltered.lines.push({item: {internalid: item.get("internalid")}, quantity:item.get("quantity")})
            })
            var that = this;
            cart.addLines(linesFiltered).done(function done(response) {
                // map through returned properties and assign against appropriate item model
                var view = new Backbone.View();
                view.template = confirmationTempalte;
                
                that.container.getComponent('Layout').showContent(view, { showInModal: true })
                that.render();
            });
        },

        removeLine: function removeLine(e) {
            var $button = jQuery(e.currentTarget);
            // line internal id, stored as data attr
            var index = $button.data('index');
            // Find correct internalid in model array
            var linewithid = this.collection.findWhere({internalid: index});
            this.collection.remove(linewithid);
            this.render();
            console.log("removeLine");
        },

        updateQty: function updateQty(e) {
            var $element = jQuery(e.target);
            var self = this;
            var index = $element.data('index');
            var quantity = parseInt(jQuery('[data-field="itemqty"][data-index=' + index + ']').val(), 10);
            var line = this.collection.findWhere({internalid: index});
            var item = line.get('item');
            var minQuantity = item.get('_minimumQuantity');
            var allowReorder = item.get('custitem_do_not_reorder_flag');
            // Set quantity to minimum if current value is lower
            if (allowReorder) {
                if (quantity >= minQuantity) {
                    item.set('quantity', quantity);
                } else if (quantity > item.get('quantityavailable')) {
                    item.set('quantity', item.get('quantityavailable'));
                } else {
                    item.set('quantity', quantity);
                }
                if (quantity > item.get('quantityavailable')) {
                    item.set('quantity', item.get('quantityavailable'));
                }
            } else {
                if (quantity >= minQuantity) {
                    item.set('quantity', quantity);
                }
             }
            self.render();
            var focus = false;
            var el;
            jQuery('.quick-order-qty-input').each(function(){
                if(!jQuery(this).attr("data-focus") && !focus){
                    el =jQuery(this).closest(".quick-order-line").first(".quick-order-item-input")
                    el.closest(".quick-order-line").find(".quick-order-item-input").focus();
                    console.log(jQuery(this).closest(".quick-order-line").first(".quick-order-item-input"));
                    focus = true;
                }
            })
            setTimeout(function() {
                el.closest(".quick-order-line").find(".quick-order-item-input").focus();
            }, 1000);
            
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
            var line = this.collection.findWhere({internalid: index});
            var itemSelected = line.get('suggestedResults').findWhere({internalid: $selectedinternalid});
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
            console.log("resultSelected");
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
            var line = this.collection.findWhere({internalid: index});
            var item;
            var minQuantity;

            if (querylength < 3) {
                return;
            }

            
            // reset ItemModel
            line.set('item', line.get('item')?line.get('item'):new ItemModel());
            // Add the Qty back - removed by new ItemModel
            item = line.get('item');
            item.set('quantity', quantity);
            line.set("query",query)
            // if query empty or same as previous do not fetch
            if (query !== '' && (query !== previousquery || enter === true)) {
                // use fetch method for ajax call, data object for params to send
                line.get('suggestedResults').fetch({
                    data: {
                        q: query,
                        fieldset:"details"
                    }

                }).done(function done() {
                    
                    if(line.get('suggestedResults').length >0 && line.get('suggestedResults').models[0].get("_matrixChilds").length>0){
                        var dummyCollection = new ItemCollection();

                        _.each(line.get('suggestedResults').models,function(realItem){
                            
                            if(realItem.get("_matrixChilds").length>0){
                                
                                var options = _.filter(realItem.getPosibleOptions().models,function(option){return option.get("isMandatory")})
                            
                                var parentModel = realItem;

                                var aux = _.map(realItem.get("_matrixChilds").models,function(model){
                                    var optionsText = ""
                                    _.each(options,function(opt){
                                        optionsText += model.get(opt.get("itemOptionId"));
                                    })
                                    model.set("query",query);
                                    return model.set("name",parentModel.get("_name") + "-" + optionsText) && model.set("displayname",parentModel.get("_name") + "-" + optionsText) && model.set("parentImage",realItem.getImages())
                                    
                                })

                                
                                dummyCollection.add(aux);
                            }else{
                                realItem.set("query",query);
                                dummyCollection.add(realItem);
                            }
                            
                        })
                        var exactMatch = new ItemCollection();
                        _.each(dummyCollection.models,function(item){
                            if(item.get("itemid")==query){
                                exactMatch.add(item)
                            }
                        })
                        if(exactMatch && exactMatch.length >0){
                            line.set('suggestedResults',exactMatch)
                        }else{
                            line.set('suggestedResults',dummyCollection)
                        }
                        
                    }
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
                    jQuery('[data-focus="true"]').each(function(){
                        jQuery(this).focus();
                    })
                    console.log("itemQuery")
                });
            }
        }
    });
});
