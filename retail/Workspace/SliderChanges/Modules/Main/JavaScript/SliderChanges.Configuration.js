/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('SliderChanges.Configuration', [
    'SC.Configuration',
    'underscore'
], function SliderChangesConfiguration(
    Configuration,
    _
) {
    'use strict';

    var sliderChangesConfiguration = {
        defaultConfig: {
            desktop: {
                controls: true,
                forceStart: true,
                maxSlides: 5,
                minSlides: 2,
                nextText: '<a class="item-relations-related-carousel-next"><span class="control-text">next</span> <i class="carousel-next-arrow"></i></a>',
                pager: false,
                preloadImages: 'all',
                prevText: '<a class="item-relations-related-carousel-prev"><i class="carousel-prev-arrow"></i> <span class="control-text">prev</span></a>',
                slideWidth: 228,
                touchEnabled: true
            },
            smallDesktop: {
                controls: true,
                forceStart: true,
                maxSlides: 5,
                minSlides: 2,
                nextText: '<a class="item-relations-related-carousel-next"><span class="control-text">next</span> <i class="carousel-next-arrow"></i></a>',
                pager: false,
                preloadImages: 'all',
                prevText: '<a class="item-relations-related-carousel-prev"><i class="carousel-prev-arrow"></i> <span class="control-text">prev</span></a>',
                slideWidth: 228,
                touchEnabled: true
            },
            tablet: {
                controls: true,
                forceStart: true,
                maxSlides: 5,
                minSlides: 3,
                nextText: '<a class="item-relations-related-carousel-next"><span class="control-text">next</span> <i class="carousel-next-arrow"></i></a>',
                pager: false,
                preloadImages: 'all',
                prevText: '<a class="item-relations-related-carousel-prev"><i class="carousel-prev-arrow"></i> <span class="control-text">prev</span></a>',
                touchEnabled: true
            },
            phone: {
                controls: true,
                forceStart: true,
                maxSlides: 1,
                minSlides: 1,
                nextText: '<a class="item-relations-related-carousel-next"><span class="control-text">next</span> <i class="carousel-next-arrow"></i></a>',
                pager: false,
                preloadImages: 'all',
                prevText: '<a class="item-relations-related-carousel-prev"><i class="carousel-prev-arrow"></i> <span class="control-text">prev</span></a>',
                touchEnabled: true
            }
        }
    };

    _.extend(Configuration, sliderChangesConfiguration);
});
