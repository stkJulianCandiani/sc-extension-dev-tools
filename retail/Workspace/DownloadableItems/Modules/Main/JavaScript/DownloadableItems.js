/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems', [
    'DownloadableItems.Router',
    'underscore'
], function DownloadableItems(
    Router,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var myAccountMenuComponent = container.getComponent('MyAccountMenu');
            var downloadableItems = {
                id: 'downloadableitems',
                name: _.translate('Downloadable Items'),
                index: 10
            };

            var downloadableItemsList = {
                id: 'downloadableitemslist',
                groupid: 'downloadableitems',
                name: _.translate('List'),
                index: 1,
                url: 'downloadableitems'
            };

            if (myAccountMenuComponent) {
                myAccountMenuComponent.addGroup(downloadableItems);
                myAccountMenuComponent.addGroupEntry(downloadableItemsList);
            }
        }
    };
});
