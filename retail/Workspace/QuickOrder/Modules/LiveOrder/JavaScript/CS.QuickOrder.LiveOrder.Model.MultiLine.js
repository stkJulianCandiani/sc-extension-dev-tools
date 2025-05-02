/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.LiveOrder.Model.MultiLine', [
    'LiveOrder.Model',
    'Tracker',
    'AjaxRequestsKiller',
    'underscore',
    'jQuery'
], function CSQuickOrderLiveOrderModelMultiLine(
    LiveOrder,
    Tracker,
    AjaxRequestsKiller,
    _,
    jQuery
) {
    'use strict';

    var originalModel = LiveOrder.prototype.linesCollection.prototype.model;

    var LiveOrderLineModel = originalModel.extend({

        // eslint-disable-next-line no-undef
        url: _.getAbsoluteUrl(getExtensionAssetsPath('services/CS.QuickOrder.LiveOrder.MultiLine.Service.ss')),

        toJSON: function toJSON() {
            var ret = originalModel.prototype.toJSON.apply(this, arguments);
            ret.referenceLine = this.get('referenceLine');
            return ret;
        }
    });

    var LiveOrderLineCollection = LiveOrder.prototype.linesCollection.extend({

        // eslint-disable-next-line no-undef
        url: _.getAbsoluteUrl(getExtensionAssetsPath('services/CS.QuickOrder.LiveOrder.MultiLine.Service.ss')),

        model: LiveOrderLineModel
    });

    _.extend(LiveOrder.prototype, {
        addMultipleItems: function addMultipleItems(items, options) {
            var linesCollection;
            var promise;

            // Prepares the input for the new collection
            var lines = _.map(items, function map(item) {
                var lineOptions = item.getPosibleOptions();
                return {
                    item: {
                        internalid: item.get('internalid')
                    },
                    quantity: item.get('quantity'),
                    options: _.values(lineOptions).length ? lineOptions : null,
                    referenceLine: item.get('referenceLine')
                };
            });

            // Creates the Collection
            linesCollection = new LiveOrderLineCollection(lines);

            // Saves it
            promise = linesCollection.sync('create', linesCollection, this.wrapOptionsSuccess(options));
            if (promise) {
                promise.fail(function fail() {

                });
            }

            return promise;
        },

        wrapOptionsSuccess: function wrapOptionsSuccess(options) {
            var self = this;
            var line;
            var item;
            // if passing a success function we need to wrap it
            // eslint-disable-next-line no-param-reassign
            options = options || {};
            options.success = _.wrap(options.success || jQuery.noop, function wrapSuccess(fn, itemModel, result) {
                // This method is called in 2 ways by doing a sync and by doing a save
                // if its a save result will be the raw object
                var attributes = result;
                // If its a sync result will be a string
                if (_.isString(result)) {
                    attributes = itemModel;
                }
                // Tho this should be a restful api, the live-order-line returns the full live-order back (lines and summary are interconnected)
                self.set(attributes);
                // Calls the original success function
                fn.apply(self, _.toArray(arguments).slice(1));
                line = self.get('lines').get(self.get('latest_addition'));
                item = line && line.get('item');

                if (item) {
                    Tracker.getInstance().trackAddToCart(item);
                }
            });
            options.killerId = AjaxRequestsKiller.getKillerId();
            return options;
        }
    });
});
