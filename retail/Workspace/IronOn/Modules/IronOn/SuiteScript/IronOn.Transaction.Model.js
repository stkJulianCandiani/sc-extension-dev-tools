define('IronOn.Transaction.Model', [
    'Application',
    'IronOn.LiveOrder.Helper'
], function IronOnTransactionModel(
    Application,
    Helper
) {
    'use strict';

    Application.on('after:Transaction.get', function afterTransactionGet(model, result) {
        var ironOnLines;
        try {
            if (result.lines) {
                ironOnLines = Helper.getIronInLines(result.lines);
                result.lines = Helper.updateCartLines(ironOnLines, result.lines);
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'error', e);
        }
        return result;
    });
});
