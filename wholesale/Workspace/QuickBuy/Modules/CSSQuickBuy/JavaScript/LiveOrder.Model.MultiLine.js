/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
*/

define('LiveOrder.Model.MultiLine', [
    'LiveOrder.Model',
    'AjaxRequestsKiller',
    'underscore',
    'Utils'
], function LiveOrderModelMultiLine(
    LiveOrder,
    AjaxRequestsKiller,
    _
) {
    'use strict';

    var originalModel = LiveOrder.prototype.linesCollection.prototype.model;
    var LiveOrderLineModel = originalModel.extend({
        url: _.getAbsoluteUrl('services/LiveOrder.MultiLine.Service.ss'),
        toJSON: function toJSON() {
            var ret = originalModel.prototype.toJSON.apply(this, arguments);
            ret.referenceLine = this.get('referenceLine');
            return ret;
        }
    });

    var LiveOrderLineCollection = LiveOrder.prototype.linesCollection.extend({
        url: _.getAbsoluteUrl('services/LiveOrder.MultiLine.Service.ss'),
        model: LiveOrderLineModel
    });

    _.extend(LiveOrder.prototype, {
        addMultipleItems: function addMultipleItems(items, options) {
            var linesCollection;
            var promise;

            // Prepares the input for the new collection
            var lines = _.map(items, function map(item) {
                var result = {};

				_.each(item.itemOptions, function (value, name)
				{
					result[name] = value.internalid;
                });
                
                var lineOptions = result
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
        wrapOptionsSuccess: function (options)
		{
			var self = this;
			// if passing a success function we need to wrap it
			options = options || {};
			options.success = _.wrap(options.success || jQuery.noop, function (fn, item_model, result)
			{
				// This method is called in 2 ways by doing a sync and by doing a save
				// if its a save result will be the raw object
				var attributes = result;
				// If its a sync result will be a string
				if (_.isString(result))
				{
					attributes = item_model;
				}

				// Tho this should be a restful api, the live-order-line returns the full live-order back (lines and summary are interconnected)
				self.set(attributes);

				// Calls the original success function
				fn.apply(self, _.toArray(arguments).slice(1));

				var line = self.get('lines').get(self.get('latest_addition'))
				,	item = line && line.get('item');

				if (item)
				{
					Tracker.getInstance().trackAddToCart(item);
				}
			});

			options.killerId = AjaxRequestsKiller.getKillerId();

			return options;
		}
    });
});
