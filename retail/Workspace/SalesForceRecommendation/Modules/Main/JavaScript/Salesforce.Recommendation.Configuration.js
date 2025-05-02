/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Recommendation.Configuration', [
    'SC.Configuration',
    'underscore'
], function SFRConfiguration(
    Configuration,
    _
) {
    'use strict';

    var SalesforceRecommendationConfiguration = {

        carouselHome: {
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
        },
        carouselCategory: {
            desktop: {
                slideWidth: 225,
                maxSlides: 3,
                minSlides: 3,
                slideMargin: 41,
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
                minToDisplaySlide: 3
            },
            tablet: {
                slideWidth: 192,
                maxSlides: 2,
                minSlides: 2,
                slideMargin: 52,
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
                minToDisplaySlide: 1
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
                minToDisplaySlide: 2
            }
        },
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
        },
        councilImageUrl: '/assets/images/content/',

        carouselRecommendation: {
            desktop: {
                slideWidth: 235,
                maxSlides: 4,
                minSlides: 4,
                slideMargin: 46,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all'
            },
            smallDesktop: {
                slideWidth: 192,
                maxSlides: 4,
                minSlides: 4,
                slideMargin: 33,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            },
            modaldesktop: {
                slideWidth: 225,
                maxSlides: 3,
                minSlides: 3,
                slideMargin: 55.5,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 3
            },
            modaltablet: {
                slideWidth: 210,
                maxSlides: 2,
                minSlides: 2,
                slideMargin: 58,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 2
            },
            tablet: {
                slideWidth: 200,
                maxSlides: 3,
                minSlides: 3,
                slideMargin: 41,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 3
            },
            phone: {
                slideWidth: 280,
                maxSlides: 1,
                minSlides: 1,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><span class="control-text">' +
                _('next').translate() + '</span> <i class="gs-icon-c-right-2"></i></a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            },
            single: {
                slideWidth: 175,
                maxSlides: 1,
                minSlides: 1,
                adaptiveHeight: true,
                forceStart: true,
                pager: false,
                touchEnabled: true,
                nextText: '<a class="salesforce-carousel-next"><i class="gs-icon-c-right-2"></i> <span class="control-text">' +
                _('next').translate() + '</span> </a>',
                prevText: '<a class="salesforce-carousel-prev"><i class="gs-icon-c-left-2"></i> <span class="control-text">' +
                _('prev').translate() + '</span></a>',
                controls: true,
                preloadImages: 'all',
                minToDisplaySlide: 4
            }
        }
    };

    _.extend(Configuration, SalesforceRecommendationConfiguration);
});
