define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MapView = Backbone.View.extend({

        el: '#visualization',

        events: {
            'click #map-tab': 'toggle'
        },

        initialize: function () {
            this.$map = this.$('#map-canvas');

            this.listenTo(this.collection, 'map_change', this.render);

            this.toggle();
        },

        render: function () {
            var self = this;

            // Reset map position and clear markers
            this.$map.gmap3({
                map: {
                    options: {
                        center: [23.57873, 121.0227],
                        zoom: 7,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                        }
                    }
                },
                infowindow: {},
                clear: {
                    name: 'marker'
                }
            });

            // Add map data
            this.collection.mapOptions.forEach(function (cluster) {
                self.$map.gmap3({
                    marker: {
                        values: cluster.markers,
                        events: {
                            mouseover: function (marker, event, context){
                                var map = self.$map.gmap3('get'),
                                    infowindow = self.$map.gmap3({ get: { name: 'infowindow' } });

                                infowindow.open(map, marker);
                                infowindow.setContent(context.data);
                            },
                            mouseout: function () {
                                var infowindow = self.$map.gmap3({ get: { name: 'infowindow' } });
                                infowindow.close();
                            }
                        },
                        cluster: {
                            radius: 300,
                            0: {
                                content: '<div class="cluster cluster-s" style="background: ' +
                                    cluster.color + '">CLUSTER_COUNT</div>',
                                width: 50,
                                height: 50
                            },
                            5: {
                                content: '<div class="cluster cluster-m" style="background: ' +
                                    cluster.color + '">CLUSTER_COUNT</div>',
                                width: 80,
                                height: 80
                            },
                            10: {
                                content: '<div class="cluster cluster-l" style="background: ' +
                                    cluster.color + '">CLUSTER_COUNT</div>',
                                width: 110,
                                height: 110
                            },
                            events: {
                                mouseover: function (cluster, event, context){
                                    var map = self.$map.gmap3('get'),
                                        infowindow = self.$map.gmap3({ get: { name: 'infowindow' } });

                                    infowindow.open(map, cluster.main);
                                    infowindow.setContent(context.data.markers[0].data);
                                }
                            }
                        }
                    }
                });
            });

            return this;
        },

        toggle: function () {
            var self = this;

            // Load script on demand
            require(['gmap3'], function () {
                self.collection.updateMap();
            });
        }

    });

    return MapView;
});
