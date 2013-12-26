define([
    'underscore',
    'backbone',
    'jquery_ui_slider',
    'jquery_ui_timepicker',
    'views/grid',
    'views/chart',
    'views/map',
    'collections/notifications'
], function (_, Backbone, Slider, Timepicker, GridView, ChartView, MapView, Notifications) {
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
            this.$collection = new Notifications();

            this.renderGrid();
        },

        renderGrid: function () {
            this.$GirdView = this.$GirdView || new GridView({ collection: this.$collection });
        },

        renderChart: function () {
            this.$ChartView = this.$ChartView || new ChartView({ collection: this.$collection });
        },

        renderMap: function () {
            this.$MapView = this.$MapView || new MapView({ collection: this.$collection });
        }

    });

    return AppView;
});
