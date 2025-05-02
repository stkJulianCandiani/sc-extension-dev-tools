define('CustomSliderHomePage', [
    'SC.Configuration',
    'Home.View'
], function CustomSliderHomePage(
    Configuration
) {
    'use strict';

    return {
        loadModule: function loadModule(application) {
            var layout = application.getComponent('Layout');

            layout.removeToViewContextDefinition('Home.View', 'carouselImages');

            layout.addToViewContextDefinition('Home.View', 'carouselImages', 'array', function addToViewContextDefinition() {
                var carouselImages = Configuration.get('home.carouselImages');
                return carouselImages;
            });
        }
    };
});
