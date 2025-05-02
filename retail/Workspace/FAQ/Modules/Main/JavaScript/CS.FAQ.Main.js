define('CS.FAQ.Main', [
    'FAQ.Collection',
    'FAQ.View'
], function CSFAQMain(
    FAQCollection,
    FAQView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var collection = new FAQCollection();

            layout.addChildView('sidebar-faq', function sidebarFAQ() {
                return new FAQView({
                    collection: collection
                });
            });

            collection.fetch();
        }
    };
});
