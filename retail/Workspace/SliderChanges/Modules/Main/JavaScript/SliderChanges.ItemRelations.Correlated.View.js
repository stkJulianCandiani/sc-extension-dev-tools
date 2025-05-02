define('SliderChanges.ItemRelations.Correlated.View', [
    'SC.Configuration',
    'ItemRelations.Correlated.View',
    'Tracker',
    'jQuery',
    'Utils',
    'underscore',
], function SliderChangesItemRelationsCorrelatedView(
    Configuration,
    ItemRelationsCorrelatedView,
    Tracker,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var viewPrototype = ItemRelationsCorrelatedView.prototype;

    _(viewPrototype).extend({
        loadRelatedItems: function loadRelatedItems() {
            var self = this;

            self.collection.fetchItems().done(function fetchItemsDone() {
                var carousel;
                var imgMinHeight;

                self.render();

                carousel = self.$el.find('[data-type="carousel-items"]');

                var itemListName = $(carousel.closest('aside.item-relations-correlated')).find('h3 span').text().trim();

                localStorage.setItem('itemListName', itemListName);

                if (self.collection.length) {
                    if (!self.view_tracked) {
                        Tracker.getInstance().trackProductListEvent(self.collection, 'Correlated Items');
                        self.view_tracked = true;
                    }
                }

                if (Utils.isPhoneDevice() === false && self.options.application.getConfig('siteSettings.imagesizes')) {
                    imgMinHeight = _.where(self.options.application.getConfig('siteSettings.imagesizes'), {
                        name: self.options.application.getConfig('imageSizeMapping.thumbnail'),
                    })[0].maxheight;

                    carousel.find('.item-relations-related-item-thumbnail').css('minHeight', imgMinHeight);
                }

                Utils.initBxSlider(carousel, Configuration.defaultConfig[Utils.getDeviceType()]);

                self.currentDevice = Utils.getDeviceType();

                self.$correlatedSlider = carousel;
            });

            jQuery(window).on(
                'resize',
                _.throttle(function onResize() {
                    if (self.currentDevice === Utils.getDeviceType()) {
                        return;
                    }

                    Utils.resetViewportWidth();

                    self.windowWidth = jQuery(window).width();

                    if (self.$correlatedSlider && self.$correlatedSlider.length) {
                        self.$correlatedSlider.reloadSlider(Configuration.defaultConfig[Utils.getDeviceType()]);
                    }
                }, 1000)
            );
        },
    });
});
