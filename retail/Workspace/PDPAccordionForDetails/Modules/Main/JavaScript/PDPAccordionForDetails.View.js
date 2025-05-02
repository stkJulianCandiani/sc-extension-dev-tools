define('PDPAccordionForDetails.View', [
    'pdp_accordion_details.tpl',
    'SC.Configuration',
    'Backbone'
], function(
    pdpAccordionDetails,
    Configuration,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: pdpAccordionDetails,
        contextDataRequest: ['item'],
        getAccordionElements: function getAccordionElements() {
            // We extract only what we need for the Accordion.
            var accordionHeader = Configuration.get('pdpAccordion');
            var item = this.contextData.item();
            var self = this;

            var accordionElements = _.map(accordionHeader, function mapAccordionElements(dropDownHeader) {
                return {
                    dropDownHeader: dropDownHeader,
                    dropDownBody: item[dropDownHeader.mappedField] && item[dropDownHeader.mappedField].length > 0 ? item[dropDownHeader.mappedField] : '',
                    placeholder: self.options.placeholder  // used to differentiate mobile and desktop selectors for header and body collapsable elements
                }
            })

            return accordionElements;
        },
        getContext: function getContext() {
            return {
                accordionElements: this.getAccordionElements()
            }
        }
    });
});
