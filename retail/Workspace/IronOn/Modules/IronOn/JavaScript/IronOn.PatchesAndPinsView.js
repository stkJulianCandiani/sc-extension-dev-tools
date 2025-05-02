define('IronOn.PatchesAndPinsView', [
    'ironon_patches_pins.tpl',
    'Backbone',
    'jQuery',
    'underscore',
    'Utils'
], function IronOnPatchesAndPinsView(
    irononPatchesPinsTpl,
    Backbone,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: irononPatchesPinsTpl,

        initialize: function initialize(options) {
            this.parent = options.parent;
        },

        events: {
            'click [data-action="extra-item-selection"]': 'extraItemSelection',
            'change [data-action="select-troop-crest"]': 'selectTroopCrest'
        },

        selectTroopCrest: function selectTroopCrest(e) {
            var self = this;
            var internalId = parseInt(jQuery(e.target).find(':selected').val(), 10);
            this.parent.patchesPinsToAdd = _.filter(this.parent.patchesPinsToAdd, function filter(itemId) {
                return itemId !== self.selectedTroopCrest;
            });
            if (this.selectedTroopCrest !== internalId && internalId) {
                this.parent.patchesPinsToAdd.push(internalId);
                this.selectedTroopCrest = internalId;
            } else if (!internalId) {
                this.selectedTroopCrest = null;
            }
            this.parent.setCustomizationOptions();
        },

        getItemInternalId: function getItemInternalId() {
            var child;
            var internalid = this.model.get('internalid');
            var trefoilPinItemId = this.parent.configuration.trefoilPin;
            var trefoilParentPinItemId = this.parent.configuration.trefoilPinParent;
            if (parseInt(trefoilParentPinItemId, 10) === parseInt(this.model.get('internalid'), 10)) {
                child = _.find(this.model.get('matrixchilditems_detail'), function findChild(children) {
                    return children.internalid === parseInt(trefoilPinItemId, 10);
                });
                internalid = child.internalid;
            }
            return internalid;
        },

        removeExtraItem: function removeExtraItem(e, internalId) {
            var parentCell = jQuery(e.currentTarget).parent();
            jQuery(parentCell).removeClass('iron-on-extra-patches-area-cell-selected');
            this.parent.patchesPinsToAdd = _.filter(this.parent.patchesPinsToAdd, function filter(itemId) {
                return itemId !== internalId;
            });
        },

        addExtraItem: function addExtraItem(e, internalId) {
            var parentCell = jQuery(e.currentTarget).parent();
            jQuery(parentCell).addClass('iron-on-extra-patches-area-cell-selected');
            this.parent.patchesPinsToAdd.push(internalId);
        },

        extraItemSelection: function extraItemSelection(e) {
            var internalId = this.getItemInternalId();
            var isOnCart = _.find(this.parent.patchesPinsToAdd, function filter(itemId) {
                return itemId === internalId;
            });
            if (isOnCart) {
                this.removeExtraItem(e, internalId);
            } else {
                this.addExtraItem(e, internalId);
            }
            this.parent.setCustomizationOptions();
        },

        getContext: function getContext() {
            var internalId = this.getItemInternalId();
            var selected = _.find(this.parent.patchesPinsToAdd, function find(itemId) {
                return itemId === internalId;
            });
            var trefoilPinItemId = this.parent.configuration.trefoilPin;
            var trefoilParentPinItemId = this.parent.configuration.trefoilPinParent;
            var flagItemId = this.parent.configuration.flagPatchItem;
            var membershipPinId = this.parent.contextData.item().custitem_acs_membership_pin_item_id;
            var insigniaPinId = this.parent.contextData.item().custitem_acs_insignia_tab_id;
            var itemName;
            var showPrice = true;
            var showSeparator = false;
            var price = !this.model.get('isTroopCrest') ? this.model.get('onlinecustomerprice_detail').onlinecustomerprice_formatted : null;
            var child;
            var thumbnail;
            if (parseInt(flagItemId, 10) === parseInt(this.model.get('internalid'), 10)) {
                itemName = Utils.translate('American Flag Patch');
                showPrice = false;
                showSeparator = true;
            }
            if (parseInt(trefoilParentPinItemId, 10) === parseInt(this.model.get('internalid'), 10)) {
                itemName = this.model.get('storedisplayname2'); // Utils.translate('World Trefoil Pin');
                child = _.find(this.model.get('matrixchilditems_detail'), function findChild(children) {
                    return children.internalid === parseInt(trefoilPinItemId, 10);
                });
                price = child.onlinecustomerprice_detail.onlinecustomerprice_formatted;
            }
            if (parseInt(membershipPinId, 10) === parseInt(this.model.get('internalid'), 10)) {
                itemName = this.model.get('storedisplayname2'); // Utils.translate('Membership Pin');
            }
            if (parseInt(insigniaPinId, 10) === parseInt(this.model.get('internalid'), 10)) {
                itemName = this.model.get('storedisplayname2'); // Utils.translate('Insignia Tab');
            }
            if (this.model.get('isTroopCrest')) {
                // eslint-disable-next-line max-len
                price = this.model.get('troopCrestItems') && this.model.get('troopCrestItems')[0] ? this.model.get('troopCrestItems')[0].onlinecustomerprice_detail.onlinecustomerprice_formatted : null;
            }
            if (this.model.get('itemimages_detail') && this.model.get('itemimages_detail').main && this.model.get('itemimages_detail').main.urls) {
                thumbnail = this.model.get('itemimages_detail').main.urls[0];
            }
            if (this.model.get('itemimages_detail') && this.model.get('itemimages_detail').main && this.model.get('itemimages_detail').main['01.default']) {
                thumbnail = this.model.get('itemimages_detail').main['01.default'];
            }
            return {
                itemName: itemName,
                itemPrice: price,
                internalid: internalId,
                selected: selected,
                showPrice: showPrice,
                showSeparator: showSeparator,
                showTroopCrest: this.model.get('showTroopCrest') && this.model.get('isTroopCrest'),
                isTroopCrest: this.model.get('isTroopCrest'),
                troopCrestItems: this.model.get('troopCrestItems'),
                thumbnail: thumbnail
            };
        }
    });
});
