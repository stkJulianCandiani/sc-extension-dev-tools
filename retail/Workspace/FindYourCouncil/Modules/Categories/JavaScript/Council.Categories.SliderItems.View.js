define('Council.Categories.SliderItems.View', [
    'Council.Categories.Collection.SliderItems.View',
    'Merchandising.Item',

    'council_categories_slider_items.tpl',
    'merchandising_zone_cell_template.tpl',
    'custom_merchandising_zone_row_template.tpl',

    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'Backbone'
], function CouncilCategoriesSliderItemsView(
    CouncilCategoriesCollectionSliderItemsView,
    MerchandisingItem,

    councilCategoriesSliderItemsTemplate,
    merchandisingZoneCellTemplateTpl,
    merchandisingZoneRowTemplateTpl,

    BackboneCompositeView,
    BackboneCollectionView,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: councilCategoriesSliderItemsTemplate,

        attributes: {
            'id': 'category-council-slider-items',
            'class': 'view category-council-slider-items'
        },

        initialize: function initialize() {
            BackboneCompositeView.add(this);
        },

        childViews: {
            'CategoryItems': function CategoryItems() {
                var items = this.model.get('items') || {};
                var collection = (items && items.models) ? items.models : [];

                return new CouncilCategoriesCollectionSliderItemsView({
                    application: this.options.application,
                    collection: collection
                });
            }
        },

        getContext: function getContext() {
            return {
                hasItems: (this.options.items && this.options.items.length)
            };
        }
    });
});
