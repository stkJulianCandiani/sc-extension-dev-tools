/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('CS.QuickOrder.Container.View', [
    'quickorder_container.tpl',
    'CS.QuickOrder.View',
    'Backbone.CompositeView',
    'Backbone',
    'underscore'
], function CSQuickOrderContainerView(
    quickOrderContainerTpl,
    QuickOrderView,
    BackboneCompositeView,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: quickOrderContainerTpl,

        initialize: function initialize() {
            Backbone.View.prototype.initialize.apply(this, arguments);
            BackboneCompositeView.add(this);
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            var breadcrumb = [];
            breadcrumb.push({
                'text': _.translate('Quick Order'),
                'href': 'quickorder'
            });

            return breadcrumb;
        },

        childViews: {
            'QuickView': function QuickView() {
                return new QuickOrderView({
                    application: this.options.application
                });
            }
        }
    });
});
