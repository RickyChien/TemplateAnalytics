define([
    'underscore',
    'backbone',
    'jquery_ui_slider',
    'jquery_ui_timepicker',
    'views/grid'
], function (_, Backbone, Slider, Timepicker, GridView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#view',

        events: {
            'click #grid-tab': 'showGrid',
            'click #chart-tab': 'showChart',
            'click #map-tab': 'showMap'
        },

        initialize: function () {
            this.$start = this.$('#start-time');
            this.$end = this.$('#end-time');
            this.$start.datetimepicker();
            this.$end.datetimepicker();
            this.$gridTab = this.$('#grid-tab');
        },

        render: function () {
            this.$gridTab.click();
        },

        update: function (models) {
            this.collection.reset(models);
        },

        showGrid: function () {
            if (!this.GridView) {
                this.GridView = new GridView({ collection: this.collection });
            }
        },

        showChart: function () {
            var self = this;

            // Loading script on demand
            if (!this.ChartView) {
                require(['views/chart'], function (ChartView) {
                    self.ChartView = new ChartView({ collection: self.collection });
                });
            }
        },

        showMap: function () {
            var self = this;

            // Loading script on demand
            if (!this.MapView) {
                require(['views/map'], function (MapView) {
                    self.MapView = new MapView({ collection: self.collection });
                });
            }
        }

    });

    return AppView;
});
