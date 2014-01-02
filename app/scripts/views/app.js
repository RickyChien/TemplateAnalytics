define([
    'underscore',
    'backbone',
    'jquery_ui_slider',
    'jquery_ui_timepicker',
    'views/grid',
    'views/chart',
    'views/map'
], function (_, Backbone, Slider, Timepicker, GridView, ChartView, MapView) {
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
            this.GridView = this.GridView || new GridView({ collection: this.collection });
        },

        showChart: function () {
            this.ChartView = this.ChartView || new ChartView({ collection: this.collection });
        },

        showMap: function () {
            this.MapView = this.MapView || new MapView({ collection: this.collection });
        }

    });

    return AppView;
});
