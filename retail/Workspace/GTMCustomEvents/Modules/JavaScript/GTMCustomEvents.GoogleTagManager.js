define('GTMCustomEvents.GoogleTagManager', ['GoogleTagManager', 'Tracker'], function (GoogleTagManager, Tracker) {
    'use strict';

    _.extend(GoogleTagManager, {
        trackEvent(event) {
            if (event && event.category && event.action) {
                const eventName = event.name || 'action';
                const eventData = {
                    event: eventName,
                    data: {
                        category: event.category,
                        action: event.action,
                        label: event.page || '/' + Backbone.history.fragment,
                        value: event.value || '',
                    },
                    eventCallback: event.callback,
                };

                // Triggers a Backbone.Event so others can subscribe to this event and add/replace data
                // before is send it to Google Tag Manager

                if (!JSON.parse(localStorage.getItem('trackEventValue') ?? '[]').includes(eventName)) {
                    Tracker.trigger(eventName, eventData, event);
                    this.pushData(eventData);
                    localStorage.setItem(
                        'trackEventValue',
                        JSON.stringify([...(JSON.parse(localStorage.getItem('trackEventValue')) ?? []), eventName])
                    );
                }
            }

            return this;
        },
        trackCheckoutAddShippingInfo: function (model) {
            var lines = model.get('lines');
            var eventName = 'addShippingInfo';
            var eventNameId = 'add_shipping_info';
            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var orderCoupon = model
                .get('promocodes')
                .filter(function (_promo) {
                    return _promo.type !== 'ITEM';
                })
                .map(function (_promo) {
                    return _promo.code;
                });

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: parseFloat(model.get('summary').discountedsubtotal.toFixed(2)),
                    coupon: orderCoupon.join(', '),
                    items: [],
                },
            };

            eventData.ecommerce.items = lines.models.map(function (line, index) {
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
                    ? parseFloat(parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2))
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
                                                      eventData.ecommerce.coupon.includes(_promocode.code)
                                                  ) {
                                                      var newDiscount = result + parseFloat(_promocode.rate);

                                                      return Math.abs(newDiscount) > 100 ? -100 : newDiscount;
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
                    ? line.get('discounts_impact').discounts.map(function (_discount) {
                          return _discount.promotion_couponcode;
                      })
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

            this.pushData(eventData);
            return this;
        },
        trackCheckoutAddPaymentInfo: function (model) {
            var lines = model.get('lines');
            var eventName = 'addPaymentInfo';
            var eventNameId = 'add_payment_info';
            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var orderCoupon = model
                .get('promocodes')
                .filter(function (_promo) {
                    return _promo.type !== 'ITEM';
                })
                .map(function (_promo) {
                    return _promo.code;
                });

            var payment_type =
                model.get('paymentmethods').models.length > 0
                    ? model.get('paymentmethods').models[0].get('type')
                    : localStorage.getItem('paymentmethod');

            payment_type = payment_type === 'undefined' ? '' : payment_type;

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    payment_type,
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: parseFloat(model.get('summary').discountedsubtotal.toFixed(2)),
                    coupon: orderCoupon.join(', '),
                    items: [],
                },
            };

            eventData.ecommerce.items = lines.models.map(function (line, index) {
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
                    ? parseFloat(parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2))
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
                                                      eventData.ecommerce.coupon.includes(_promocode.code)
                                                  ) {
                                                      var newDiscount = result + parseFloat(_promocode.rate);

                                                      return Math.abs(newDiscount) > 100 ? -100 : newDiscount;
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
                    ? line.get('discounts_impact').discounts.map(function (_discount) {
                          return _discount.promotion_couponcode;
                      })
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

            this.paymentEventData = Object.assign({}, eventData);
            this.pushData(eventData);
            return this;
        },
        trackCheckoutReview: function (model) {
            var lines = model.get('lines');
            var eventName = 'checkoutReview';
            var eventNameId = 'checkout_review';
            var selectedItems = localStorage.getItem('selectedItems')
                ? JSON.parse(localStorage.getItem('selectedItems'))
                : [];

            var orderCoupon = model
                .get('promocodes')
                .filter(function (_promo) {
                    return _promo.type !== 'ITEM';
                })
                .map(function (_promo) {
                    return _promo.code;
                });

            var payment_type =
                model.get('paymentmethods').models.length > 0
                    ? model.get('paymentmethods').models[0].get('type')
                    : localStorage.getItem('paymentmethod');

            payment_type = payment_type === 'undefined' ? '' : payment_type;

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    payment_type,
                    currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    value: parseFloat(model.get('summary').discountedsubtotal.toFixed(2)),
                    coupon: orderCoupon.join(', '),
                    items: [],
                },
            };

            eventData.ecommerce.items = lines.models.map(function (line, index) {
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
                    ? parseFloat(parseFloat(line.get('aggregatedTotal').replace('$', '')).toFixed(2))
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
                                                      eventData.ecommerce.coupon.includes(_promocode.code)
                                                  ) {
                                                      var newDiscount = result + parseFloat(_promocode.rate);

                                                      return Math.abs(newDiscount) > 100 ? -100 : newDiscount;
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
                    ? line.get('discounts_impact').discounts.map(function (_discount) {
                          return _discount.promotion_couponcode;
                      })
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

            localStorage.removeItem('isPurchaseTriggered');
            this.paymentEventData = Object.assign({}, eventData);
            this.pushData(eventData);
            return this;
        },
        trackTransaction: function (transaction) {
            var self = this;
            var eventName = 'transaction';
            var eventNameId = 'purchase';

            var transaction_id = transaction.get('confirmationNumber');
            var currency = SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl;
            var value = this.paymentEventData.ecommerce.value;
            var tax = transaction.get('taxTotal');
            var shipping = transaction.get('shippingCost') + transaction.get('handlingCost');
            var coupon = this.paymentEventData.ecommerce.coupon;

            var eventData = {
                event: eventNameId,
                ecommerce: {
                    transaction_id,
                    currency,
                    value,
                    coupon,
                    tax,
                    shipping,
                    items: [],
                },
            };

            if (this.paymentEventData) {
                eventData.ecommerce.items = this.paymentEventData.ecommerce.items;
            } else {
                _.each(transaction.get('promocodes'), function (promo) {
                    eventData.ecommerce.coupon.push(promo.code);
                });

                for (var it = 0, _item; (_item = transaction.get('products').models[it]); it++) {
                    var result = self.findCategoryAndListInDataLayer(_item);

                    var item_id = _item.get('itemid');
                    var item_name = _item.get('name');
                    var quantity = _item.get('quantity');
                    var price = _item.get('rate');
                    var item_category = result ? result.category || '' : [];
                    var item_brand = ''; // no funciona
                    var item_list_name = '';
                    var item_list_id = '';

                    eventData.ecommerce.items.push({
                        item_id,
                        item_name,
                        index: it,
                        item_brand,
                        item_category,
                        price,
                        quantity,
                        item_list_id,
                        item_list_name,
                    });
                }
            }

            // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
            localStorage.removeItem('selectedItems');
            localStorage.removeItem('paymentmethod');

            if (!localStorage.getItem('isPurchaseTriggered')) {
                this.pushData(eventData);
                Tracker.trigger(eventName, eventData, transaction);
                localStorage.setItem('isPurchaseTriggered', true);
            }

            return this;
        },
    });
});
