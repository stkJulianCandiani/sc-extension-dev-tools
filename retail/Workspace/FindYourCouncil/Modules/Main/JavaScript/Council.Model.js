/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('Council.Model', [
    'Item.Collection',
    'Backbone.CachedModel',
    'Council.KeyMapping',
    'underscore'
], function CouncilModel(
    ItemCollection,
    BackboneCachedModel,
    CouncilKeyMapping,
    _
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    var Collection = null;

    return BackboneCachedModel.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/Council.Service.ss')),

        get: function get(attr) {
            var keyMapping = CouncilKeyMapping.getCouncilKeyMapping();
            var mappedKey;
            var i;

            if (keyMapping && !this.attributes[attr] && keyMapping[attr]) {
                mappedKey = keyMapping[attr];

                if (_.isFunction(mappedKey)) {
                    this.attributes[attr] = mappedKey(this);
                } else if (_.isArray(mappedKey)) {
                    for (i = 0; i < mappedKey.length; i++) {
                        if (this.attributes[mappedKey[i]]) {
                            this.attributes[attr] = this.attributes[mappedKey[i]];
                            break;
                        }
                    }
                } else {
                    this.attributes[attr] = this.attributes[mappedKey];
                }
            }

            if (attr === '_marketing_spaces') {
                Collection = Collection || ItemCollection;
                this.attributes[attr] = new Collection(this.attributes[attr] || []);
            }

            return this.attributes[attr];
        }
    });
});
