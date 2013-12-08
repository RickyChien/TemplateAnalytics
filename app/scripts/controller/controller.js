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
          self.gridview = self.gridview || new Analytics.GridView(),
          self.gridmodel = self.gridmodel || new Analytics.GridModel(),
          self.gridview.setView(self.gridmodel.createGridOptions(data));
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

    showChart: function() {
      // Directly refresh if it has been initialized
      if (this.chartview && this.chartmodel) {
        this.chartview.setView(this.chartmodel.createChartOptions(this.getSelectedData()));
        return;
      }

      var self = this;

      $.ajax({
        url: "http://cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.2/highcharts.js",
        dataType: "script"
      }).done(function() {
        self.chartview = self.chartview || new Analytics.ChartView(),
        self.chartmodel = self.chartmodel || new Analytics.ChartModel(),
        self.chartview.setView(self.chartmodel.createChartOptions(self.getSelectedData()));
      }).fail(function() {
        console.log("Loading highcharts script error.");
      });
    },

    showMap: function() {
      // Directly refresh if it has been initialized
      if (this.mapview && this.mapmodel) {
        this.mapview.setView(this.mapmodel.createMapOptions(this.getSelectedData()));
        return;
      }

      var self = this;

      window.initGoogleMap = window.initGoogleMap || function initGoogleMap() {
        // Do nothing here because we use Gmap3 to setup google map
      };

      function getGoogleMapAjax() {
        return $.ajax({
          url: "http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initGoogleMap",
          dataType: "script"
        });
      }

      function getGmap3Ajax() {
        return $.ajax({
          url: "http://cdn.jsdelivr.net/gmap3/5.1.1/gmap3.min.js",
          dataType: "script"
        });
      }

      $.when(getGoogleMapAjax(), getGmap3Ajax()).done(function() {
        self.mapview = self.mapview || new Analytics.MapView(),
        self.mapmodel = self.mapmodel || new Analytics.MapModel(),
        self.mapview.setView(self.mapmodel.createMapOptions(self.getSelectedData()));
      }).fail(function() {
        console.log("Loading gmap scirpt error.");
      });
    }

  };

  Analytics.Controller = Controller;

}());
