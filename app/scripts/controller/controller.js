var Analytics = Analytics || {};

(function() {
  'use strict';

  function Controller() {
    this.data = [];
  }

  Controller.prototype = {

    initialize: function() {
      var self = this;

      window.paceOptions = {
        target: '.progress-wrapper',
        restartOnRequestAfter: 10
      };

      $('#start-time').datetimepicker();
      $('#end-time').datetimepicker();

      $('#search-btn').click(function() {
        var hash = window.location.hash || '#push_notification',
            path = "scripts/" + hash.substring(1) + ".json",
            start = $('#start-time'),
            end = $('#end-time'),
            now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate();

        // Auto zerofill if value has only one digit
        month = (('0' + month).length > 2) ? month : ('0' + month);
        date = (('0' + date).length > 2) ? date : ('0' + date);

        // Setting default search time if user does not give
        start.val(start.val() || month + '/' + date + '/' + year + ' 00:00');
        end.val(end.val() || start.val().substring(0, 10) + ' 23:59');

        $.ajax({
          url: path,
          dataType: "json"
        }).done(function(data) {
          self.data = data;
          self.showGrid();
          $('#grid-tab').click();
        }).fail(function() {
          console.log('Searching data error');
        });

      });

      $('#chart-tab').click(function() {
        self.showChart();
      });

      $('#map-tab').click(function() {
        self.showMap();
      });

      $(window).on('hashchange', function() {
        $('.list-group-item').removeClass('active');
        $('a[href="' + window.location.hash + '"]').addClass('active');
        $('#search-btn').click();
      });
    },

    getSelectedData: function() {
      var selected = [];

      $('input:checked').closest('td').siblings('.content').each(function() {
        selected.push(this.innerHTML);
      });

      return this.data.filter(function(item) {
        for (var i = 0; i < selected.length; i++) {
          if (selected[i] === item.content) {
            return true;
          }
        }
        return false;
      });
    },

    showGrid: function() {
      // Directly refresh if it has been initialized
      if (this.gridview && this.gridmodel) {
        this.gridview.setView(this.gridmodel.create(this.data));
        return;
      }

      this.gridview = new Analytics.GridView();
      this.gridmodel = new Analytics.GridModel();
      this.gridview.setView(this.gridmodel.create(this.data));
    },

    showChart: function () {
      // Directly refresh if it has been initialized
      if (this.chartview && this.chartmodel) {
        this.chartview.setView(this.chartmodel.create(this.getSelectedData()));
        return;
      }

      var self = this;

      function getHighChart() {
        return $.ajax({
          url: "http://cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.2/highcharts.js",
          dataType: "script"
        });
      }

      function getChartView() {
        return $.ajax({
          url: "scripts/view/chartview.js",
          dataType: "script"
        });
      }

      function getChartModel() {
        return $.ajax({
          url: "scripts/model/chartmodel.js",
          dataType: "script"
        });
      }

      $.when(getHighChart(), getChartView(), getChartModel()).done(function() {
        self.chartview = new Analytics.ChartView();
        self.chartmodel = new Analytics.ChartModel();
        self.chartview.setView(self.chartmodel.create(self.getSelectedData()));
      }).fail(function() {
        console.log("Loading highcharts script error.");
      });
    },

    showMap: function() {
      // Directly refresh if it has been initialized
      if (this.mapview && this.mapmodel) {
        this.mapview.setView(this.mapmodel.create(this.getSelectedData()));
        return;
      }

      var self = this;

      window.initGoogleMap = window.initGoogleMap || function initGoogleMap() {
        // Do nothing here because we use Gmap3 to setup google map
      };

      function getGoogleMap() {
        return $.ajax({
          url: "http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initGoogleMap",
          dataType: "script"
        });
      }

      function getGmap3() {
        return $.ajax({
          url: "http://cdn.jsdelivr.net/gmap3/5.1.1/gmap3.min.js",
          dataType: "script"
        });
      }

      function getColors() {
        return $.ajax({
          url: "scripts/model/colors.js",
          dataType: "script"
        });
      }

      function getMapView() {
        return $.ajax({
          url: "scripts/view/mapview.js",
          dataType: "script"
        });
      }

      function getMapModel() {
        return $.ajax({
          url: "scripts/model/mapmodel.js",
          dataType: "script"
        });
      }

      $.when(getGoogleMap(), getGmap3(), getColors(), getMapView(), getMapModel()).done(function() {
        self.mapview = new Analytics.MapView();
        self.mapmodel = new Analytics.MapModel();
        self.mapview.setView(self.mapmodel.create(self.getSelectedData()));
      }).fail(function() {
        console.log("Loading gmap scirpt error.");
      });
    }

  };

  Analytics.Controller = Controller;

}());
