define('GTMShoppingEvents.GoogleTagManager', [
    'GoogleTagManager',
    'LiveOrder.Model',
    'Tracker',
], function (GoogleTagManager, LiveOrderModel, Tracker) {
    'use strict';

    _.extend(GoogleTagManager, {
        trackProductView: function (line) {
            var item = line.getItem();

            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var itemSelected = selectedItems.find(function (_itemSelected) {
                return item.get('keyMapping_name') === _itemSelected.displayName;
            });

            if (this.item && this.item.get('itemId') === item.get('_id')) {
                // Obtener los datos para el item.
                item.set('category', this.item.get('category'), { silent: true });
                item.set('list', this.item.get('list'), { silent: true });

                var lastItemTitle = localStorage.getItem('lastItemTitle');
                lastItemTitle = !lastItemTitle ? undefined : lastItemTitle;

                if (
                    item.get('category') &&
                    item.get('category') !== '/cart' &&
                    !item.get('category').includes(lastItemTitle)
                ) {
                    var splitCategory = item.get('category').split('/');
                    var list_id = splitCategory[splitCategory.length - 1].replace('-', '_');
                    var list_name = list_id.replaceAll('_', ' ');
                    var listNameSplit = list_name.split(' ');

                    list_name = listNameSplit
                        .map(function (_word) {
                            return _word.charAt(0).toUpperCase() + _word.slice(1);
                        })
                        .join(' ');

                    item.set('item_list_id', list_id, { silent: true });
                    item.set('item_list_name', list_name, { silent: true });
                }
            }

            if (item.get('item_list_id')) {
                // Modificar el localStorage con los datos del item.
                if (!itemSelected) {
                    itemSelected = {
                        listId: list_id,
                        listName: list_name,
                        displayName: item.get('keyMapping_name'),
                        isInCart: false,
                    };

                    selectedItems.push(itemSelected);
                } else {
                    itemSelected.listId = itemSelected.isInCart
                        ? itemSelected.listId
                        : item.get('item_list_id');
                    itemSelected.listName = itemSelected.isInCart
                        ? itemSelected.listName
                        : item.get('item_list_name');
                }

                localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            }

            var eventNames = ['selectItem', 'productView'];
            var eventNameIds = ['select_item', 'view_item'];
            var result = this.findCategoryAndListInDataLayer(line);

            var isAgregatedTotal = line.get('aggregatedTotal')
                ? line.get('aggregatedTotal').length > 0
                : false;
            var agregatedFormated = isAgregatedTotal ? line.get('aggregatedTotal') : '';
            var agregatedAmount =
                agregatedFormated !== '' ? parseFloat(agregatedFormated.replace('$', '')) : false;
            var item_id = item.get('itemid');
            var item_name = line.get('item').get('_name');
            var quantity = line.get('quantity');
            var price = agregatedAmount
                ? parseFloat((agregatedAmount / quantity).toFixed(2))
                : item.get('onlinecustomerprice_detail').onlinecustomerprice;
            var total = price * quantity;
            var haveDiscount =
                !isNaN(item.get('_comparePriceAgainst')) &&
                !isNaN(item.get('onlinecustomerprice_detail').onlinecustomerprice)
                    ? item.get('_comparePriceAgainst') !==
                      item.get('onlinecustomerprice_detail').onlinecustomerprice
                    : false;
            var discount = haveDiscount ? item.get('_comparePriceAgainst') - price : 0;
            discount = parseFloat(discount.toFixed(2));
            var coupon = line.get('promotion_discount') || ''; // no funciona
            var item_category = this.getCategory();
            var item_brand = ''; // no funciona
            var item_list_id = itemSelected ? itemSelected.listId : '';
            var item_list_name = itemSelected ? itemSelected.listName : '';
            var index = 0;
            var items = [
                {
                    item_id,
                    item_name,
                    coupon,
                    discount,
                    index,
                    item_brand,
                    item_category,
                    price,
                    quantity,
                    item_list_id,
                    item_list_name,
                },
            ];

            //select_item
            var eventData0 = {
                event: eventNameIds[0],
                ecommerce: {
                    item_list_id,
                    item_list_name,
                    items: items,
                },
                source: 'GTM',
            };

            //view_item
            var eventData1 = {
                event: eventNameIds[1],
                ecommerce: {
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: total,
                    items: items,
                },
                source: 'GTM',
            };

            this.item = null;

            // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
            Tracker.trigger(eventNames[0], eventData0, item);
            this.pushData(eventData0);
            Tracker.trigger(eventNames[1], eventData1, item);
            this.pushData(eventData1);

            window.currentItem = {
                title: line.get('item').get('urlcomponent'),
            };

            return this;
        },
        trackAddToWishlist: function (line) {
            if (line) {
                var item = line.get('item');
                var eventName = 'addToWishlist';
                var eventNameId = 'add_to_wishlist';
                var selected_options = line.get('options').filter(function (option) {
                    return option.get('value') && option.get('value').label;
                });
                var selectedItems = localStorage.getItem('selectedItems')
                    ? JSON.parse(localStorage.getItem('selectedItems'))
                    : [];
                var itemSelected = selectedItems.find(function (_itemSelected) {
                    return _itemSelected.displayName === item._keyMapping._name(item);
                });

                var isAgregatedTotal = line.get('aggregatedTotal')
                    ? line.get('aggregatedTotal').length > 0
                    : false;
                var agregatedFormated = isAgregatedTotal ? line.get('aggregatedTotal') : '';
                var agregatedAmount =
                    agregatedFormated !== ''
                        ? parseFloat(agregatedFormated.replace('$', ''))
                        : false;
                var item_id = item.get('itemid');
                var item_name = item.get('_name');
                var quantity = line.get('quantity');
                var price = agregatedAmount
                    ? parseFloat((agregatedAmount / quantity).toFixed(2))
                    : item.get('onlinecustomerprice');
                var total = price * quantity;
                var haveDiscount =
                    item.get('_comparePriceAgainst') !== item.get('onlinecustomerprice');
                var discount = haveDiscount ? item.get('_comparePriceAgainst') - price : 0;
                var coupon = line.get('promotion_discount') || ''; // no funciona
                var item_category = this.getCategory();
                var item_brand = ''; // no funciona
                var item_list_name = itemSelected ? itemSelected.listName : '';
                var item_list_id = itemSelected ? itemSelected.listId : '';
                var index = 0;
                var variant = _.map(selected_options, function (option) {
                    return option.get('value').label;
                }).join(', ');

                var eventData = {
                    event: eventNameId,
                    ecommerce: {
                        currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                        value: total,
                        items: [
                            {
                                item_id,
                                item_name,
                                coupon,
                                discount,
                                index,
                                item_brand,
                                item_category,
                                price,
                                quantity,
                                item_list_id,
                                item_list_name,
                                variant,
                            },
                        ],
                        source: 'GTM',
                    },
                };

                // Triggers a Backbone.Event so others can subscribe to this event and add/replace
                // data before is send it to Google Tag Manager
                Tracker.trigger(eventName, eventData, line);
                this.pushData(eventData);
            }

            return this;
        },
        trackCartUpdate: function (line) {
            if (line.id) this.trackAddToCart(line);
        },
        trackRemoveFromCart: function (line, qty) {
            if (line.id) this.trackAddToCart(line);
        },
        trackAddToCartSpecificQuantity: function (line, qty) {
            if (line.id) this.trackAddToCart(line);
        },
        trackAddToCart: function (line) {
            var typesList = ['add', 'update', 'remove'];
            var cartEventType = localStorage.getItem('cartEventType');

            if (
                line &&
                cartEventType &&
                typesList.some(function (_type) {
                    return cartEventType.includes(_type);
                })
            ) {
                var eventData = {};
                var eventName = 'addToCart';
                var eventNameId = 'add_to_cart';
                var item = line.items ? null : line.get('item');
                var liveOrderModel = LiveOrderModel.getInstance();
                var selectedItems = localStorage.getItem('selectedItems')
                    ? JSON.parse(localStorage.getItem('selectedItems'))
                    : [];
                var itemSelected = item
                    ? selectedItems.find(function (_itemSelected) {
                          return _itemSelected.displayName === item._keyMapping._name(item);
                      })
                    : null;

                if (cartEventType.includes('update')) eventNameId = 'update_cart';

                if (cartEventType.includes('remove')) {
                    eventNameId = 'remove_from_cart';

                    selectedItems = item
                        ? selectedItems.filter(function (_itemSelected) {
                              return _itemSelected.displayName !== item._keyMapping._name(item);
                          })
                        : selectedItems;
                }

                if (cartEventType.includes('add') && !cartEventType.includes('quick')) {
                    itemSelected.isInCart = true;
                }

                var orderCoupon = liveOrderModel.get('promocodes')
                    ? liveOrderModel
                          .get('promocodes')
                          .filter((_promo) => _promo.type !== 'ITEM')
                          .map((_promo) => _promo.code)
                    : [];

                var selected_options =
                    line.get && line.get('options')
                        ? line.get('options').filter(function (option) {
                              return option.get('value') && option.get('value').label;
                          })
                        : [];

                if (cartEventType.includes('quick')) {
                    eventData = {
                        event: eventNameId,
                        ecommerce: {
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            coupon: orderCoupon.join(', '),
                            value: 0,
                            source: 'GTM',
                        },
                    };

                    var items = !line.items ? [line.get('item')] : line.items;

                    eventData.ecommerce.items = items.map(function (_item, index) {
                        if (cartEventType.includes('add')) {
                            selectedItems = [
                                ...selectedItems,
                                {
                                    listId: 'quick_order',
                                    listName: 'Quick Order',
                                    displayName: _item._keyMapping._name(_item),
                                    isInCart: true,
                                },
                            ];
                        }

                        var item_id = _item.get('itemid');
                        var item_name = _item.get('_name');
                        var quantity = _item.get('quantity');
                        var discount =
                            line.attributes && line.get('discount')
                                ? line.get('discount') / quantity
                                : 0;
                        var discountByItem = parseFloat(
                            (
                                discount +
                                (_item.get('pricelevel8') - _item.get('onlinecustomerprice'))
                            ).toFixed(2)
                        );
                        var item_brand = '';
                        var item_category = _item.get('_url');
                        var total = _item.get('onlinecustomerprice') * _item.get('quantity');
                        var price = _item.get('onlinecustomerprice');
                        var item_list_name = itemSelected ? itemSelected.listName : 'Quick Order';
                        var item_list_id = itemSelected ? itemSelected.listId : 'quick_order';
                        var coupon =
                            line.get && line.get('discounts_impact')
                                ? line.get('discounts_impact').discounts.map(function (_discount) {
                                      return _discount.promotion_couponcode;
                                  })
                                : [];
                        var variant = _.map(selected_options, function (option) {
                            return option.get('value').label;
                        }).join(', ');

                        eventData.ecommerce.value += total;

                        return {
                            item_id,
                            item_name,
                            coupon: coupon.join(', '),
                            discount: discountByItem,
                            index,
                            item_brand,
                            item_category,
                            price,
                            quantity,
                            item_list_id,
                            item_list_name,
                            variant,
                        };
                    });
                } else {
                    var item_id = item.get('itemid');
                    var item_name = item.get('_name');
                    var quantity = line.get('quantity');
                    var discountByItem = parseFloat(
                        (
                            line.get('discount') / quantity +
                            (item.get('pricelevel8') - item.get('onlinecustomerprice'))
                        ).toFixed(2)
                    );
                    var discount = parseFloat(line.get('discount').toFixed(2));
                    var index = 0;
                    var item_brand = '';
                    var item_category = item.get('_url');
                    var total = line.get('aggregatedTotal')
                        ? parseFloat(
                              parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2)
                          )
                        : line.get('amount') - discount;
                    var price = parseFloat((total / quantity).toFixed(2));
                    var item_list_name = itemSelected ? itemSelected.listName : '';
                    var item_list_id = itemSelected ? itemSelected.listId : '';
                    var coupon = line.get('discounts_impact')
                        ? line
                              .get('discounts_impact')
                              .discounts.map((_discount) => _discount.promotion_couponcode)
                        : [];
                    var variant = _.map(selected_options, function (option) {
                        return option.get('value').label;
                    }).join(', ');

                    eventData = {
                        event: eventNameId,
                        ecommerce: {
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            value: total,
                            coupon: orderCoupon.join(', '),
                            items: [
                                {
                                    item_id,
                                    item_name,
                                    coupon: coupon.join(', '),
                                    discount: discountByItem,
                                    index,
                                    item_brand,
                                    item_category,
                                    price,
                                    quantity,
                                    item_list_id,
                                    item_list_name,
                                    variant,
                                },
                            ],
                            source: 'GTM',
                        },
                    };
                }

                localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
                localStorage.removeItem('cartEventType');

                // Triggers a Backbone.Event so others can subscribe to this event and add/replace
                // data before is send it to Google Tag Manager
                Tracker.trigger(eventName, eventData, line);
                this.pushData(eventData);
            }
            return this;
        },
        trackViewCart: function (model) {
            var lines = model.get('lines') || model.collection;
            var eventName = 'viewCart';
            var eventNameId = 'view_cart';
            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: model.get('summary')?.discountedsubtotal || 0,
                    items: [],
                    source: 'GTM',
                },
            };

            if (model.get('promocodes')) {
                var orderCoupon = model
                    .get('promocodes')
                    .filter((_promo) => _promo.type !== 'ITEM')
                    .map((_promo) => _promo.code);

                eventData.ecommerce.coupon = orderCoupon.join(', ');

                eventData.ecommerce.items = lines.models.map((line, index) => {
                    var item = line.get('item');
                    var selected_options = line.get('options').filter(function (option) {
                        return option.get('value') && option.get('value').label;
                    });
                    var itemSelected = selectedItems.find(function (_itemSelected) {
                        return _itemSelected.displayName === item._keyMapping._name(item);
                    });

                    var item_id = item.get('itemid');
                    var item_name = item.get('_name');
                    var quantity = line.get('quantity');
                    var discountByItem = parseFloat(
                        (
                            line.get('discount') / quantity +
                            (item.get('pricelevel8') - item.get('onlinecustomerprice'))
                        ).toFixed(2)
                    );
                    var discount = parseFloat(line.get('discount').toFixed(2));
                    var item_brand = '';
                    var item_category = item.get('_url');
                    var total = line.get('aggregatedTotal')
                        ? parseFloat(
                              parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2)
                          )
                        : line.get('amount') - discount;
                    var price = parseFloat((total / quantity).toFixed(2));
                    var finalPrice =
                        eventData.ecommerce.coupon !== ''
                            ? parseFloat(
                                  (
                                      price +
                                      price *
                                          parseFloat(
                                              model
                                                  .get('promocodes')
                                                  .reduce(function (result, _promocode) {
                                                      if (
                                                          _promocode.type === 'ORDER' &&
                                                          eventData.ecommerce.coupon.includes(
                                                              _promocode.code
                                                          )
                                                      ) {
                                                          var newDiscount =
                                                              result + parseFloat(_promocode.rate);

                                                          return Math.abs(newDiscount) > 100
                                                              ? -100
                                                              : newDiscount;
                                                      }

                                                      return Math.abs(result) > 100 ? -100 : result;
                                                  }, 0.0)
                                                  .toFixed(2)
                                          ) *
                                          0.01
                                  ).toFixed(2)
                              )
                            : price;
                    discountByItem += finalPrice !== price ? price - finalPrice : 0.0;
                    var item_list_id = itemSelected ? itemSelected.listId : '';
                    var item_list_name = itemSelected ? itemSelected.listName : '';
                    var coupon = line.get('discounts_impact')
                        ? line
                              .get('discounts_impact')
                              .discounts.map((_discount) => _discount.promotion_couponcode)
                        : [];
                    var variant = _.map(selected_options, function (option) {
                        return option.get('value').label;
                    }).join(', ');

                    return {
                        item_id,
                        item_name,
                        coupon: coupon.join(', '),
                        discount: parseFloat(discountByItem.toFixed(2)),
                        index,
                        item_brand,
                        item_category,
                        price: finalPrice,
                        quantity,
                        item_list_id,
                        item_list_name,
                        variant,
                    };
                });
            }

            localStorage.removeItem('recently_viewed');
            this.pushData(eventData);
            return this;
        },
        trackBeginCheckout: function (model) {
            var lines = model.get('lines');
            var eventName = 'beginCheckout';
            var eventNameId = 'begin_checkout';
            var orderCoupon = model
                .get('promocodes')
                .filter((_promo) => _promo.type !== 'ITEM')
                .map((_promo) => _promo.code);
            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: model.get('summary').discountedsubtotal,
                    coupon: orderCoupon.join(', '),
                    items: [],
                    source: 'GTM',
                },
            };

            eventData.ecommerce.items = lines.models.map((line, index) => {
                var item = line.get('item');

                var selected_options = line.get('options').filter(function (option) {
                    return option.get('value') && option.get('value').label;
                });

                var itemSelected = selectedItems.find(function (_itemSelected) {
                    return _itemSelected.displayName === item._keyMapping._name(item);
                });

                var item_id = item.get('itemid');
                var item_name = item.get('_name');
                var quantity = line.get('quantity');
                var discountByItem = parseFloat(
                    (
                        line.get('discount') / quantity +
                        (item.get('pricelevel8') - item.get('onlinecustomerprice'))
                    ).toFixed(2)
                );
                var discount = parseFloat(line.get('discount').toFixed(2));
                var item_brand = '';
                var item_category = item.get('_url');
                var total = line.get('aggregatedTotal')
                    ? parseFloat(
                          parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2)
                      )
                    : line.get('amount') - discount;
                var price = parseFloat((total / quantity).toFixed(2));
                var finalPrice =
                    eventData.ecommerce.coupon !== ''
                        ? parseFloat(
                              (
                                  price +
                                  price *
                                      parseFloat(
                                          model
                                              .get('promocodes')
                                              .reduce(function (result, _promocode) {
                                                  if (
                                                      _promocode.type === 'ORDER' &&
                                                      eventData.ecommerce.coupon.includes(
                                                          _promocode.code
                                                      )
                                                  ) {
                                                      var newDiscount =
                                                          result + parseFloat(_promocode.rate);

                                                      return Math.abs(newDiscount) > 100
                                                          ? -100
                                                          : newDiscount;
                                                  }

                                                  return Math.abs(result) > 100 ? -100 : result;
                                              }, 0.0)
                                              .toFixed(2)
                                      ) *
                                      0.01
                              ).toFixed(2)
                          )
                        : price;
                discountByItem +=
                    finalPrice !== price ? parseFloat((price - finalPrice).toFixed(2)) : 0.0;
                var item_list_id = itemSelected ? itemSelected.listId : '';
                var item_list_name = itemSelected ? itemSelected.listName : '';
                var coupon = line.get('discounts_impact')
                    ? line
                          .get('discounts_impact')
                          .discounts.map((_discount) => _discount.promotion_couponcode)
                    : [];
                var variant = _.map(selected_options, function (option) {
                    return option.get('value').label;
                }).join(', ');

                return {
                    item_id,
                    item_name,
                    coupon: coupon.join(', '),
                    discount: discountByItem,
                    index,
                    item_brand,
                    item_category,
                    price: finalPrice,
                    quantity,
                    item_list_id,
                    item_list_name,
                    variant,
                };
            });

            this.pushData(eventData);
            return this;
        },
        trackProductListGeneric: function (eventName, items, listName) {
            // Pendiente por implementar listId y listName
            if (this.tracking_product_list) {
                this.resetTracker();
            }

            this.tracking_product_list = true;
            var self = this;
            var eventNameId = 'view_item_list';
            var itemListName = localStorage.getItem('itemListName');
            itemListName = itemListName || listName;
            var itemListId = itemListName ? itemListName.replaceAll(' ', '_').toLowerCase() : '';

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    item_list_id: itemListId,
                    item_list_name: itemListName,
                    items: [],
                },
                source: 'GTM',
            };

            eventData.ecommerce.items = items.models.map(function (_item, index) {
                _item.set('track_productlist_category', self.getCategory());

                var item_id = _item.get('itemid');
                var item_name = _item.get('displayname');
                var coupon = '';
                var discount = _item.get('discount') || 0.0;
                var item_brand = '';
                var item_category = '/' + _item.get('urlcomponent');
                var price = _item.get('onlinecustomerprice') || 0.0;
                var quantity = 1;

                return {
                    item_id,
                    item_name,
                    coupon,
                    discount,
                    index: index + 1,
                    item_brand,
                    item_category,
                    price,
                    quantity,
                    item_list_id: eventData.ecommerce.item_list_id,
                    item_list_name: eventData.ecommerce.item_list_name,
                };
            });

            // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
            localStorage.removeItem('itemListName');
            Tracker.trigger(eventName, eventData, items);
            this.pushData(eventData);

            this.resetTracker();

            this.tracking_product_list = false;

            return this;
        },
    });
});
