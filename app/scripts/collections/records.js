define([
    'underscore',
    'backbone',
    'colors',
    'models/record'
], function (_, Backbone, Colors, Record) {
    'use strict';

    var Records = Backbone.Collection.extend({

        model: Record,

        initialize: function () {
            this.colors = new Colors();
        },

        updateChart: function () {
            var options = [];

            this.columnChartOptions = this.updateColumnChart();
            this.lineChartOptions = this.updateLineChart();
            this.trigger('chart_change');

            options.push(this.columnChartOptions);
            options.push(this.columnChartOptions);

            return options;
        },

        updateColumnChart: function () {
            var options = {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
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
                    series: []
                },
                series = options.series;

            for (var attr in this.models[0].attributes) {
                if (attr.indexOf('_count') !== -1) {
                    series.push({
                        name: attr[0].toUpperCase() + attr.substring(1, attr.indexOf('_count')),
                        data: []
                    });
                }
            }

            this.each(function (record) {
                if (record.get('selected')) {
                    options.xAxis.categories.push('ID ' + record.id);
                    series.forEach(function (seriesItem) {
                        var name = seriesItem.name;
                        seriesItem.data.push(record.get(name[0].toLowerCase() + name.slice(1) + '_count'));
                    });
                }
            });

            return options;
        },

        updateLineChart: function () {
            var options = [],
                option;

            for (var attr in this.models[0].attributes) {
                if (attr.indexOf('_count') !== -1) {
                    option = {
                        chart: {
                            type: 'line'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Line Chart'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: attr[0].toUpperCase() + attr.substring(1, attr.indexOf('_count')) + 's'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: ' ' + attr.substring(0, attr.indexOf('_count')) + 's'
                        },
                        series: []
                    };

                    this.each(function (record) {
                        if (record.get('selected')) {
                            var values = {},
                                seriesData = [],
                                date;

                            record.get('logs').each(function (log) {
                                date = new Date(log.get('updated_at'));
                                date = date.toString().substring(0, 18) + ':00';

                                values[date] = values[date] || 0;
                                values[date] += log.get(attr);
                            });

                            for (var time in values) {
                                date = new Date(time);
                                seriesData.push([date.getTime(), values[time]]);
                            }

                            option.series.push({
                                name: 'ID ' + record.id,
                                data: seriesData.sort()
                            });
                        }
                    });

                    options.push(option);
                }
            }

            return options;
        },

        updateMap: function () {
            var clusters = [],
                self = this;

            this.colors.count = 0;

            this.each(function (record) {
                if (record.get('selected')) {
                    // Generate random location for demo
                    (function() {
                        var lat = 23.39781,
                            lng = 120.26051499,
                            min = 0.01,
                            max = 1.5;

                        record.get('logs').each(function(log) {
                            log.set({ lat: (lat + Math.random() * (max - min) + min) });
                            log.set({ lng: (lng + Math.random() * (max - min) + min) });
                        });
                    })();

                    var markers = [],
                        color = self.colors.getColor();

                    markers = record.get('logs').map(function (log) {
                        return {
                            data: record.get(record.get('key')),
                            latLng: [log.get('lat'), log.get('lng')]
                        };
                    });

                    clusters.push({
                        color: color,
                        markers: markers
                    });
                }
            });

            this.mapOptions = clusters;
            this.trigger('map_change');

            return clusters;
        }

    });

    return Records;
});
