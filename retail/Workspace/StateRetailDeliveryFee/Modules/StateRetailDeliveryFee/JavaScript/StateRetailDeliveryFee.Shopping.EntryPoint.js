define('StateRetailDeliveryFee.Shopping.EntryPoint', [
    'RedirectPages.Model',
    'Backbone'
], function StateRetailDeliveryFeeShoppingEntryPoint(
    RedirectPagesModel,
    Backbone
) {
    'use strict';

    return  {
        mountToApp: function mountToApp (container) {
            var layout = container.getComponent('Layout');
            var model = new RedirectPagesModel();
            this.modelFetched = false;
            var self = this;
            var url;
            var pathName;
            if (layout && !this.modelFetched) {
                layout.on('beforeShowContent', function getRedirects() {
                    model.fetch({
                        data: {
                            url: Backbone.history.location.href
                        }
                    }).done(function redirectPagesFetch(data) {
                        self.modelFetched = true;
                        if (data && data.redirectUrl && data.redirectUrl !== '') {
                            url = data.redirectUrl
                            pathName = new URL(url).pathname;
                            Backbone.history.navigate(pathName, { trigger: true });
                        }
                    });
                });
            }
        }
    };
});
