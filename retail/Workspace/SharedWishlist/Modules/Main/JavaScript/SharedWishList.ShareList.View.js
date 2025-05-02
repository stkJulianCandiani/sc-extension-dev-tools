define('SharedWishList.ShareList.View', [
    'sharedwishlist_share_share_list.tpl',
    'Backbone',
    'underscore',
    'jQuery'
], function SharedWishListShareListView(
    sharedWishListShareShareListTpl,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: sharedWishListShareShareListTpl,

        events: {
            'submit form': 'saveForm'
        },

        initialize: function initialize(options) {
            this.model = options.model;
            this.isEdit = true;
            this.page_header = this.getTitle();
            this.inModal = options.inModal;
        },

        isEmail: function isEmail(email) {
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return expr.test(email);
        },

        validateEmailList: function validateEmailList(list) {
            var self = this;
            var emails = list.split(',');
            var refineList = [];
            var email;

            try {
                _.each(emails, function valiateEmail(e) {
                    email = e.trim();

                    if (!self.isEmail(email)) {
                        throw 'The email ' + email + ' is not valid.';
                    } else {
                        refineList.push(email);
                    }
                });
            } catch (e) {
                self.showWarningMessage(e);
                return false;
            }

            return refineList.join(', ');
        },

        saveForm: function saveForm(e) {
            var form;
            var sharefields;
            var self = this;

            e.preventDefault();

            form = jQuery(e.target);

            sharefields = _.extend(form.serializeObject(), { sharelist: true });

            sharefields.sharelistwith = self.validateEmailList(sharefields.sharelistwith);

            if (sharefields.sharelistwith) {
                _.each(sharefields, function sharefieldsEach(value, key) {
                    self.model.set(key, value);
                });

                this.model.save().done(function renderView() {
                    self.options.parentView.render();
                    self.$containerModal.modal('hide');
                });
            }
        },

        getTitle: function getTitle() {
            this.$('[name="name"]').focus();

            return this.isEdit ? _('Edit share list').translate() : _('Share list').translate();
        },

        getContext: function getContext() {
            var list = this.model;

            return {
                name: list.get('name'),
                sharelistwith: list.get('sharelistwith'),
                isListPrivate: list.get('scopeName') === 'private',
                isEdit: this.isEdit
            };
        }

    });
});
