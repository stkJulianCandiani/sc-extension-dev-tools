/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.KeyMapping', [
    'underscore'
], function CouncilKeyMapping(
    _
) {
    'use strict';

    function getCouncilKeyMapping() {
        return {
            _name: function _name(item) {
                var data = item.get('data');
                return (data.name && data.name.value) ? data.name.value : null;
            },

            _corporate_link: function _corporateLink(item) {
                var data = item.get('data');
                return (data.custrecord12 && data.custrecord12.value) ? data.custrecord12.value : null;
            },

            _description: function _description(item) {
                var data = item.get('data');
                var description;
                if (data.custrecord_sca_council_item_description && data.custrecord_sca_council_item_description.value) {
                    description = data.custrecord_sca_council_item_description.value;
                }

                return description;
            },

            _store_info: function _storeInfo(item) {
                var data = item.get('data');
                var storeInfo;
                if (data.custrecord_sca_council_item_store_info && data.custrecord_sca_council_item_store_info.value) {
                    storeInfo = data.custrecord_sca_council_item_store_info.value;
                }

                return storeInfo;
            },

            _store_description: function _storeDescription(item) {
                var data = item.get('data');
                var storeDescription;
                if (data.custrecord_sca_council_item_store_desc && data.custrecord_sca_council_item_store_desc.value) {
                    storeDescription = data.custrecord_sca_council_item_store_desc.value;
                }

                return storeDescription;
            },

            _category_info: function _categoryInfo(item) {
                var data = item.get('data');
                var categoryInfo;
                if (data.custrecord_council_category_info && data.custrecord_council_category_info.text) {
                    categoryInfo = data.custrecord_council_category_info.text;
                }

                return categoryInfo;
            },

            _slider: function _slider(item) {
                var data = item.get('data');
                var slider = [{
                    image: data.custrecord_sca_slide_main_image_1 && data.custrecord_sca_slide_main_image_1.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_1 && data.custrecord_sca_slide_mobile_image_1.text,
                    href: data.custrecord_sca_slide_link_1 && data.custrecord_sca_slide_link_1.value
                }, {
                    image: data.custrecord_sca_slide_main_image_2 && data.custrecord_sca_slide_main_image_2.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_2 && data.custrecord_sca_slide_mobile_image_2.text,
                    href: data.custrecord_sca_slide_link_2 && data.custrecord_sca_slide_link_2.value
                }, {
                    image: data.custrecord_sca_slide_main_image_3 && data.custrecord_sca_slide_main_image_3.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_3 && data.custrecord_sca_slide_mobile_image_3.text,
                    href: data.custrecord_sca_slide_link_3 && data.custrecord_sca_slide_link_3.value
                }, {
                    image: data.custrecord_sca_slide_main_image_4 && data.custrecord_sca_slide_main_image_4.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_4 && data.custrecord_sca_slide_mobile_image_4.text,
                    href: data.custrecord_sca_slide_link_4 && data.custrecord_sca_slide_link_4.value
                }, {
                    image: data.custrecord_sca_slide_main_image_5 && data.custrecord_sca_slide_main_image_5.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_5 && data.custrecord_sca_slide_mobile_image_5.text,
                    href: data.custrecord_sca_slide_link_5 && data.custrecord_sca_slide_link_5.value
                }, {
                    image: data.custrecord_sca_slide_main_image_6 && data.custrecord_sca_slide_main_image_6.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_6 && data.custrecord_sca_slide_mobile_image_6.text,
                    href: data.custrecord_sca_slide_link_6 && data.custrecord_sca_slide_link_6.value
                }, {
                    image: data.custrecord_sca_slide_main_image_7 && data.custrecord_sca_slide_main_image_7.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_7 && data.custrecord_sca_slide_mobile_image_7.text,
                    href: data.custrecord_sca_slide_link_7 && data.custrecord_sca_slide_link_7.value
                }, {
                    image: data.custrecord_sca_slide_main_image_8 && data.custrecord_sca_slide_main_image_8.text,
                    mobileImage: data.custrecord_sca_slide_mobile_image_8 && data.custrecord_sca_slide_mobile_image_8.text,
                    href: data.custrecord_sca_slide_link_8 && data.custrecord_sca_slide_link_8.value
                }];

                return slider;
            },

            _marketing_spaces: function _marketingSpaces(item) {
                var data = item.get('data');
                var marketingSpaces = [];
                var marketingSpacesData = [{
                    image: data.custrecord_sca_promo_ad_img_1 && data.custrecord_sca_promo_ad_img_1.text,
                    link: data.custrecord_sca_promo_ad_link_1 && data.custrecord_sca_promo_ad_link_1.value
                }, {
                    image: data.custrecord_sca_promo_ad_img_2 && data.custrecord_sca_promo_ad_img_2.text,
                    link: data.custrecord_sca_promo_ad_link_2 && data.custrecord_sca_promo_ad_link_2.value
                }, {
                    image: data.custrecord_sca_promo_ad_img_3 && data.custrecord_sca_promo_ad_img_3.text,
                    link: data.custrecord_sca_promo_ad_link_3 && data.custrecord_sca_promo_ad_link_3.value
                }, {
                    image: data.custrecord_sca_promo_ad_img_4 && data.custrecord_sca_promo_ad_img_4.text,
                    link: data.custrecord_sca_promo_ad_link_4 && data.custrecord_sca_promo_ad_link_4.value
                }, {
                    image: data.custrecord_sca_promo_ad_img_5 && data.custrecord_sca_promo_ad_img_5.text,
                    link: data.custrecord_sca_promo_ad_link_5 && data.custrecord_sca_promo_ad_link_5.value
                }, {
                    image: data.custrecord_sca_promo_ad_img_6 && data.custrecord_sca_promo_ad_img_6.text,
                    link: data.custrecord_sca_promo_ad_link_6 && data.custrecord_sca_promo_ad_link_6.value
                }];

                // Clean empty marketing items
                _.each(marketingSpacesData, function eachMarketingSpaceData(marketingItem) {
                    if (marketingItem.image || marketingItem.text) {
                        marketingSpaces.push(marketingItem);
                    }
                });

                return marketingSpaces;
            }
        };
    }

    return {
        getCouncilKeyMapping: getCouncilKeyMapping
    };
});
