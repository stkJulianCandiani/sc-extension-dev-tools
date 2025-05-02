/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder', [
    'CS.QuickOrder.Container.View',
    'underscore',
    'jQuery',
    'CS.QuickOrder.LiveOrder.Model.MultiLine'
], function CSQuickOrder(
    QuickOrderContainerView,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');
            var layout = container.getComponent('Layout');
            pageType.registerPageType({
                'name': 'QuickOrder',
                'routes': ['quickorder'],
                'view': QuickOrderContainerView,
                'defaultTemplate': {
                    'name': 'quickorder.tpl',
                    'displayName': _.translate('Quick Order'),
                    'thumbnail': _.getAbsoluteUrl('img/default-layout-transaction-list.png')
                }
            });

            layout.on('afterShowContent', function afterShowContent() {
                jQuery('a.quickorder-accesspoints-headerlink-link').attr('data-hashtag', '#quickorder');
            });
        }
    };
});
