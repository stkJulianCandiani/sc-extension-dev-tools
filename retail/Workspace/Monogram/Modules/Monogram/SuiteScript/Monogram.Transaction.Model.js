define('Monogram.Transaction.Model', [
    'Application',
    'Monogram.LiveOrder.Helper'
], function MonogramTransactionModel(
    Application,
    Helper
) {
    'use strict';

    Application.on('after:Transaction.get', function afterTransactionGet(model, result) {
        var monogramLines;
        try {
            if (result.lines) {
                monogramLines = Helper.getMonogramLines(result.lines);
                result.lines = Helper.updateCartLines(monogramLines, result.lines);
            }
        } catch (e) {
            nlapiLogExecution('ERROR', 'error', e);
        }
        return result;
    });
});
