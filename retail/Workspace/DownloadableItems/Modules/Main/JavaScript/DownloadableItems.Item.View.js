/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Item.View', [
    'Backbone',
    'underscore',
    'downloadable_items_item.tpl'
], function DownloadableItemsItemView(
    Backbone,
    _,
    downloadableItemsItemTpl
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    return Backbone.View.extend({
        template: downloadableItemsItemTpl,

        getContext: function getContext() {
            var canDownload = true;
            var errorMessage;
            var remainingdownloads;

            if (this.model.get('remainingdownloads') === 0) {
                canDownload = false;
                errorMessage = _('No remaining downloads').translate();
                remainingdownloads = '-';
            } else if (this.model.get('expired')) {
                canDownload = false;
                errorMessage = _('File Expired').translate();
                remainingdownloads = '-';
            } else {
                remainingdownloads = this.model.get('remainingdownloads');
                if (remainingdownloads === null) {
                    remainingdownloads = '∞';
                }
            }

            return {
                file: this.model.get('file'),
                expiration: this.model.get('expiration'),
                name: this.model.get('name'),
                remainingdownloads: remainingdownloads,
                canDownload: canDownload,
                errorMessage: errorMessage,
                downloadLink: _.getAbsoluteUrl(getExtensionAssetsPath(
                    'services/DownloadableItems.Service.ss?n=' + SC.ENVIRONMENT.siteSettings.id +
                    '&c=' + SC.ENVIRONMENT.companyId +
                    '&id=' + this.model.get('file')))
            };
        }
    });
});
