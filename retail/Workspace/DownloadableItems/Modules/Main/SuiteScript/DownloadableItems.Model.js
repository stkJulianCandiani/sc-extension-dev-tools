/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('DownloadableItems.Model', [
    'SC.Model',
    'underscore'
], function DownloadableItemsModel(
    SCModel,
    _
) {
    'use strict';

    var downloadsSublist = 'download';

    function isExpired(date) {
        // 23:59:59 to milliseconds
        var time = (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000);
        var expirationDate = new Date(date).getTime() + time;

        return expirationDate < Date.now();
    }


    return SCModel.extend({
        name: 'DownloadableItemsModel',

        canDownload: function canDownload(fileID) {
            var customer;
            var downloadsCount;
            var i;
            var foundFile = false;
            var foundIndex;
            var rawExpired;
            var rawRemainingDownloads;
            var remainingDownloads;
            var isEmptyRemainingDownloads;
            var expired;

            try {
                i = 1;
                customer = nlapiLoadRecord('customer', nlapiGetUser());
                downloadsCount = customer.getLineItemCount(downloadsSublist);

                while (i <= downloadsCount && !foundFile) {
                    rawExpired = customer.getLineItemValue(downloadsSublist, 'expiration', i);
                    expired = rawExpired && isExpired(rawExpired);
                    rawRemainingDownloads = customer.getLineItemValue(downloadsSublist, 'remainingdownloads', i);
                    isEmptyRemainingDownloads = rawRemainingDownloads === null;
                    remainingDownloads = Number(rawRemainingDownloads);

                    // the file is there, it has remainingdownloads, and also is not expired
                    foundFile =
                        customer.getLineItemValue(downloadsSublist, 'file', i) === fileID &&
                        (isEmptyRemainingDownloads || remainingDownloads > 0) &&
                        !expired;

                    if (foundFile) {
                        foundIndex = i;
                    }

                    i++;
                }
            } catch (e) {
                nlapiLogExecution('error', 'error', e);
            }

            return {
                found: foundFile,
                index: foundIndex
            };
        },

        list: function list(options) {
            var customer;
            var downloadsCount;
            var returnLines = [];
            var pageLines = [];
            var i;
            var line;
            var recordsPerPage = 10;
            var page = (options && options.page) || 1;
            var remainingDownloadsValue;

            try {
                customer = nlapiLoadRecord('customer', nlapiGetUser());
                downloadsCount = customer.getLineItemCount(downloadsSublist);

                nlapiLogExecution('debug', 'downloadsCount', downloadsCount);

                for (i = 1; i <= downloadsCount; i++) {
                    line = {
                        file: parseInt(customer.getLineItemValue(downloadsSublist, 'file', i), 10),
                        name: customer.getLineItemText(downloadsSublist, 'file', i),
                        licensecode: customer.getLineItemValue(downloadsSublist, 'licensecode', i),
                        expiration: customer.getLineItemValue(downloadsSublist, 'expiration', i)
                    };
                    remainingDownloadsValue = customer.getLineItemValue(downloadsSublist, 'remainingdownloads', i);

                    if (remainingDownloadsValue !== null) {
                        line.remainingdownloads = parseInt(remainingDownloadsValue, 10);
                    } else {
                        line.remainingdownloads = remainingDownloadsValue;
                    }

                    if (line.expiration) {
                        line.expired = isExpired(line.expiration);
                    } else {
                        line.expiration = '-';
                        line.expired = false;
                    }

                    returnLines.push(line);
                }
            } catch (e) {
                nlapiLogExecution('ERROR', 'DownloadableItems - List', e);
            }

            // Poor man's pagination
            pageLines = returnLines.slice(
                ((page - 1) * recordsPerPage), // Start
                ((page) * recordsPerPage) < downloadsCount ? ((page) * recordsPerPage) : downloadsCount // end.
            );

            return {
                page: page,
                recordsPerPage: recordsPerPage,
                records: pageLines,
                totalRecordsFound: downloadsCount,
                order: 'asc',
                sort: 'name'
            };
        },

        get: function get(id) {
            var canDownloadData = this.canDownload(id);

            if (canDownloadData.found) {
                return _.extend(canDownloadData, {
                    file: nlapiLoadFile(id)
                });
            }

            return null;
        },

        finishDownload: function finishDownload(downloadData) {
            var remainingDownloads;
            customer = nlapiLoadRecord('customer', nlapiGetUser());
            remainingDownloads = Number(customer.getLineItemValue(downloadsSublist, 'remainingdownloads', downloadData.index));

            // only remove 1 if it is greather than 0, exists a case that is empty and it is infinite downloads
            if (remainingDownloads > 0) {
                nlapiLogExecution('ERROR', 'remainingdownloads', remainingDownloads);
                nlapiLogExecution('ERROR', 'remainingdownloads', downloadData.index);
                customer.setLineItemValue(downloadsSublist, 'remainingdownloads', downloadData.index, (remainingDownloads - 1));
                nlapiSubmitRecord(customer, true, true); // Category is required for customer issue
            }
        }
    });
});
