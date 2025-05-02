define('GTMCustomEvents.Shopping.entrypoint', [
    'GTMCustomEvents.GoogleTagManager',
    'GTMCustomEvents.ExtendedViews.View',
], function (GTMCustomEventsGoogleTagManager, GTMCustomEventsExtendedViewsView) {
    'use strict';

    // return {
    //     mountToApp: function (container) {
    //         if (!SC.isPageGenerator()) {
    //             var layout = container.getLayout();
    //             layout.on('afterAppendView', function (view) {
    //                 //Attached to different events to fire the get title only when all the merchzone data is rendered.
    //                 if (CMS) {
    //                     CMS.on('page:content:set', function (params, a, b) {
    //                         Backbone.trigger('get:GTMcustomevents:title:done');
    //                     });
    //                 }
    //             });

    //             Backbone.on('get:GTMcustomevents:title:done', function () {
    //                 setTimeout(function () {
    //                     var items = $('.facets-item-cell-grid');

    //                     _.each(items, function (_item) {
    //                         $(_item).off('click');

    //                         $(_item).on('click', function () {
    //                             if (!this.eventTrigger) {
    //                                 var ItemsUtilities = require('CustomEvents.Items.Utilities');
    //                                 ItemsUtilities.findItemList(_item);
    //                             }

    //                             this.eventTrigger = true;
    //                         });
    //                     });
    //                 }, 3000);
    //             });
    //         }
    //     },
    // };
});
