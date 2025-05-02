define('FAQ.Model', [
    'SC.Model',
    'Application',
    'Utils',
    'underscore'
], function FAQModel(
    SCModel,
    Application,
    Utils,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'FAQ',
        FAQRecord: {
            id: 'customrecord_gs_faq_detail',
            fields: {
                heading: 'custrecord_gs_faq_detail_heading',
                content: 'custrecord_gs_faq_detail_content',
                section: 'custrecord_gs_faq_detail_section',
                sortOrder: 'custrecord_gs_faq_detail_sort'
            }
        },
        FAQSection: {
            id: 'customrecord_gs_faq_section',
            fields: {
                heading: 'custrecord_gs_faq_section_heading',
                isLink: 'custrecord_gs_faq_heading_link',
                linkUrl: 'custrecord_gs_faq_section_url',
                sortOrder: 'custrecord_gs_faq_section_sort'
            }
        },
        get: function get(/* section */) {
            var result = nlapiSearchRecord(this.FAQRecord.id, null, this.getFilters(/* section */), this.getColumns());
            var response = [];
            var self = this;
            _.each(result, function eachFAQDetail(FAQDetail) {
                response.push({
                    name: FAQDetail.getValue(self.FAQRecord.fields.heading),
                    content: FAQDetail.getValue(self.FAQRecord.fields.content),
                    section: FAQDetail.getValue(self.FAQSection.fields.heading, self.FAQRecord.fields.section),
                    sortOrder: FAQDetail.getValue(self.FAQRecord.fields.sortOrder),
                    internalid: FAQDetail.getValue('internalid')
                });
            });
            response = _.chain(response)
                .sortBy('sortOrder')
                .groupBy('section')
                .map(function group(value, key) {
                    return {
                        section: key,
                        questions: value
                    };
                })
                .value();
            return response;
        },
        getFilters: function getFilters(/* section*/) {
            var filters = [];
            filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
            /*
            var formulaFilter;
            formulaFilter = new nlobjSearchFilter('formulatext', null, 'is', section);
            formulaFilter.setFormula('{' + this.FAQRecord.fields.section + '}');
            filters.push(formulaFilter);
            */
            return filters;
        },
        getColumns: function getColumns() {
            var columns = [];
            columns.push(new nlobjSearchColumn(this.FAQRecord.fields.heading));
            columns.push(new nlobjSearchColumn(this.FAQRecord.fields.content));
            columns.push(new nlobjSearchColumn(this.FAQRecord.fields.sortOrder));
            columns.push(new nlobjSearchColumn(this.FAQSection.fields.heading, this.FAQRecord.fields.section));
            columns.push(new nlobjSearchColumn(this.FAQSection.fields.isLink, this.FAQRecord.fields.section));
            columns.push(new nlobjSearchColumn(this.FAQSection.fields.linkUrl, this.FAQRecord.fields.section));
            columns.push(new nlobjSearchColumn(this.FAQSection.fields.sortOrder, this.FAQRecord.fields.section));
            columns.push(new nlobjSearchColumn('internalid'));
            return columns;
        }

    });
});
