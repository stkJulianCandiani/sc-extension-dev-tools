define('CSeComm.ExternalCSS.Shopping', [
    'jQuery'
] , function (
    jQuery
) {
    'use strict';

    return  {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var element;
            var cssfile = environment ?
                environment.getConfig('externalcss.shoppingCss') :
                container.getConfig('externalcss.shoppingCss');

            if (!cssfile || (typeof cssfile !== 'string')) {
                return;
            }

            element = jQuery('link[id=externalcss]');
            if (!element.length) {
                element = jQuery('<link id="externalcss" rel="stylesheet">').attr('href', cssfile).appendTo(jQuery('head'));
            } else {
                element.attr('href', cssfile);
            }
        }
    };
});
