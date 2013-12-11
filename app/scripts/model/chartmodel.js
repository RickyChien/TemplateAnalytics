var Analytics = Analytics || {};

(function() {
  'use strict';

  function ChartModel() {
    window.Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
  }

  ChartModel.prototype = {

    create: function(data) {
      // Return default chart if data is empty
      if (data.length === 0) {        
        return [{
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
          series: [{
              name: 'Unread'
            }, {
              name: 'Read'
          }]
        }, {
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
        }];
      }

      var options = [];

      options.push(this.createColumnChart(data));
      options.push(this.createLineChart(data));

      return options;
    },

    createColumnChart: function(data) {
      var categories = [],
          read = [],
          unread = [],
          series,
          options = {},
          key,
          keyItem;

      // Calculate column chart information
      data.forEach(function(item) {
        keyItem = options[item.content] = options[item.content] || {};
        keyItem.unread = keyItem.unread || 0;
        keyItem.read = keyItem.read || 0;
        (item.status == 0) ? (++keyItem.unread) : (++keyItem.read);
      });

      for (key in options) {
        categories.push(key);
        read.push(options[key].read);
        unread.push(options[key].unread);
      }

      series = [{
          name: 'Unread',
          data: unread
        }, {
          name: 'Read',
          data: read
      }];

      return {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Column Chart'
        },
        xAxis: {
          categories: categories
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
        series: series
      }
    },

    createLineChart: function(data) {
      var series = [],
          seriesData,
          options = {},
          keyItem,
          date,
          key,
          inkey;

      // Calculate line chart information
      data.forEach(function(item) {
        keyItem = options[item.content] = options[item.content] || {};
        date = new Date(item.time);
        date = date.toString().substring(0, 18);
        date += ':00';

        keyItem.read = keyItem.read || {};
        keyItem.unread = keyItem.unread || {};
        keyItem.read[date] = keyItem.read[date] || 0;
        keyItem.unread[date] = keyItem.unread[date] || 0;

        (item.status == 0) ? (++keyItem.unread[date]) : (++keyItem.read[date]);
      });

      for (key in options) {
        keyItem = options[key].read;
        seriesData = [];

        for (inkey in keyItem) {

          date = new Date(inkey);
          date = date.getTime();
          seriesData.push([date, keyItem[inkey]]);
        }

        series.push({
          name: key,
          data: seriesData.sort(),
          pointInterval: 24 * 3600 * 1000
        });
      }

      return {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Line Chart',
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
        tooltip: {
          valueSuffix: ' reads'
        },
        series: series
      };
    }

  };

  Analytics.ChartModel = ChartModel;

})();
