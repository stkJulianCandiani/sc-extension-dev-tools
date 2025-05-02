define('GSCustomFooterMobile.View', [
    'cs_gscustomfooter_mobile.tpl',

    'SC.Configuration',
    'Backbone',
    'underscore'
], function GSCustomFooterMobileView(
    template,

    Configuration,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: template,
        getContext: function getContext() {
            var navigationHeads = [
                { title: _.translate('Quick Links'), collectionId: 'navigationQuickLinks', className: 'quick-links' },
                { title: _.translate('Shop'), collectionId: 'navigationShopLinks', className: 'shop-links' },
                { title: _.translate('Need Help'), collectionId: 'navigationNeedHelp', className: 'need-help' },
                { title: _.translate('Official GS USA links'), collectionId: 'navigationOfficialGsusaLinks', className: 'gsusa-links' }
            ];

            var navigationItems = _.map(navigationHeads, function mapNavigationItems(navTopic) {
                var collection = 'footer.' + navTopic.collectionId;
                navTopic.collection = Configuration.get(collection);

                return navTopic;
            });

            return {
                cartTouchPoint: _.getPathFromObject(Configuration, 'modulesConfig.Cart.startRouter', false) ? Configuration.currentTouchpoint : 'viewcart',
                menuItems: _(Configuration.get('navigationData')).first(7),
                navigationItems: navigationItems
            };
        }
    });
});
