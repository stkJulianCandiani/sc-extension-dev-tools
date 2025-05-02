define('ProductDetails.ImageGallery.View.ZoomFix', [
    'ProductDetails.ImageGallery.View',
    'Utils',
    'underscore'
], function ProductDetailsImageGalleryViewZoomFix(
    ProductDetailsImageGalleryView,
    Utils,
    _
) {
    'use strict';

    _.extend(ProductDetailsImageGalleryView.prototype, {
        initialize: _.wrap(ProductDetailsImageGalleryView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));

            // CSECOM-3316 Product zoom not working, probably introduced in this file from other
            // core product patch related with the slider
            this.isZoomEnabled = true;
        }),

        initSlider: function initSlider(forceInit) {
            var redrawed = false;
            var self = this;

            if (this.images.length > 1 && (!this.$slider || forceInit === true)) {
                this.$slider = Utils.initBxSlider(this.$('[data-slider]'), {
                    buildPager: _.bind(this.buildSliderPager, this),
                    startSlide: 0,
                    adaptiveHeight: true,
                    touchEnabled: true,
                    nextText:
                        '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>',
                    prevText:
                        '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>',
                    controls: true,
                    onSliderLoad: function onSliderLoad() {
                        // This is needed because on mobile some times the first image is wrong
                        if (!redrawed && !SC.isPageGenerator()) {
                            setTimeout(function redrawSlider() {
                                self.$slider.redrawSlider();
                                redrawed = true;
                            }, 1000);
                        }
                    }
                });

                this.$('[data-action="next-image"]').off();
                this.$('[data-action="prev-image"]').off();

                this.$('[data-action="next-image"]').click(_.bind(this.nextImageEventHandler, this));
                this.$('[data-action="prev-image"]').click(
                    _.bind(this.previousImageEventHandler, this)
                );
            }
        }
    });
});
