/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('FirstLevelCategory.Merchandising.View', [
    'Merchandising.View',
    'FirstLevelCategory.Merchandising.Item.View',
    'SC.Configuration',
    'Backbone.CollectionView',
    'merchandising_zone_cell_template.tpl',
    'firstlevelcategory_merchandising_zone_row_template.tpl',
    'Utils',
    'underscore'
], function FirstLevelCategoryMerchandisingView(
    MerchandisingView,
    FirstLevelCategoryMerchandisingItemView,
    Configuration,
    BackboneCollectionView,
    merchandisingZoneCellTemplateTpl,
    merchandisingZoneRowTemplateTpl,
    Utils,
    _
) {
    'use strict';

    var viewPrototype = MerchandisingView.prototype;

    _(viewPrototype).extend({
        initSlider: function initSlider() {
            var sliderConfigKey;
            var sliderSettingsConfig;
            var sliderSettings;
            var currentDevice = Utils.getDeviceType();
            var element;
            var hasMoreItemsToDisplayThanMinimum;

            if (this.model.get('carousel')) {
                sliderConfigKey = this.model.get('carousel');
                sliderSettingsConfig = Configuration[sliderConfigKey] || Configuration.bxSliderDefaults;
            } else {
                sliderSettingsConfig = Configuration.carouselProduct || Configuration.bxSliderDefaults;
            }

            sliderSettings = sliderSettingsConfig[currentDevice];
            element = this.$el.find('[data-row="merchandising-zone-row"]');
            hasMoreItemsToDisplayThanMinimum = sliderSettings.minToDisplaySlide
                && this.items.models && this.items.models.length > sliderSettings.minToDisplaySlide;

            if (hasMoreItemsToDisplayThanMinimum || !sliderSettings.minToDisplaySlide) {
                element.removeClass('no-carousel-items');
                this.$slider = Utils.initBxSlider(element, sliderSettings);
            } else {
                element.addClass('no-carousel-items');
            }
        },

        childViews: _(viewPrototype.childViews || {}).extend({
            'Zone.Items': function ZoneItems() {
                var itemsCollectionView = new BackboneCollectionView({
                    childView: FirstLevelCategoryMerchandisingItemView,
                    viewsPerRow: Infinity,
                    cellTemplate: merchandisingZoneCellTemplateTpl,
                    rowTemplate: merchandisingZoneRowTemplateTpl,
                    collection: _.first(this.items.models, this.model.get('show'))
                });
                return itemsCollectionView;
            }
        }),

        getContext: _.wrap(viewPrototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var hasItems = this.items.models && this.items.models.length;
            context.showTitle = this.model.get('showTitle') && hasItems;
            context.showDescription = this.model.get('showDescription');
            return context;
        })

    });
});
