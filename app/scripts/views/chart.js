define([
    'underscore',
    'backbone',
    'highcharts'
], function (_, Backbone, Highcharts) {
    'use strict';

    var ChartView = Backbone.View.extend({

        el: '#content',

        events: {
            'click #chart-tab': 'render'
        },

        initialize: function () {
            this.$columnChart = this.$('#column');
            this.$lineChart = this.$('#line');

            this.render();
        },

        render: function () {
            this.$columnChart.highcharts(this.collection.getColumnChart());
            this.$lineChart.highcharts(this.collection.getLineChart());
            return this;
        }

    });

    return ChartView;
});
