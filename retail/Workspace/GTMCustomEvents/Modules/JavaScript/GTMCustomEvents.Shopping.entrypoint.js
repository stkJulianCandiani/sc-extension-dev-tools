define('GTMCustomEvents.Shopping.entrypoint', ['Backbone'], function (Backbone) {
    'use strict';

    try {
        var ItemsUtilities = require('GTMCustomEvents.Items.Utilities');

        var RelatedItemView = require('ItemRelations.Related.View');
        var relatedItemPrototype = RelatedItemView.prototype;
        _(relatedItemPrototype).extend({
            events: _.extend({}, relatedItemPrototype.events, {
                'click li.item-relations-cell': 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });

        var CorelatedItemView = require('ItemRelations.Correlated.View');
        var corelatedItemPrototype = CorelatedItemView.prototype;
        _(corelatedItemPrototype).extend({
            events: _.extend({}, corelatedItemPrototype.events, {
                'click li.item-relations-cell': 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });

        var CategoryCell = require('Facets.Browse.View');
        var categoryCellPrototype = CategoryCell.prototype;
        _(categoryCellPrototype).extend({
            events: _.extend({}, categoryCellPrototype.events, {
                'click .facets-item-cell-grid': 'setItemListInfo',
            }),
            setItemListInfo($event) {
                ItemsUtilities.findItemList($event.currentTarget);
            },
        });

        return {
            mountToApp: function (container) {
                if (!SC.isPageGenerator()) {
                    var layout = container.getLayout();
                    layout.on('afterAppendView', function (view) {
                        //Attached to different events to fire the get title only when all the merchzone data is rendered.
                        if (CMS) {
                            CMS.on('page:content:set', function (params, a, b) {
                                Backbone.trigger('get:GTMcustomevents:title:done');
                            });
                        }
                    });

                    Backbone.on('get:GTMcustomevents:title:done', function () {
                        setTimeout(function () {
                            var items = [];
                            var itemBoxes = document.querySelectorAll(
                                '.item-cell.item-cell-grid, .item-relations-cell'
                            );

                            for (var i = 0, item; (item = itemBoxes[i]); i++) {
                                items.push(item.parentNode);
                            }

                            _.each(items, function (_item) {
                                $(_item).off('click');

                                $(_item).on('click', function () {
                                    if (!this.eventTrigger) {
                                        ItemsUtilities.findItemList(_item);
                                    }

                                    this.eventTrigger = true;
                                });
                            });
                        }, 3000);
                    });
                }
            },
        };
    } catch (err) {
        throw new Error(err);
    }
});
