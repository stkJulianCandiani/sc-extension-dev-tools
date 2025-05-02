define('SliderChanges.ItemRelations.Related.View', [
    'SC.Configuration',
    'ItemRelations.Related.View',
    'Tracker',
    'Backbone',
    'jQuery',
    'Utils',
    'underscore',
], function SliderChangesItemRelationsRelatedView(
    Configuration,
    ItemRelationsRelatedView,
    Tracker,
    Backbone,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var viewPrototype = ItemRelationsRelatedView.prototype;

    _(viewPrototype).extend({
        loadRelatedItem: function loadRelatedItem() {
            var self = this;

            self.collection.fetchItems().done(function fetchItemsDone() {
                var carousel;
                var imgMinHeight;

                self.render();

                carousel = self.$el.find('[data-type="carousel-items"]');

                var itemListName = $(carousel.closest('aside.item-relations-related')).find('h3 span').text().trim();

                localStorage.setItem('itemListName', itemListName);

                if (self.collection.length) {
                    if (!self.view_tracked) {
                        Tracker.getInstance().trackProductListEvent(self.collection, 'Related Items');
                        self.view_tracked = true;
                    }
                }

                if (
                    Utils.isPhoneDevice() === false &&
                    self.options.application.getConfig('siteSettings.imagesizes', false)
                ) {
                    imgMinHeight = _.where(self.options.application.getConfig('siteSettings.imagesizes', []), {
                        name: self.options.application.getConfig('imageSizeMapping.thumbnail', ''),
                    })[0].maxheight;

                    carousel.find('.item-relations-related-item-thumbnail').css('minHeight', imgMinHeight);
                }

                Utils.initBxSlider(carousel, Configuration.defaultConfig[Utils.getDeviceType()]);

                self.currentDevice = Utils.getDeviceType();

                self.$relatedSlider = carousel;

                jQuery(window).on(
                    'resize',
                    _.throttle(function onResize() {
                        if (self.currentDevice === Utils.getDeviceType()) {
                            return;
                        }

                        Utils.resetViewportWidth();

                        self.windowWidth = jQuery(window).width();

                        if (self.$relatedSlider && self.$relatedSlider.length) {
                            self.$relatedSlider.reloadSlider(Configuration.defaultConfig[Utils.getDeviceType()]);
                        }
                    }, 1000)
                );
            });
        },
    });
});
