/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Model', [
    'SC.Model',
    'Models.Init',
    'Application',
    'Configuration',
    'underscore'
], function CouncilModel(
    SCModel,
    ModelsInit,
    Application,
    Configuration,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'Council',

        councilInfoFieldSet: [
            'internalid',
            'name',
            'custrecord9',  // Description
            'custrecord10', // Store Info
            'custrecord12', // Corporate Link
            'custrecord13', // Store Place
            'custrecord_sca_council_item_description', // SCA Description
            'custrecord_sca_council_item_store_desc', // SCA Store Description
            'custrecord_sca_council_item_store_info', // SCA Store Info

            // Council Slider
            'custrecord_sca_slide_main_image_1',
            'custrecord_sca_slide_mobile_image_1',
            'custrecord_sca_slide_link_1',
            'custrecord_sca_slide_main_image_2',
            'custrecord_sca_slide_mobile_image_2',
            'custrecord_sca_slide_link_2',
            'custrecord_sca_slide_main_image_3',
            'custrecord_sca_slide_mobile_image_3',
            'custrecord_sca_slide_link_3',
            'custrecord_sca_slide_main_image_4',
            'custrecord_sca_slide_mobile_image_4',
            'custrecord_sca_slide_link_4',
            'custrecord_sca_slide_main_image_5',
            'custrecord_sca_slide_mobile_image_5',
            'custrecord_sca_slide_link_5',
            'custrecord_sca_slide_main_image_6',
            'custrecord_sca_slide_mobile_image_6',
            'custrecord_sca_slide_link_6',
            'custrecord_sca_slide_main_image_7',
            'custrecord_sca_slide_mobile_image_7',
            'custrecord_sca_slide_link_7',
            'custrecord_sca_slide_main_image_8',
            'custrecord_sca_slide_mobile_image_8',
            'custrecord_sca_slide_link_8',

            // Marketing sections
            'custrecord_sca_promo_ad_img_1',
            'custrecord_sca_promo_ad_link_1',
            'custrecord_sca_promo_ad_img_2',
            'custrecord_sca_promo_ad_link_2',
            'custrecord_sca_promo_ad_img_3',
            'custrecord_sca_promo_ad_link_3',
            'custrecord_sca_promo_ad_img_4',
            'custrecord_sca_promo_ad_link_4',
            'custrecord_sca_promo_ad_img_5',
            'custrecord_sca_promo_ad_link_5',
            'custrecord_sca_promo_ad_img_6',
            'custrecord_sca_promo_ad_link_6'
        ],

        getCouncilColumns: function getCouncilColumns(columns) {
            _.each(this.councilInfoFieldSet, function loadColumns(column) {
                columns.push(new nlobjSearchColumn(column, 'custrecord_council_category_info'));
            });
        },

        get: function get(options) {
            var result;
            var council;
            var getResponse = { data: {}, iscouncil: false };
            // Retrive council data only when is a call by fullurl.
            var isRequestCouncilData = !options.zipcode;
            var filters = [
                new nlobjSearchFilter('isinactive', null, 'is', 'F')
            ];
            var self = this;

            var columns = [
                new nlobjSearchColumn('internalid'),
                new nlobjSearchColumn('custrecord_council_category_info'),
                new nlobjSearchColumn('internalid', 'custrecord_commerce_category'),
                new nlobjSearchColumn('fullurl', 'custrecord_commerce_category')
            ];

            if (options.zipcode) {
                filters.push(new nlobjSearchFilter('custrecord_zip_code', null, 'is', options.zipcode));
            }

            if (options.fullurl) {
                filters.push(new nlobjSearchFilter('fullurl', 'custrecord_commerce_category', 'is', options.fullurl));
            }

            // Retrive council data only when is a call by fullurl.
            if (isRequestCouncilData) {
                this.getCouncilColumns(columns);
            }

            result = Application.getAllSearchResults('customrecord_zipcode_council_mapping', filters, columns);
            if (result && result.length > 0) {
                if (result[0].getValue('custrecord_council_category_info')) {
                    council = nlapiLoadRecord('customrecord254', result[0].getValue('custrecord_council_category_info'));
                    if (isRequestCouncilData) {
                        _.each(self.councilInfoFieldSet, function loadColumns(column) {
                            getResponse.data[column] = {
                                value: council.getFieldValue(column),
                                text: council.getFieldText(column)
                            };
                        });
                    }
                }
                _.extend(getResponse, {
                    fullurl: result[0].getValue('fullurl', 'custrecord_commerce_category'),
                    mappingid: result[0].getValue('internalid'),
                    councilcategoryinfoid: result[0].getValue('custrecord_council_category_info'),
                    iscouncil: true
                });
            } else {
                _.each(result, function eachResult(line) {
                    // Retrive council data only when is a call by fullurl.
                    if (isRequestCouncilData) {
                        _.each(columns, function loadColumns(column) {
                            getResponse.data[column.getName()] = { value: line.getValue(column), text: line.getText(column) };
                        });
                    }

                    _.extend(getResponse, {
                        fullurl: line.getValue('fullurl', 'custrecord_commerce_category'),
                        mappingid: line.getValue('internalid'),
                        councilcategoryinfoid: line.getValue('custrecord_council_category_info'),
                        iscouncil: true
                    });
                });
            }

            return getResponse;
        }

    });
});
