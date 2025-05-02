/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Helper', [
    'Backbone',
    'Merchandising.View',
    'Item.Collection',
    'underscore',
    'merch_zone_cms.tpl',
    'merch_zone_category_cms.tpl'
], function FirstLevelCategoryHelper(
    Backbone,
    MerchandisingView,
    ItemCollection,
    _,
    merchZoneCmsTpl
) {
    'use strict';

    var loadTpl = function loadTplIntoView(view, tplName) {
        var tplFn;

        if (tplName) {
            // we try to get the 'template' from the merchandising rule
            try {
                tplFn = _.requireModules(tplName + '.tpl');
            } catch (e) {
                console.warn('Template ' + tplName + ' is not ' +
                    'compiled into the application, using default');
            }
            if (tplFn) {
                view.template = tplFn;
            } else {
                view.template = merchZoneCmsTpl;
            }
        } else {
            view.template = merchZoneCmsTpl;
        }
    };

    return {

        registerMerchZonesEvent: function registerMerchZonesEvent(container) {
            // eslint-disable-next-line no-underscore-dangle
            var layout = container._layoutInstance;

            if (!SC.isPageGenerator()) {
                Backbone.Events.on('cms:custom:merchzones-rendered',
                    /**
                     *
                     * @param itemsData
                     * @param {{}} options
                     * @param {String} options.tpl
                     * @param {String} options.divId
                     *
                     */
                    function onMZRender(itemsData, options) {
                        /**
                         * this needs to be executed after the merchzone template was appended by SMT to the DOM
                         */
                        _.defer(function deferredAppend() {
                            var $placeHolder = layout.$('#' + options.divId);
                            var collection = new ItemCollection(itemsData.items);
                            var settings = $placeHolder.closest('.cms-merchandising-carousel-container').data() || {};
                            // data-carousel="carouselHome" attribute required to fire slider, value must match with slider configuration in SC.Configuration
                            var view = new MerchandisingView({
                                items: collection,
                                model: new Backbone.Model(_.extend({
                                    show: Infinity
                                }, itemsData, options, settings))
                            });

                            var containerTpl = settings.template;
                            loadTpl(view, containerTpl || options.tpl);

                            view.setElement($placeHolder[0]);
                            view.render();
                            view.trigger('afterMerchandAppendToDOM');
                        });
                    }
                );
            }
        }
    };
});
