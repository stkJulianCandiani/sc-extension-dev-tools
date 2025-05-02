/*
© 2020 NetSuite Inc.
User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
provided, however, if you are an authorized user with a NetSuite account or log-in, you
may use this code subject to the terms that govern your access and use.
*/

// @module IronOn
define('IronOn.CartConfirmation.View', [
    'Cart.Confirmation.View',
    'underscore',
    'SC.Configuration'
], function IronOnCartConfirmationView(
    CartConfirmationView,
    _,
    Configuration
) {
    'use strict';

    // @class ACS.IronOn.IronOn.View @extends Backbone.View
    return _.extend(CartConfirmationView.prototype, {

        getContext: _.wrap(CartConfirmationView.prototype.getContext, function wrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var ironOnConfiguration;
            var troopNumeralSelection;
            try {
                ironOnConfiguration = Configuration.get('extensions').ironon;
                if (this.model.get('options')) {
                    troopNumeralSelection = _.find(this.model.get('options').models, function findSelection(option) {
                        return option.get('cartOptionId') === ironOnConfiguration.troopNumeralSelectionItemOption;
                    });
                    if (troopNumeralSelection && troopNumeralSelection.get('value')) {
                        _.extend(context, {
                            showTroopNumeral: true,
                            numeralSelection: troopNumeralSelection.get('value').internalid
                        });
                    }
                    _.extend(context, {
                        council: this.model.get('council'),
                        flag: this.model.get('flag'),
                        aggregatedTotal: this.model.get('aggregatedTotal'),
                        serviceFee: this.model.get('serviceFee'),
                        flagFee: this.model.get('flagFee'),
                        trefoilFee: this.model.get('trefoilFee'),
                        trefoilName: this.model.get('trefoilName'),
                        insigniaPinFee: this.model.get('insigniaPinFee'),
                        insigniaPinName: this.model.get('insigniaPinName'),
                        membershipPinFee: this.model.get('membershipPinFee'),
                        membershipPinName: this.model.get('membershipPinName'),
                        troopCrestFee: this.model.get('troopCrestFee'),
                        troopCrestName: this.model.get('troopCrestName'),
                        councilCost: this.model.get('councilCost')
                    });
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
            return context;
        })
    });
});
