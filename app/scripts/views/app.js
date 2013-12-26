define([
    'underscore',
    'backbone',
    'jquery_ui_slider',
    'jquery_ui_timepicker',
    'collections/records'
], function (_, Backbone, Slider, Timepicker, Records) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#view',

        events: {
            'click #grid-tab': 'renderGrid',
            'click #chart-tab': 'renderChart',
            'click #map-tab': 'renderMap',
        },

        initialize: function () {
            this.$start = this.$('#start-time');
            this.$end = this.$('#end-time');
            this.$start.datetimepicker();
            this.$end.datetimepicker();
            this.$records = new Records();

            this.renderGrid();
        },

        renderGrid: function () {
            var self = this;
            require(['views/grid'], function (GridView) {
                self.$GirdView = self.$GirdView || new GridView({ collection: self.$records });
            });
        },

        renderChart: function () {
            var self = this;
            require(['views/chart'], function (ChartView) {
                self.$ChartView = self.$ChartView || new ChartView({ collection: self.$records });
            });
        },

        renderMap: function () {
            var self = this;
            require(['views/map'], function (MapView) {
                self.$MapView = self.$MapView || new MapView({ collection: self.$records });
            });
        }

    });

    return AppView;
});
