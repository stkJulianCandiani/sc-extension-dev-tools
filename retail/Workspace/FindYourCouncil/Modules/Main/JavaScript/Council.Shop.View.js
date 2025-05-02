/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Shop.View', [
    'council_shop.tpl',
    'Council.Select.View',
    'FindYourCouncil.View',
    'Backbone.CompositeView',
    'Backbone',
    'underscore'
], function CouncilShopView(
    CouncilShopTpl,
    CouncilSelectView,
    FindYourCouncilView,
    BackboneCompositeView,
    Backbone,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: CouncilShopTpl,

        attributes: {
            'id': 'category-council-shop',
            'class': 'view category-council-shop'
        },

        initialize: function initialize() {
            Backbone.View.prototype.initialize.apply(this, arguments);
            BackboneCompositeView.add(this);
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            var breadcrumb = [];
            breadcrumb.push({
                'text': _.translate('Shop Your Council'),
                'href': 'shop-your-council'
            });

            return breadcrumb;
        },

        childViews: {
            'Find.Your.Council': function FindYourCouncil() {
                return new FindYourCouncilView({
                    application: this.options.application
                });
            },

            'Select.Your.Council': function SelectYourCouncil() {
                return new CouncilSelectView({
                    application: this.options.application
                });
            }
        }
    });
});
