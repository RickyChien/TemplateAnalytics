define([
    'underscore',
    'backbone',
    'models/Notification'
], function (_, Backbone, Notification) {
    'use strict';

    var Records = Backbone.Collection.extend({

        model: function (attrs, options) {
            return new Notification(attrs, options);
        },

        url: 'scripts/api/notifications.json',

        initialize: function () {
            this.columnAttrs = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column Chart'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    min: 0,
                    title: {
                      text: 'Total quantity'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>:' +
                        ' <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    }
                },
                series: [{
                        name: 'Unread',
                        data: []
                    }, {
                        name: 'Read',
                        data: []
                }]
            };

            this.lineAttrs = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Line Chart'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Reads'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' reads'
                },
                series: []
            };
        },

        getColumnChart: function () {
            var attrs = this.columnAttrs,
                categories = [],
                unreads = [],
                reads = [];

            this.each(function (record) {
                if (record.get('selected')) {
                    categories.push('ID' + record.id);
                    reads.push(record.get('read_count'));
                    unreads.push(record.get('unread_count'));
                }
            });

            attrs.xAxis.categories = categories;
            attrs.series[0].data = unreads;
            attrs.series[1].data = reads;

            return attrs;
        },

        getLineChart: function () {
            var attrs = this.lineAttrs,
                series = [];

            this.each(function (record) {
                if (record.get('selected')) {
                    var reads = {},
                        seriesData = [],
                        date;

                    record.logs.each(function (log) {
                        date = new Date(log.get('updated_at'));
                        date = date.toString().substring(0, 18) + ':00';

                        if (log.get('status') >= 2) {
                            reads[date] = reads[date] || 0;
                            ++reads[date];
                        }
                    });

                    for (var time in reads) {
                        date = new Date(time);
                        seriesData.push([date.getTime(), reads[time]]);
                    }

                    series.push({
                        name: 'ID ' + record.id,
                        data: seriesData.sort()
                    });
                }
            });

            attrs.series = series;

            return attrs;
        }

    });

    return Records;
});
