define('PDPTags.View', [
    'cs_pdptags.tpl',
    'Backbone'
], function (
    cdPdptagsTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: cdPdptagsTpl,
        contextDataRequest: ['item'],
        getContext: function getContext() {
            // TODO: Cusitem item status no llega al front.
            return {
                tagName: this.contextData.item().custitem_item_status ? this.contextData.item().custitem_item_status : '',
                itemTagClass: this.options.itemTagClass
            }
        }
    });
});
