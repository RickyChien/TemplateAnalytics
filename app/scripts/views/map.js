define([
    'underscore',
    'backbone',
    'gmap3'
], function (_, Backbone) {
    'use strict';

    var MapView = Backbone.View.extend({

        el: '#view',

        events: {
            'click #map-tab': 'render'
        },

        initialize: function () {
            this.$map = this.$('#map-canvas');
            this.render();
        },

        render: function () {
            var mapOpts = this.collection.getMapOptions(),
                self = this;

            // Clear maps data
            this.$map.gmap3({
                clear: {
                    name: 'marker'
                }
            });

            // Setup new maps data
            mapOpts.forEach(function (opt) {
                self.$map.gmap3(opt);
            });

            return this;
        }

    });

    return MapView;
});
