define('SharedWishList.ShareList.Button.View', [
    'sharedwishlist_share_button.tpl',
    'SharedWishList.ShareList.View',
    'Backbone',
    'underscore',
    'jQuery'
], function SharedWishListShareListButtonView(
    sharedWishListShareButtonTpl,
    SharedWishListShareListView,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({

        template: sharedWishListShareButtonTpl,

        events: {
            'click [data-action="editList"]': 'editList'
        },

        initialize: function initialize(options) {
            this.model = options.model;
            this.application = options.application;
        },

        editList: function editList(e) {
            var Layout = SC.Application('MyAccount').getComponent('Layout');
            var button;
            var self;
            e.stopPropagation();
            button = jQuery(e.target);
            self = this;

            if (button.is(':checked')) {
                this.shareList = new SharedWishListShareListView({
                    application: this.application,
                    parentView: this,
                    model: this.model,
                    inModal: true
                });
                Layout.showContent(this.shareList, { showInModal: true });
            } else {
                this.model.set('scopeName', 'private');
                this.model.save().done(function saveModel() {
                    self.render();
                });
            }
        },

        getContext: function getContext() {
            var list = this.model;
            var owner = list.get('owner');
            var ownerInfo = owner ? owner.name : '';
            return {
                subject: list.get('subject'),
                sharelistwith: list.get('sharelistwith'),
                isListPrivate: list.get('scopeName') === 'private',
                isInvitee: list.get('isInvitee'),
                isDefaultList: owner,
                ownerInfo: ownerInfo
            };
        }

    });
});
