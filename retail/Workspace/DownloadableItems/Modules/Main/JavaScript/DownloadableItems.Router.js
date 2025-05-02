/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Router', [
    'DownloadableItems.Collection',
    'DownloadableItems.List.View',
    'underscore'
], function DownloadableItemsRouter(
    Collection,
    View,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');

            if (pageType) {
                pageType.registerPageType({
                    name: _.translate('Downloadable Items'),
                    routes: ['downloadableitems', 'downloadableitems?:options'],
                    view: View,
                    options: {
                        application: container,
                        collection: new Collection()
                    }
                });
            }
        }
    };
});
