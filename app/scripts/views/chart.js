define([
    'underscore',
    'backbone',
    'highcharts'
], function (_, Backbone, Highcharts) {
    'use strict';

    var ChartView = Backbone.View.extend({

        el: '#view',

        events: {
            'click #chart-tab': 'toggle'
        },

        initialize: function () {
            this.$columnChart = this.$('#column');
            this.$lineChart = this.$('#line');

            this.listenTo(this.collection, 'chart_change', this.render);

            this.toggle();
        },

        render: function () {
            this.$columnChart.highcharts(this.collection.columnChartOptions);
            this.$lineChart.highcharts(this.collection.lineChartOptions);
            return this;
        },

        toggle: function () {
            this.collection.updateChart();
        }

    });

    return ChartView;
});
