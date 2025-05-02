define('Council.Categories.Configuration', [
    'underscore'
],
function CouncilCategoriesConfiguration(
    _
) {
    'use strict';

    return {
        councilImageUrl: '/assets/images/content/',
        carouselProduct: {
            desktop: {
                slideWidth: 235,
                maxSlides: 4,
                minSlides: 4,
                slideMargin: 46,
                forceStart: true,
                adaptiveHeight: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="merchandising-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right"></i></a>',
                prevText: '<a class="merchandising-carousel-prev"><i class="gs-icon-c-left"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            },
            smallDesktop: {
                slideWidth: 192,
                maxSlides: 4,
                minSlides: 4,
                slideMargin: 33,
                forceStart: true,
                adaptiveHeight: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="merchandising-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="merchandising-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            },
            tablet: {
                slideWidth: 200,
                maxSlides: 3,
                minSlides: 3,
                slideMargin: 41,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="merchandising-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="merchandising-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 3
            },
            phone: {
                slideWidth: 281,
                maxSlides: 1,
                minSlides: 1,
                forceStart: true,
                adaptiveHeight: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="merchandising-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="merchandising-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            }
        }
    };
});
