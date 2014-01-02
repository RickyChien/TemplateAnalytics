define(function (require) {
    'use strict';

    var Underscore = require('underscore'),
        Backbone = require('backbone');

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
            var self = this;

            // Load script on demand
            require(['highcharts'], function () {
                self.collection.updateChart();
            });
        }

    });

    return ChartView;
});
