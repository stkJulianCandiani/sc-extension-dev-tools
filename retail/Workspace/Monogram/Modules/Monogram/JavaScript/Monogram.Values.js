define('Monogram.Values', [
], function MonogramValues(
) {
    'use strict';

    return {
        itemFields: {
            monogramAlphabet: 'custitem_monogram_alphabet'
        },
        itemOptions: {
            monogramAlphabet: 'custcol_monogram_alphabet',
            alphabetSelection: 'custcol_acs_monogram_selection',
            alphabetSelectionItems: 'custcol_acs_monogram_selection_items',
            cost: 'custcol_acs_troop_numeral_cost',
            extraItems: 'custcol_acs_extra_customized_items',
            lineId: 'custcol_acs_monogram_line_id'
        }
    };
});
