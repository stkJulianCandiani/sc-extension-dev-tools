define('GSCustomHeader.Menu', [
    'Header.Menu.View',
    'SC.Configuration',
    'gs-header_menu.tpl',
    'underscore'
], function GSCustomHeaderMenu(
    HeaderMenuView,
    Configuration,
    gsHeaderMenuTemplate,
    _
) {
    'use strict';


    return {
        loadModule: function loadModule(container) {
            var layout = container.getComponent('Layout');

            HeaderMenuView.prototype.template = gsHeaderMenuTemplate;

            layout.removeToViewContextDefinition('Header.Menu.View', 'categories');
            layout.addToViewContextDefinition('Header.Menu.View', 'categories', 'array', function selectedCategories() {
                return _(Configuration.get('navigationData')).first(7);
            });
        }
    };
});
