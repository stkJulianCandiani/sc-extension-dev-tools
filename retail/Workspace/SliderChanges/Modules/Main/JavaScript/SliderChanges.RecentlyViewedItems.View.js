define('SliderChanges.RecentlyViewedItems.View', [
    'SC.Configuration',
    'RecentlyViewedItems.View',
    'RecentlyViewedItems.Collection',
    'Tracker',
    'jQuery',
    'Utils',
    'underscore',
], function SliderChangesRecentlyViewedItemsView(
    Configuration,
    RecentlyViewedItemsView,
    RecentlyViewedItemsCollection,
    Tracker,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var viewPrototype = RecentlyViewedItemsView.prototype;

    _(viewPrototype).extend({
        loadRecentlyViewedItem: function loadRecentlyViewedItem() {
            var self = this;

            if (this.collection.promise) {
                this.collection.promise.done(function fetchItemsDone() {
                    var application = self.options.application;
                    var numberOfItemsDisplayed = application.getConfig('recentlyViewedItems.numberOfItemsDisplayed');
                    var carousel;
                    var thumbnail;
                    var imgMinHeight;

                    self.collection = self.collection.first(parseInt(numberOfItemsDisplayed, 10));
                    self.render();

                    carousel = self.$el.find('[data-type="carousel-items"]');

                    var itemListName = $(carousel.closest('aside.recently-viewed-items')).find('h3 span').text().trim();

                    localStorage.setItem('itemListName', itemListName);

                    if (self.collection.length) {
                        if (!localStorage.getItem('recently_viewed')) {
                            RecentlyViewedItemsCollection.getInstance().turnOnTracking();
                            localStorage.setItem('recently_viewed', true);
                        }
                    }

                    if (Utils.isPhoneDevice() === false && application.getConfig('siteSettings.imagesizes')) {
                        thumbnail = _.where(application.getConfig('siteSettings.imagesizes'), {
                            name: application.getConfig('imageSizeMapping.thumbnail'),
                        })[0];

                        imgMinHeight = thumbnail.maxheight;

                        carousel.find('.item-relations-related-item-thumbnail').css('minHeight', imgMinHeight);
                    }

                    if (carousel.find('li').length >= 4) {
                        Utils.initBxSlider(carousel, Configuration.defaultConfig[Utils.getDeviceType()]);

                        self.currentDevice = Utils.getDeviceType();

                        self.$recentlyViewedSlider = carousel;
                    }

                    jQuery(window).on(
                        'resize',
                        _.throttle(function onResize() {
                            if (self.currentDevice === Utils.getDeviceType()) {
                                return;
                            }

                            Utils.resetViewportWidth();

                            self.windowWidth = jQuery(window).width();

                            if (self.$recentlyViewedSlider && self.$recentlyViewedSlider.length) {
                                self.$recentlyViewedSlider.reloadSlider(
                                    Configuration.defaultConfig[Utils.getDeviceType()]
                                );
                            } else {
                                Utils.initBxSlider(carousel, Configuration.defaultConfig[Utils.getDeviceType()]);
                                self.currentDevice = Utils.getDeviceType();
                                self.$recentlyViewedSlider = carousel;
                            }
                        }, 1000)
                    );
                });
            }
        },
    });
});
