define('CSeComm.ExternalCSS.MyAccount', [
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
                environment.getConfig('externalcss.myaccountCss') :
                container.getConfig('externalcss.myaccountCss');

            if (!cssfile || (typeof cssfile !== 'string')) {
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
