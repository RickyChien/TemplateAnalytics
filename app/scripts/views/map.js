define([
    'underscore',
    'backbone',
    'gmap3'
], function (_, Backbone, GMap) {
    'use strict';

    var MapView = Backbone.View.extend({

        el: '#view',

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

            // Clear maps data
            this.$map.gmap3({
                clear: {
                    name: 'marker'
                }
            });

            // Setup new maps data
            this.collection.mapOptions.forEach(function (opt) {
                self.$map.gmap3(opt);
            });

            return this;
        },

        toggle: function () {
            this.collection.updateMap();
        }

    });

    return MapView;
});
