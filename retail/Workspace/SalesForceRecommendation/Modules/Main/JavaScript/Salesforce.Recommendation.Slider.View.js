/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('Salesforce.Recommendation.Slider.View', [
    'salesforce_recommendation_slider.tpl',

    'Backbone',
    'jQuery',
    'underscore'
], function SalesForceRecommendationSliderView(
    salesforcerRecommendationSliderTpl,

    Backbone,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: salesforcerRecommendationSliderTpl,

        config: {},

        initialize: function initialize() {
            var self = this;
            var currentItem;
            this.environment = this.options.container.getComponent('Environment');

            this.config = this.environment.getConfig('salesforceRecommendation', {});
            try {
                if (SC.ENVIRONMENT.jsEnvironment !== 'browser' || !this.config.enabled || SC.isPageGenerator()) return;

                this.on('afterViewRender', function afterViewRender() {
                    if (this.options.pdp) {
                        currentItem = this.options.pdp.getItemInfo();
                        if (!currentItem) {
                            return;
                        }
                    }
                    this.loadScript().done(function afterLoadScript() {
                        self.copyContentFromLayoutPlaceholder();
                        setTimeout(function setTimeout() {
                            self.initializeMerchandizingZone();
                        }, 1500);
                    });
                });
            } catch (ex) {
                // eslint-disable-next-line no-console
                console.log('There has been an error while loading the salesforce items.' + ex);
            }
        },

        copyContentFromLayoutPlaceholder: function copyContentFromLayoutPlaceholder() {
            var $salesforceContainer = this.$el.find('[data-item="salesforce"]');
            var $salesforceLayoutPlaceholder = jQuery('#igdrec_1');
            $salesforceContainer.html($salesforceLayoutPlaceholder.html());
        },

        loadScript: function loadScript() {
            var self = this;
            var scriptUrl;
            var currentItem;
            var itemsku;
            var ret;

            var sectionConfig = _.find(this.config.sections, function findConfig(secConfig) {
                return secConfig.sectionid === self.options.section;
            });

            if (sectionConfig) {
                scriptUrl = sectionConfig.url;
                if (this.options.pdp) {
                    currentItem = this.options.pdp.getItemInfo();
                    if (currentItem) {
                        scriptUrl = _.addParamsToUrl(scriptUrl, { item: itemsku });
                    }
                }
                ret = jQuery.getScript(scriptUrl);
            }
            return ret;
        },

        setSliderSettings: function setSliderSettings() {
            this.currentSystemDevice = _.getDeviceType(); // This is used later for resizing purposes.
            this.currentDevice = (this.options.isModal && _.getDeviceType() !== 'Phone') ? 'modal' + _.getDeviceType() : _.getDeviceType();
            this.sliderSettingsConfig = this.environment.getConfig('carouselRecommendation') || this.environment.getConfig('bxSliderDefaults');
            this.sliderSettings = (this.options.isSingleItemSlider) ? this.sliderSettingsConfig.single : this.sliderSettingsConfig[this.currentDevice];
        },

        initializeMerchandizingZone: function initializeMerchandizingZone() {
            var self = this;
            var $defLoadImage;
            var numberOfSlidesToBeShown;
            var imagesToProcess;
            this.setSliderSettings();
            this.$slider = _.initBxSlider(this.$el.find('.igo_boxbody'), this.sliderSettings);
            this.$el.find('.salesforce-slider').addClass(this.options.section);

            if (this.options.isSingleItemSlider) {
                self.$slider.getCurrentSlideElement().closest('.bx-viewport').css('height', 'auto');
                self.fixSliderEventsAndRezising();
            } else {
                $defLoadImage = new jQuery.Deferred();
                numberOfSlidesToBeShown = this.sliderSettingsConfig[this.currentDevice].minSlides;
                imagesToProcess = (this.$slider.find('img').length > numberOfSlidesToBeShown) ?
                    _.first(this.$slider.find('img'), numberOfSlidesToBeShown) : this.$slider.find('img');

                jQuery(imagesToProcess).on('load', function afterImagesLoad() {
                    $defLoadImage.resolve();
                }).each(function loopLoadImage() {
                    if (this.complete) {
                        jQuery(this).trigger('load');
                    }
                });

                $defLoadImage.done(function afterLoadImage() {
                    self.fixModalHeight();
                    self.fixSliderEventsAndRezising();
                });
            }
        },

        fixSliderEventsAndRezising: function fixSliderEventsAndRezising() {
            this.$slider.reloadSlider(this.sliderSettings);
            this.$el.find('.salesforce-slider').css('visibility', 'visible');
            this.fixItems();
            this.resizeSliderListener();
            this.$('h2').html('Customers Also Bought');
        },

        fixModalHeight: function fixModalHeight() {
            // eslint-disable-next-line no-underscore-dangle
            var $currentModalElement = this.options.application._layoutInstance.$containerModal;
            var heightThreshold = 100;
            if ($currentModalElement) {
                $currentModalElement.find('.modal-backdrop').css('min-height', $currentModalElement.find('.modal-dialog').height() + heightThreshold);
            }
        },

        resizeSliderListener: function resizeSliderListener() {
            var self = this;
            jQuery(window).on('resize', _.throttle(function onResize() {
                var hasResolutionChange = (self.currentSystemDevice !== _.getDeviceType());
                if (!!self.options.isSingleItemSlider || !hasResolutionChange) {
                    return;
                }

                self.setSliderSettings();
                _.resetViewportWidth();
                if (self.$slider && self.$slider.length) {
                    self.$slider.reloadSlider(self.sliderSettings);
                }
            }, 1000));
        },

        fixItems: function fixItems() {
            this.$el.find('.igo_product').each(function loopIgoProducts() {
                var $currentElement = jQuery(this);
                var regPrice = parseFloat($currentElement.find('.igo_product_regular_price_value').text().replace('$', ''));
                var salePrice = parseFloat($currentElement.find('.igo_product_sale_price_value').text().replace('$', ''));

                if (regPrice === salePrice || _.isNaN(salePrice)) $currentElement.addClass('no-sale-price');
                if (!$currentElement.find('.igo_product_item_tag_value').html()) $currentElement.find('.igo_product_item_tag').addClass('not-visible');
            });
        }
    });
});
