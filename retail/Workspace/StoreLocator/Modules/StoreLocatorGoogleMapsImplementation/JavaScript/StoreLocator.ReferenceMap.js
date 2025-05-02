/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('StoreLocator.ReferenceMap', [
    'ReferenceMap',
    'underscore',
    'GoogleMap'
], function StoreLocatorReferenceMap(
    ReferenceMap,
    _
) {
    'use strict';


    /* globals google */
    ReferenceMap.prototype.showPoint = function showPoint(point, map) {
        map = map || this.map;

        if (!map) {
            return;
        }
        var location = point.get('location');
        var type = (point.get('storetype') ? point.get('storetype').toLowerCase() : 'stores');

        var marker = new google.maps.Marker({
            store_id: point.get('internalid'),
            icon: _.getAbsoluteUrlOfNonManagedResources(this.configuration.iconOptions(type)),
            map: map
        });

        marker.setPosition(new google.maps.LatLng(location.latitude, location.longitude));
        marker.setVisible(true);

        marker.addListener(
            'click',
            _.bind(function() {
                this.showInfoWindowOnClick(marker, map);
            }, this)
        );

        return marker;
    };

    ReferenceMap.prototype.showPointWithoutInfoWindow = function showPointWithoutInfoWindow(point, map) {
        map = map || this.map;

        if (!map) {
            return;
        }
        var type = (point.get('storetype') ? point.get('storetype').toLowerCase() : 'stores');

        var location = point.get('location');
        var marker = new google.maps.Marker({
            store_id: point.get('internalid'),
            icon: _.getAbsoluteUrlOfNonManagedResources(this.configuration.iconOptions(type)),
            map: map
        });

        marker.setPosition(new google.maps.LatLng(location.latitude, location.longitude));

        marker.setVisible(true);

        this.detail_point = marker;

        return marker;
    };

     // Fix of the default zoom level issue
    ReferenceMap.prototype.showMap = function showMap(container) {
        var map_configuration = this.configuration.mapOptions();
        var map_options = {
            center: new google.maps.LatLng(
                map_configuration.centerPosition.latitude,
                map_configuration.centerPosition.longitude
            ),
            zoom: map_configuration.zoom,
            mapTypeControl: map_configuration.mapTypeControl,
            streetViewControl: map_configuration.streetViewControl,
            mapTypeId: google.maps.MapTypeId[map_configuration.mapTypeId],
            disableDefaultUI: true
        };

        var map = new google.maps.Map(container, map_options);

        var self = this;

        google.maps.event.addListener(map, 'tilt_changed', _.bind(function () {
            google.maps.event.addListenerOnce(map, 'idle', _.bind(function() {
                setTimeout(function() {
                    map.setCenter(map.getCenter());
                    var position = self.myposition || {};

                    if (((!_.isUndefined(position.latitude) && !_.isUndefined(position.longitude)) && !self.points.length) || self.model) {
                        map.setZoom(self.configuration.zoomInDetails());
                    }
                });
            }, this));

            if (this.points.length) {
                this.fitBounds(map);
            } else if (this.detail_point) {
                this.fitBounds(map);

                map.setCenter(map.getCenter());

                map.setZoom(this.configuration.zoomInDetails());
            } else {
                this.centerMapToDefault(map);
            }

            google.maps.event.trigger(map, 'resize');
        }, this));

        this.map = map;

        return map;
    };

    ReferenceMap.prototype.showMyPosition = function showMyPosition(position, map) {
        position = position || this.myposition;

        map = map || this.map;

        if (!position || !map) {
            return;
        }

        if (map.myPositionMarker) {
            map.myPositionMarker.setMap(null);
        }

        map.myPositionMarker = new google.maps.Marker({
            icon: _.getAbsoluteUrlOfNonManagedResources(this.configuration.iconOptions('position')),
            map: map
        });

        position.location =
            position.location || new google.maps.LatLng(position.latitude, position.longitude);

        map.myPositionMarker.setPosition(position.location);

        map.myPositionMarker.setVisible(true);

        var self = this;
        google.maps.event.addListenerOnce(map, 'idle', _.bind(function() {
            setTimeout(function() {
                var position = self.myposition || {};

                if ((!_.isUndefined(position.latitude) && !_.isUndefined(position.longitude)) && self.points.length) {
                    self.fitBounds(map);
                }
            });
        }, this));

        if (position.viewport) {
            map.fitBounds(position.viewport);
        } else {
            var map_options = this.configuration.mapOptions();
            map.setCenter(position.location);
            map.setZoom(map_options.zoom);
        }

        return map.myPositionMarker;
    };
    // End of Fix of the default zoom level issue

});
