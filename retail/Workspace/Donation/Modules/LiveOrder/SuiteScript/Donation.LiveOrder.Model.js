/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

/* eslint-disable eqeqeq */

define('Donation.LiveOrder.Model', [
    'Application',
    'Utils',
    'LiveOrder.Model',
    'underscore',
    'Configuration'
], function DonationLiveOrderModel(
    Application,
    Utils,
    LiveOrderModel,
    _,
    Configuration
) {
    'use strict';

    var defaultRoundupItemId = 199081;
    var defaultDonationItemId = 180004;

    _.extend(LiveOrderModel, {
        getConfirmation: function getConfirmation(internalid) {
            var confirmation = { internalid: internalid };
            var record;
            try {
                record = nlapiLoadRecord('salesorder', confirmation.internalid);
                confirmation = this.confirmationCreateResult(record);
                confirmation.options = {
                    custbody_total_amount_donation: record.getFieldValue('custbody_total_amount_donation'),
                    custbody_round_up_donation: record.getFieldValue('custbody_round_up_donation')
                };
            } catch (e) {
                nlapiLogExecution('ERROR', 'Cart Confirmation could not be loaded, reason: ', JSON.stringify(e));
            }
            return confirmation;
        }
    });

    Application.on('before:LiveOrder.get', function afterLiveOrderAddLines() {
        var orderFields = LiveOrderModel.getFieldValues();
        var options = LiveOrderModel.getTransactionBodyField();
        var lines = LiveOrderModel.getLines(orderFields);
        var donationline = '';
        var donationlineamount = '';
        var roundupItemid = Configuration.get('donation.roundupitemid') || defaultRoundupItemId;
        var donationItemid = Configuration.get('donation.donationitemid') || defaultDonationItemId;

        _.each(lines, function loopLines(line) {
            if (line.item.internalid == roundupItemid) {
                donationline = line.internalid;
            }
            if (line.item.internalid == donationItemid) {
                donationlineamount = line.internalid;
            }
        });

        if (donationline && options.custbody_allow_donation != 'T') {
            LiveOrderModel.removeLine(donationline);
        }
        if (donationlineamount && (options.custbody_round_up_donation == '' || options.custbody_round_up_donation == 0)) {
            LiveOrderModel.removeLine(donationlineamount);
        }
    });

    Application.on('after:LiveOrder.get', function afterLiveOrderAddLines(Model, data) {
        var lines = data.lines;
        var donationTotal = 0;
        var allLines = [];
        var donationline = '';
        var roundupItemid = Configuration.get('donation.roundupitemid') || defaultRoundupItemId;
        var donationItemid = Configuration.get('donation.donationitemid') || defaultDonationItemId;

        _.each(lines, function loopLines(line) {
            if (line.item.internalid == roundupItemid) {
                donationTotal += (line.amount);
                donationline = line.internalid;
            } else if (line.item.internalid == donationItemid) {
                donationTotal += (line.amount);
            } else {
                allLines.push(line);
            }
        });
        data.lines = allLines;
        data.donationlines = donationline;
        // eslint-disable-next-line operator-assignment
        data.summary.subtotal = data.summary.subtotal - donationTotal;
        data.summary.subtotal_formatted = Utils.formatCurrency(data.summary.subtotal);
        return data;
    });
});
