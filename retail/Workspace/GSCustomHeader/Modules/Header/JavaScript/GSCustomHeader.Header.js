define('GSCustomHeader.Header', [
    'Header.View',
    'gs-header.tpl',
    'Custom.jQuery.sidebarMenu'
], function GSCustomHeaderHeader(
    HeaderView,
    headerTemplate
) {
    'use strict';

    return {
        loadModule: function loadModule(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            HeaderView.prototype.template = headerTemplate;

            layout.addToViewContextDefinition('Header.View', 'sumbenuLinks', 'array', function selectedCategories() {
                return SC.CONFIGURATION.header.submenu;
            });

            layout.addToViewContextDefinition('Header.View', 'showQuickOrder', 'boolean', function showQuickOrder() {
                return environment.getConfig('header.quickorderSubmenu');
            });

            layout.addToViewContextDefinition('Header.View', 'showStoreLocator', 'boolean', function showStoreLocator() {
                return environment.getConfig('header.storelocatorSubmenu');
            });
        }
    };
});
