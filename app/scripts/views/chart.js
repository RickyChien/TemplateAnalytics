define([
    'underscore',
    'backbone',
    'highcharts'
], function (_, Backbone, Highcharts) {
    'use strict';

    var ChartView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.$columnChart = this.$('#column');
            this.$lineChart = this.$('#line');

            this.listenTo(this.collection, 'sync', this.render);

            this.fetchLogs();
        },

        render: function () {
            this.$columnChart.highcharts(this.collection.getColumnChart());
            this.$lineChart.highcharts(this.collection.getLineChart());
            return this;
        },

        fetchLogs: function () {
            this.collection.each(function (model) {
                model.logs.fetch();
            });
            this.collection.trigger('sync');
        }

    });

    return ChartView;
});
