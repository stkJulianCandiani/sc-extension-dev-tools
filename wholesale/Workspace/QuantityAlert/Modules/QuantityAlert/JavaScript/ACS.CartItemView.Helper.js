define('ACS.CartItemView.Helper', [],
    function CartItemViewHelper() {
        'use strict';

        return {
            views: [],

            /**
             * Adds a view in a item line of the shopping cart and give the line information to the view in the updateView function of the view
             * @param {object} options contains 3 attributes "container" , "childView", "placeholderChildView"
             */
            setup: function setup(options) {
                this.setupCartInitialize(options.container);
                this.setupCartEvents(options.container);
                this.addChildViewToComponent(options);
            },

            /**
             * Attach the render of the views when the cart has finised with the initial rendering
             * @param {CompnentContainer} container
             */
            setupCartInitialize: function setupCartInitialize(container) {
                var thisContext = this;
                var cartComponent = container.getComponent('Cart');
                cartComponent.on('beforeShowContent', function onBeforeShowContent() {
                    thisContext.resetViewsArray();
                });

                cartComponent.on('afterShowContent', function onAfterShowContent() {
                    thisContext.processCartRender(cartComponent);
                });
            },

            /**
             * resets the arrays of views
             */
            resetViewsArray: function initializeViewsArray() {
                this.views = [];
            },

            /**
             * Look for the items in the shooping cart and assing each item to a childView of the views array
             * This method assumes that the order in which the views are added as child views and the order of the items in the shopping cart is the same
             * a workaround was put in place in case of childView that were not added to a CartItemView
             * @param {VisualComponent} cart
             */
            processCartRender: function processCartRender(cart) {
                var thisContext = this;
                this.views;
                cart.getLines().done(function doneGetLines(cartLines) {
                    var cartLinesWithoutNoPromoGifts = _.filter(cartLines, function cartLinesFilter(cartLine) {
                        return !cartLine.extras.free_gift_info;
                    });;
                    var cartLinesWithPromoGifts = _.filter(cartLines, function cartPromoItemsLinesFilter(cartLine) {
                        return !!cartLine.extras.free_gift_info;
                    });
                    var processedCartLines = cartLinesWithoutNoPromoGifts.concat(cartLinesWithPromoGifts);
                    var offset = 0;
                    // eslint-disable-next-line no-undef
                    _(processedCartLines).each(function eachCartLines(cartLine, index) {
                        var view = thisContext.views[offset + index];
                        // WORKAROUND:
                        // use view validator since rendering of Saved for Later lines are added to
                        // the views array if view in index is from Saved for Later, skip it

                        while (view && !thisContext.isValidView(view)) {
                            // offset += 1;
                            view = thisContext.views[offset + index];
                        }
                        view.updateView(cartLine);
                    });
                });
            },

            /**
             * validates the view was assigned to a CartItemView
             * @param {Backbone.View} view
             */
            isValidView: function isValidView(view) {
                var $cartLinesDataView = view.$el.parents('[data-type="order-item"]');
                return $cartLinesDataView && $cartLinesDataView.length > 0;
            },

            /**
             * Attach the render of the views listening to the cart events
             * @param {CompnentContainer} container
             */
            setupCartEvents: function addCartEvents(container) {
                /** @type {CartComponent} */
                var cartComponent = container.getComponent('Cart');
                var layout = container.getLayout();
                var thisContext = this;

                var events = ['AddLine', 'UpdateLine', 'RemoveLine'];
                // eslint-disable-next-line no-undef
                _(events).each(function onEachEvent(event) {
                    cartComponent.on('before' + event, function onBeforeEvent() {
                        if (thisContext.isCartPage(layout, cartComponent)) {
                            thisContext.resetViewsArray();
                        }
                    });
                    cartComponent.on('after' + event, function onAfterEvent() {
                        if (thisContext.isCartPage(layout, cartComponent)) {
                            thisContext.processCartRender(cartComponent);
                        }
                    });
                });
            },

            /**
             * Validates if the current view correspond to the cart component
             * @param {VisualComponent} layout
             * @param {VisualComponent} cart
             */
            isCartPage: function isCartPage(layout, cartComponent) {
                var currentView = layout.currentView;
                if (currentView) {
                    // eslint-disable-next-line no-underscore-dangle
                    return cartComponent._isViewFromComponent(currentView);
                }
                return false;
            },

            /**
             * Add the childViews to the CartItemView childviews in a given placeholder
             * @param {object} options
             */
            addChildViewToComponent: function addChildViewToComponent(options) {
                var container = options.container;
                var cartComponent = container.getComponent('Cart');
                var childView = options.childView;
                var placeholderChildView = options.placeholderChildView;
                var thisContext = this;

                cartComponent.addChildView(placeholderChildView, function () {
                    var view = new childView({
                        container: container
                    });
                    thisContext.views.push(view);
                    return view;
                });
            },

            /**
             * Gets the attribute inside the cart line object.
             * @param {object} cartLine 
             * @param {string} property 
             * @returns {object} cartLineProperty
             */
            getPropertyFromCartLine: function getPropertyFromCartLine(cartLine, property) {
                if (!cartLine) {
                    return null;
                } else if(cartLine && cartLine[property]) {
                    return cartLine[property]; 
                } else if (cartLine.item) {
                    return cartLine.item[property] || cartLine.item.extras[property];
                } else if (cartLine.get('item')) {
                    return cartLine.get('item')[property] || cartLine.get('item').get(property);
                }
            },

            /**
             * Returns all the data for the quantity alert.
             * @param {object} cartLine 
             * @returns {object} quantityAlertData
             */
            getQuantityAlertLineData: function getQuantityAlertLineData(cartLine) {
                var quantityAlertData = {};
                quantityAlertData.isbackorderable = this.getPropertyFromCartLine(cartLine, 'isbackorderable');
                quantityAlertData.maxQuantity = this.getPropertyFromCartLine(cartLine, 'maximumquantity');
                quantityAlertData.quantityRequested = this.getPropertyFromCartLine(cartLine, 'quantity');
                quantityAlertData.quantityAvailable = this.getPropertyFromCartLine(cartLine, 'quantityavailable');
                quantityAlertData.doNotReorderFlag = this.getPropertyFromCartLine(cartLine, 'custitem_do_not_reorder_flag');
                quantityAlertData.message = this.getParsedQuantityAlertMessage(cartLine);
                quantityAlertData.showQuantityAlert = this.displayQuantityAlert(quantityAlertData);
                return quantityAlertData;
            },
    
            /**
             * Returns the parsed quantity alert message with the data from the configuration.
             * @param {object} cartLine 
             * @return {string} messageFromConfiguration
             */
            getParsedQuantityAlertMessage: function getParsedQuantityAlertMessage(cartLine) {
                try {
                    var self = this;
                    var messageFromConfiguration = SC.CONFIGURATION.quantityalert.text;
                    var cartLineKeyMapping = SC.CONFIGURATION.quantityalert.mapping;
                    _.each(cartLineKeyMapping, function (key) {
                        var keyTextInMessage = '['+key.messageText+']';
                        var itemValueToDisplay = self.getPropertyFromCartLine(cartLine,key.cartLineAttribute);
                        messageFromConfiguration = messageFromConfiguration.replace(keyTextInMessage, itemValueToDisplay);
                    });
                    return messageFromConfiguration;
                } catch (exc) {
                    console.log('There was an error while processing the quantity alert message.');
                }
            },
            
            /**
             * Return whether the the quantity alert should be displayed or not.
             * @return {boolean}
             */
            displayQuantityAlert: function displayQuantityAlert(quantityAlertData) {
                return !!SC.CONFIGURATION.quantityalert.showquantityalert && quantityAlertData.doNotReorderFlag && !quantityAlertData.isbackorderable 
                && (!quantityAlertData.maxQuantity || quantityAlertData.maxQuantity < quantityAlertData.quantityRequested) && (quantityAlertData.quantityAvailable < quantityAlertData.quantityRequested);
            }
        };
    });
