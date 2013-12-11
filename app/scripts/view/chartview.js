var Analytics = Analytics || {};

(function() {
  'use strict';

  function ChartView() {

  }

  ChartView.prototype = {

    setView: function(options) {
      options.forEach(function(highchart) {
        $('#' + highchart.chart.type).highcharts(highchart);
      });
    }

  };

  Analytics.ChartView = ChartView;

})();
