define([
    'underscore',
    'backbone',
    'models/record'
], function (_, Backbone, Notification) {
    'use strict';

    var Records = Backbone.Collection.extend({

        model: function (attrs, options) {
            attrs.type = 'notifications';
            return new Notification(attrs, options);
        },

        url: 'scripts/api/notifications.json',

        getColumnChart: function () {
            var attrs = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column Chart'
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
                        name: 'Unread'
                    }, {
                        name: 'Read'
                }]
            };

            return attrs;
        },

        getLineChart: function () {
            var attrs = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Line Chart'
                },
                    xAxis: {
                    type: 'datetime',
                    tickInterval: 3600 * 1000
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
                series: [{}]
            };

            return attrs;
        }

    });

    return Records;
});
