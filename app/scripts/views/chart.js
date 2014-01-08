define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ChartView = Backbone.View.extend({

        el: '#visualization',

        events: {
            'click #chart-tab': 'toggle'
        },

        initialize: function () {
            this.$columnChart = this.$('#column');
            this.$lineChartTab = this.$('#line-tabs');
            this.$lineChart = this.$('#line');
            this.listenTo(this.collection, 'chart_change', this.render);

            this.toggle();
        },

        render: function () {
            var self = this;

            this.$columnChart.highcharts(this.collection.columnChartOptions);

            // Generate multi-type line chart
            this.$('#line-tabs li').remove();
            this.$('#line div').remove();
            this.collection.lineChartOptions.forEach(function (option, index) {
                var text = option.yAxis.title.text,
                    li = $('<a>').attr({
                        href: '#' + text,
                        'data-toggle': 'tab'
                    }).text(text).wrap('<li>').parent(),
                    div = $('<div>').attr({
                        id: text,
                        class: 'tab-pane'
                    }).highcharts(option).appendTo(self.$lineChart);

                if (index === 0) {
                    li.addClass('active');
                    div.addClass('active');
                }

                li.appendTo(self.$lineChartTab);
                div.appendTo(self.$lineChart);
            });

            return this;
        },

        toggle: function () {
            var self = this;

            // Load script on demand
            require(['highcharts'], function (Highcharts) {
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });
                self.collection.updateChart();
            });
        }

    });

    return ChartView;
});
