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
                },
                categories = [],
                unreads = [],
                reads = [];

            this.each(function (record) {
                if (record.get('selected')) {
                    categories.push('ID ' + record.id);
                    reads.push(record.get('read_count'));
                    unreads.push(record.get('unread_count'));
                }
            });

            options.xAxis.categories = categories;
            options.series[0].data = unreads;
            options.series[1].data = reads;

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
                    series: []
                },
                series = [];

            this.each(function (record) {
                if (record.get('selected')) {
                    var reads = {},
                        seriesData = [],
                        date;

                    record.get('logs').each(function (log) {
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

            options.series = series;

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
