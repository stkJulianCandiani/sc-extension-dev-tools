define('GTMApplicationSkeleton.View', [
    'ApplicationSkeleton.Layout',
    'SC.Configuration',
    'Tracker',
], function (ApplicationSkeletonLayout, Configuration, Tracker) {
    'use strict';

    var viewPrototype = ApplicationSkeletonLayout.prototype;

    _(viewPrototype).extend({
        _showContent: function _showContent(view, dont_scroll) {
            const first_show_content = !this.currentView;
            const current_view = this.currentView;

            // document's title
            document.title = view.title || '';

            if (!view.enhancedEcommercePage) {
                Tracker.getInstance().trackNonEcomemercePageView('/' + Backbone.history.fragment);
            }

            // if the current view displays a bootstrap modal manually (without calling view.showInModal)
            // then it is necessary to clean up the modal backdrop manually here

            this.closeModal();

            if (view.inModal) {
                return view.showInModal();
            }

            // We render the layout only once, the first time showContent is called
            if (!this.rendered) {
                this.render();
                this.rendered = true;
            }

            // This line will destroy the view only if you are adding a different instance of a view
            if (current_view && current_view !== view) {
                current_view.destroy();

                if (current_view.bodyClass) {
                    this.$el.removeClass(current_view.bodyClass);
                }
            }

            // @property {Backbone.View} currentView The layout as a view can contain many child views, but there is one that is mandatory and important and is referenced by this property
            // The currentView is the one that is showing the use case  page that the user is currently being working on. While the user navigates through our
            // application the currentView will be changing.
            // {Backbone.View} the single children of the layout should have only one view, the currentView
            this.currentView = view;
            this._currentView = view;

            // update the header and footer
            this.headerView =
                this.currentView.getHeaderView && this.currentView.getHeaderView()
                    ? this.currentView.getHeaderView()
                    : this.originalHeaderView;

            this.footerView =
                this.currentView.getFooterView && this.currentView.getFooterView()
                    ? this.currentView.getFooterView()
                    : this.originalFooterView;

            if (
                (this.headerViewInstance &&
                    !(this.headerViewInstance instanceof this.headerView)) ||
                (this.footerViewInstance && !(this.footerViewInstance instanceof this.footerView))
            ) {
                this.getChildViewInstance('Header') &&
                    this.getChildViewInstance('Header').undelegateEvents();
                this.getChildViewInstance('Footer') &&
                    this.getChildViewInstance('Footer').undelegateEvents();

                this.addChildViewInstances({
                    Header: this.childViews.Header,
                    Footer: this.childViews.Footer,
                });

                this.render();
            }

            // update the breadcrumb
            const breadcrumb_pages = this.currentView.getBreadcrumbPages
                ? this.currentView.getBreadcrumbPages()
                : null;

            if (breadcrumb_pages && this.breadcrumbViewInstance) {
                this.breadcrumbViewInstance.pages = this.updateCrumbtrail(breadcrumb_pages || []);
                this.breadcrumbViewInstance.render();
            } else {
                this.hideBreadcrumb();
            }

            if (this.notifications) {
                this.notifications.render();
            }

            // keep the min height value to restore it later because the .empty() will mess the current scrolling.
            let minHeight;
            if (!first_show_content) {
                minHeight = this.$(this.content_element).css('min-height');
                // set the height of 'content_element' to his current height because after empty() there will be no scroll bar and the dont_scroll will not work
                this.$(this.content_element).css(
                    'min-height',
                    this.$(this.content_element).height() + 'px'
                );
            }

            // Empties the content first, so events don't get unbind
            this.$(this.content_element).empty();
            view.render();

            Tracker.getInstance().trackPageview('/' + Backbone.history.fragment);

            // If the JsonLd markup is selected on the configuration and the properties used
            // in markup microdata do not exist, JsonLd script will be added to head.
            if (Configuration.get('structureddatamarkup.type') === 'JSON-LD') {
                if (
                    jQuery('[itemscope]').length ||
                    jQuery('[itemtype^="https://schema.org"]').length
                ) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        'This template is not compatible with JsonLd. Template must be based on 20.1 Base Theme.'
                    );
                } else {
                    const fullJsonLd = [];
                    const promises = [
                        view.getViewJsonLd(),
                        this.breadcrumbViewInstance.getJsonLd(),
                    ];

                    jQuery.when(...promises).then((...jsonLds) => {
                        _.each(jsonLds, (jsonLdResult) => {
                            if (!_.isEmpty(jsonLdResult)) {
                                let jsonLdWithContext = {
                                    '@context': 'https://schema.org',
                                };
                                jsonLdWithContext = { ...jsonLdWithContext, ...jsonLdResult };
                                fullJsonLd.push(jsonLdWithContext);
                            }
                        });
                        if (!_.isEmpty(fullJsonLd)) {
                            jQuery('head script[type="application/ld+json"]').remove();
                            jQuery(
                                `<script type="application/ld+json">${JSON.stringify(
                                    fullJsonLd
                                )}</script>`
                            ).appendTo('head');
                        }
                    });
                }
            }

            if (view.bodyClass) {
                this.$el.addClass(view.bodyClass);
            }

            // @event beforeAppendView
            this.trigger('beforeAppendView', view);

            this.$(this.content_element).append(view.$el);
            if (!first_show_content && minHeight) {
                this.$(this.content_element).css('min-height', minHeight);
            }

            // @event afterAppendView
            this.trigger('afterAppendView', view);

            view.isRenderedInLayout = true;

            // Sometimes we do not want to scroll top when the view is rendered
            // Eventually we might change view and dont_scroll to an option obj
            if (!dont_scroll && !first_show_content) {
                jQuery(document).scrollTop(0);
            }

            // we need to return a promise always, as show content might be async
            return jQuery.Deferred().resolveWith(this, [view]);
        },
    });
});
