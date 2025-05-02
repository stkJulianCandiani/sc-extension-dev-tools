define('Council.Categories.MarketingSpace.View', [
    'council_categories_marketing_spaces.tpl',

    'Council.Categories.Configuration',

    'Backbone'
], function CouncilCategoriesMarketingSpaceView(
    councilCategoriesMarketingSpacesTemplate,

    Configuration,

    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: councilCategoriesMarketingSpacesTemplate,

        getContext: function getContext() {
            var model = this.model;

            return {
                image: Configuration.councilImageUrl + model.get('image'),
                link: model.get('link'),
                text: model.get('text')
            };
        }
    });
});
