define([
    'underscore',
    'backbone',
    'jquery_ui_slider',
    'jquery_ui_timepicker'
], function (_, Backbone, Slider, Timepicker) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#view',

        events: {
            'click #grid-tab': 'renderGrid',
            'click #chart-tab': 'renderChart',
            'click #map-tab': 'renderMap'
        },

        initialize: function () {
            this.$start = this.$('#start-time');
            this.$end = this.$('#end-time');
            this.$start.datetimepicker();
            this.$end.datetimepicker();
        },

        renderGrid: function () {
            var self = this;
            if (!this.GridView) {
                require(['views/grid'], function (GridView) {
                    self.GridView = new GridView({ collection: self.records });
                });
            }
        },

        renderChart: function () {
            var self = this;
            if (!this.ChartView) {
                require(['views/chart'], function (ChartView) {
                    self.ChartView = new ChartView({ collection: self.records });
                });
            }
        },

        renderMap: function () {
            var self = this;
            if (!this.MapView) {
                require(['views/map'], function (MapView) {
                    self.MapView = new MapView({ collection: self.records });
                });
            }
        }

    });

    return AppView;
});
