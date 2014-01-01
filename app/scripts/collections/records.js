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

            this.each(function (record) {
                if (record.get('selected')) {
                    options.xAxis.categories.push('ID ' + record.id);
                    options.series[0].data.push(record.get('unread_count'));
                    options.series[1].data.push(record.get('read_count'));
                }
            });

            return options;
        },

        updateLineChart: function () {
            var options = {
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
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
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

                        if (log.get('status') >= 2) {
                            values[date] = values[date] || 0;
                            ++values[date];
                        }
                    });

                    for (var time in values) {
                        date = new Date(time);
                        seriesData.push([date.getTime(), values[time]]);
                    }

                    options.series.push({
                        name: 'ID ' + record.id,
                        data: seriesData.sort()
                    });
                }
            });

            return options;
        },

        updateMap: function () {
            var options = [],
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
                            content: log.get('content'),
                            latLng: [log.get('lat'), log.get('lng')]
                        };
                    });

                    options.push({
                        map: {
                            options: {
                                center: [23.57873, 121.0227],
                                zoom: 7,
                                mapTypeControlOptions: {
                                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                                }
                            }
                        },
                        marker: {
                            values: markers,
                            cluster: {
                                radius: 100,
                                0: {
                                    content: "<div class='cluster cluster-s' style='background: " + 
                                        color + "''>CLUSTER_COUNT</div>",
                                    width: 50,
                                    height: 50
                                },
                                5: {
                                    content: "<div class='cluster cluster-m' style='background: " + 
                                        color + "''>CLUSTER_COUNT</div>",
                                    width: 80,
                                    height: 80
                                },
                                10: {
                                    content: "<div class='cluster cluster-l' style='background: " + 
                                        color + "''>CLUSTER_COUNT</div>",
                                    width: 110,
                                    height: 110
                                }
                            }
                        }
                    });
                }
            });

            this.mapOptions = options;
            this.trigger('map_change');

            return options;
        }

    });

    return Records;
});
