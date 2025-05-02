define('Council.Categories.Collection.SliderItems.View', [
    'Merchandising.Item',

    'merchandising_zone_cell_template.tpl',
    'custom_merchandising_zone_row_template.tpl',

    'Council.Categories.Configuration',

    'Backbone.CollectionView',
    'Utils',
    'jQuery',
    'underscore'
], function CouncilCategoriesCollectionSliderItemsView(
    MerchandisingItem,

    merchandisingZoneCellTemplateTpl,
    merchandisingZoneRowTemplateTpl,

    Configuration,

    BackboneCollectionView,
    Utils,
    jQuery,
    _
) {
    'use strict';

    return BackboneCollectionView.extend({
        initialize: function initialize() {
            var self = this;
            var application = this.options.application;
            var collection = this.options.collection;

            BackboneCollectionView.prototype.initialize.call(this, {
                childView: MerchandisingItem,
                viewsPerRow: Infinity,
                cellTemplate: merchandisingZoneCellTemplateTpl,
                rowTemplate: merchandisingZoneRowTemplateTpl,
                collection: collection
            });

            application.getLayout().on('afterAppendView', function onAfterAppendView() {
                self.render();
                self.initSlider();
            });
        },

        initSlider: function initSlider() {
            var self = this;
            var sliderSettings = Configuration.carouselProduct[Utils.getDeviceType()];
            var element = this.$el.find('[data-row="merchandising-zone-row"]');

            this.currentDevice = Utils.getDeviceType();

            if (this.options.collection.length > sliderSettings.minToDisplaySlide) {
                element.removeClass('no-carousel-items');
                this.$slider = Utils.initBxSlider(element, sliderSettings);
            } else {
                element.addClass('no-carousel-items');
            }

            jQuery(window).on('resize', _.throttle(function onResizeThrottled() {
                if (self.currentDevice !== Utils.getDeviceType()) {
                    self.currentDevice = Utils.getDeviceType();
                    self.$slider.reloadSlider(Configuration.carouselProduct[Utils.getDeviceType()]);
                }
            }, 500));
        }
    });
});
