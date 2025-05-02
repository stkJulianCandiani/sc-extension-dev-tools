define('SidebarLeft.View', [
    'SC.Configuration',
    'gs_sidebar_left.tpl',
    'jQuery',
    'Utils',
    'Backbone',
    'underscore'
],
function SidebarLeftView(
    Configuration,
    gsSidebarLeftTpl,
    jQuery,
    Utils,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: gsSidebarLeftTpl,

        initialize: function initialize() {
            var self = this;
            var currentUrl = Backbone.history.fragment;
            this.pageInfo = _.find(Configuration.pageTypes.sidebarLeft.sidebarLeftMenu, { link: currentUrl });

            this.on('afterViewRender', function afeterViewRender() {
                self.addClassActive(currentUrl);
            });
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            var ret;

            if (!SC.isPageGenerator()) {
                ret = [
                    {
                        text: this.pageInfo.title,
                        href: '/' + this.pageInfo.link
                    }
                ];
            }

            return ret;
        },

        addClassActive: function addClassActive(currentUrl) {
            var linkActive = this.$('[data-hashtag="#/' + currentUrl + '"]');
            linkActive.parent().addClass('active');
        },

        getContext: function getContext() {
            return {
                navItems: Configuration.pageTypes ? Configuration.pageTypes.sidebarLeft.sidebarLeftMenu : [],
                pageInfo: this.pageInfo,
                navTitle: Configuration.pageTypes ? Configuration.pageTypes.sidebarLeft.navTitle : ''
            };
        }
    });
});
