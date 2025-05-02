define('HideProducts.MasterFacet.Helper', [
    'underscore'
], function HideProductsMasterFacetHelper(
    _
) {
    'use strict';

    return {
        masterFacetItemField: 'custitem_sc_hide_from_list',

        initializeMasterFacet: function initializeMasterFacet(container) {
            var apiOptions = container.Configuration.get('searchApiMasterOptions', {});
            var self = this;

            _.each(apiOptions, function eachApiOption(option) {
                if (option.fieldset && option.fieldset !== 'details') {
                    option[self.masterFacetItemField] = false;
                    option['facet.exclude'] = (option['facet.exclude'] ? (option['facet.exclude'] + ',') : '')
                        + self.masterFacetItemField;
                }
            });
        }
    };
});
