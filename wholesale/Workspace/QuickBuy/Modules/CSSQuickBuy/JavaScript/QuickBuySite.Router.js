/*
 © 2015 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
 */

define('CSSTeam.QuickBuy.QuickBuySite.Router', [
    'QuickOrderAdd.View',
    'underscore',
    'Backbone'
], function (
    View,
    _,
    Backbone
) {
    'use strict';
    return Backbone.Router.extend({

        initialize: function(container){
            this.container = container;
        },
        

        routes: {
			'quickadd': 'quickbuyinit'
        },
        quickbuyinit : function(){
            
var view = new View(this.container);
            var layout = this.container.container.getComponent('Layout');
            layout.showContent(view)
            
        },
        getItemQuantitySet:function(){

        }
    })
});
