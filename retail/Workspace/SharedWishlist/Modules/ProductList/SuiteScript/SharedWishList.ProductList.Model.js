/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('SharedWishList.ProductList.Model', [
    'ProductList.Model',
    'Profile.Model',
    'Application',
    'ProductList.Item.Search',
    'Models.Init',
    'Utils',
    'underscore'
], function ProductListModelExtend(
    ProductListModel,
    ProfileModel,
    Application,
    ProductListItemSearch,
    ModelsInit,
    Utils,
    _
) {
    'use strict';

    /* globals nlapiStringToDate */

    var scopeNameMapping = {
        'shared': '3',
        'private': '2'
    };

    Application.on('after:ProductList.getColumns', function getColumns(Model, Result) {
        return _.extend(Result, {
            sharelistwith: new nlobjSearchColumn('custrecord_share_list_with')
        });
    });

    return _(ProductListModel).extend({
        verifyInviteeOnList: function verifyInviteeOnList(productList, user) {
            var profile;
            var email;
            var isOwn = parseInt(productList.getFieldValue('custrecord_ns_pl_pl_owner'), 10) === user;
            var isInvitee;

            if (productList.getFieldValue('scopeName') === 'shared') {
                profile = ProfileModel.get();
                email = profile.email;
                isInvitee = productList.getFieldValue('custrecord_share_list_with').match(email);

                if (!isOwn && !isInvitee) {
                    throw unauthorizedError;
                }
            } else if (!isOwn) {
                throw unauthorizedError;
            }
        },

        get: function get(user, id) {
            var filters;
            var productLists;
            var profile = ProfileModel.get();

            // Verify session if and only if we are in My Account...
            if (request.getURL().indexOf('https') === 0) {
                this.verifySession();
            }

            filters = [
                new nlobjSearchFilter('internalid', null, 'is', id).setLeftParens(),
                new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                new nlobjSearchFilter('custrecord_ns_pl_pl_owner', null, 'is', user).setRightParens().setOr(true),
                new nlobjSearchFilter('internalid', null, 'is', id).setLeftParens(),
                new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                new nlobjSearchFilter('custrecord_share_list_with', null, 'contains', profile.email).setRightParens()
            ];

            productLists = this.searchHelper(filters, this.getColumns(), true);

            if (!productLists.length) {
                throw notFoundError;
            }

            return productLists[0];
        },

        search: function search(user, order) {
            var self = this;
            var profile;
            var productLists;
            var templateIds = [];
            var filters = [
                new nlobjSearchFilter('isinactive', null, 'is', 'F'),
                new nlobjSearchFilter('custrecord_ns_pl_pl_owner', null, 'is', user)
            ];

            if (user) {
                profile = ProfileModel.get();

                filters = [
                    new nlobjSearchFilter('isinactive', null, 'is', 'F').setLeftParens(),
                    new nlobjSearchFilter('custrecord_ns_pl_pl_owner', null, 'is', user).setRightParens().setOr(true),
                    new nlobjSearchFilter('isinactive', null, 'is', 'F').setLeftParens(),
                    new nlobjSearchFilter('custrecord_share_list_with', null, 'contains', profile.email || '').setRightParens()
                ];
            }

            productLists = this.searchHelper(filters, this.getColumns(), false, order, templateIds);

            // Add possible missing predefined list templates
            _(this.configuration.listTemplates).each(function each(template) {
                if (!_(templateIds).contains(template.templateId)) {
                    if (!template.templateId || !template.name) {
                        nlapiLogExecution('error', 'Error at SharedWishList.ProductList.Model', 'Error: Wrong predefined Product List. ' +
                            'Please check backend configuration.');
                    } else {
                        if (!template.scopeId) {
                            template.scopeId = '2';
                            template.scopeName = 'private';
                        }

                        if (!template.description) {
                            template.description = '';
                        }

                        if (!template.typeId) {
                            template.typeId = '3';
                            template.typeName = 'predefined';
                        }

                        productLists.push(template);
                    }
                }
            });

            if (this.isSingleList()) {
                return _.filter(productLists, function filterProductList(pl) {
                  // Only return predefined lists.
                    return pl.typeName === 'predefined';
                });
            }

            _.each(productLists, function eachProductList(list) {
                if (list.owner && list.owner.id !== profile.internalid) {
                    list.isInvitee = true;
                }
            });

            return productLists.filter(function filterProductList(pl) {
                return pl.typeId !== self.later_type_id && pl.typeId !== self.quote_type_id;
            });
        },

        searchHelper: function searchHelper(filters, columns, includeStoreItems, order, templateIds) {
           // Sets the sort order
            var orderTokens;
            var sortColumn;
            var sortDirection;
            var productLists = [];

            var productListTypeText;
            var lastModifiedDate;
            var lastModifiedDateStr;
            var productList;
            var description;
            var records;
            var own;

            orderTokens = order ? order.split(':') : [];
            sortColumn = orderTokens[0] || 'name';
            sortDirection = orderTokens[1] || 'ASC';

            if (columns[sortColumn]) {
                columns[sortColumn].setSort(sortDirection === 'DESC');
            }

            // Makes the request and format the response
            records = Application.getAllSearchResults('customrecord_ns_pl_productlist', filters, _.values(columns));

            _.each(records, function eachRecords(productListSearchRecord) {
                productListTypeText = productListSearchRecord.getText('custrecord_ns_pl_pl_type');
                lastModifiedDate = nlapiStringToDate(productListSearchRecord.getValue('lastmodified'), window.dateformat);
                lastModifiedDateStr = nlapiDateToString(lastModifiedDate, window.dateformat);
                description = productListSearchRecord.getValue('custrecord_ns_pl_pl_description');
                own = productListSearchRecord.getValue('custrecord_ns_pl_pl_owner');

                productList = {
                    internalid: productListSearchRecord.getId(),
                    templateId: productListSearchRecord.getValue('custrecord_ns_pl_pl_templateid'),
                    name: productListSearchRecord.getValue('name'),
                    description: description ? description.replace(/\n/g, '<br>') : '',
                    sharelistwith: productListSearchRecord.getValue('custrecord_share_list_with'),
                    owner: {
                        id: productListSearchRecord.getValue('custrecord_ns_pl_pl_owner'),
                        name: productListSearchRecord.getText('custrecord_ns_pl_pl_owner')
                    },
                    scopeId: productListSearchRecord.getValue('custrecord_ns_pl_pl_scope'),
                    scopeName: productListSearchRecord.getText('custrecord_ns_pl_pl_scope'),
                    typeId: productListSearchRecord.getValue('custrecord_ns_pl_pl_type'),
                    typeName: productListTypeText,
                    created: productListSearchRecord.getValue('created'),
                    lastmodified: productListSearchRecord.getValue('lastmodified'),
                    lastmodifieddate: lastModifiedDateStr,
                    items: ProductListItemSearch.search(own, productListSearchRecord.getId(), includeStoreItems, {
                        sort: 'sku',
                        order: '1',
                        page: -1
                    })
                };

                if (templateIds && productList.templateId) {
                    templateIds.push(productList.templateId);
                }

                productLists.push(productList);
            });

            return productLists;
        },

        getSpecialTypeProductList: function getSpecialTypeProductList(user, typeId) {
            var filters;
            var productLists;
            var sflTemplate;

            this.verifySession();

            filters = [
                new nlobjSearchFilter('custrecord_ns_pl_pl_type', null, 'is', typeId),
                new nlobjSearchFilter('custrecord_ns_pl_pl_owner', null, 'is', user),
                new nlobjSearchFilter('isinactive', null, 'is', 'F')
            ];

            productLists = this.searchHelper(filters, this.getColumns(), true);

            if (!productLists.length) {
                sflTemplate = _(_(this.configuration.listTemplates).filter(function filterTemplates(pl) {
                    return pl.typeId && pl.typeId === typeId;
                })).first();

                if (sflTemplate) {
                    if (!sflTemplate.scope) {
                        sflTemplate.scope = { id: typeId, name: 'private' };
                    }

                    if (!sflTemplate.description) {
                        sflTemplate.description = '';
                    }

                    return sflTemplate;
                }

                throw notFoundError;
            } else {
                return productLists[0];
            }
        },

        // Updates a given Product List given its id
        update: function update(user, id, data) {
            var productList;

            this.verifySession();

            productList = nlapiLoadRecord('customrecord_ns_pl_productlist', id);

            this.verifyInviteeOnList(productList, user);

            if (data.templateId) {
                productList.setFieldValue('custrecord_ns_pl_pl_templateid', data.templateId);
            }

            if (data.scopeId) {
                productList.setFieldValue('custrecord_ns_pl_pl_scope', data.scopeId);
            }

            if (data.typeId) {
                productList.setFieldValue('custrecord_ns_pl_pl_type', data.typeId);
            }

            if (data.name) {
                productList.setFieldValue('name', this.sanitize(data.name));
            }

            if (data.scopeName === 'shared') {
                productList.setFieldValue('custrecord_share_list_with', data.sharelistwith);
            }

            productList.setFieldValue('custrecord_ns_pl_pl_scope', scopeNameMapping[data.scopeName]);

            productList.setFieldValue('custrecord_ns_pl_pl_description', data.description ? this.sanitize(data.description) : '');

            nlapiSubmitRecord(productList);
        }
    });
});
