define('CS.GSCustomFooter.Main', [
    'Footer.View',
    'GSCustomFooterMobile.View',
    'GSCustomFooterPolicies.View',
    'GSCustomFooterDesktop.View',
    'GSCustomFooterSocial.View',
    'cs_gscustomfooter_main.tpl'
],
function CSGSCustomFooterMain(
    FooterView,
    FooterMobileView,
    FooterPoliciesView,
    FooterDesktopView,
    FooterSocialView,
    newFooterTemplate
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            // var layout = container.getComponent('Layout')
            // Override main footer template
            FooterView.prototype.template = newFooterTemplate;

            // TO DO: Add same child view to simple footer. My Account and Checkout us it and breakes when trying to use FooterMobileView.addChildView()
            // Add on manifest again the entries for Checkout and My Account;
            FooterView.addChildViews({
                FooterMobile: function footerMobile() {
                    return function addFooterMobile() {
                        return new FooterMobileView({});
                    };
                },
                FooterDesktop: function footerDesktop() {
                    return function addFooterDesktop() {
                        return new FooterDesktopView({});
                    };
                },
                FooterPolicies: function footerPolicies() {
                    return function addFooterPolicies() {
                        return new FooterPoliciesView({});
                    };
                },
                FooterSocialIcons: function footerSocialIcons() {
                    return function addFooterSocialIcons() {
                        return new FooterSocialView({});
                    };
                }
            });

            FooterMobileView.addChildViews({
                FooterSocialIcons: function footerSocialIcons() {
                    return function addFooterSocialIcons() {
                        return new FooterSocialView({});
                    };
                }
            });
        }
    };
});
