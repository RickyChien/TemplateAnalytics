var Analytics = Analytics || {};

(function() {
  'use strict';

  function GridView() {

  }

  GridView.prototype = {

    initialize: function(data) {
      function createTableRow(data) {
        var tr = $('<tr>'),
            checkbox = { type: 'checkbox' };

        $('<input>', checkbox).wrap('<td>').parent().appendTo(tr);
        $('<td>').text(data.Host).appendTo(tr);
        $('<td>').text(data.Origin).appendTo(tr);
        $('<td>').text(data.Accept).appendTo(tr);

        return tr;
      }

      var fragment = document.createDocumentFragment(),
          tr = createTableRow(data),
          self = this;

      $(fragment).append(tr);
      $('#grid-data tbody').append(fragment);
      $('#grid-tab').click(function(e) {
        e.preventDefault();
        self.render();
      });
    },

    render: function() {
      $('#chart').hide();
      $('#grid').show();
      $('#map').hide();
    }

  };

  Analytics.GridView = GridView;

})();

(function() {
  'use strict';

  function ChartView() {

  }

  ChartView.prototype = {

    initialize: function(data) {
      var self = this;
      $('#chart-tab').click(function(e) {
        e.preventDefault();
        self.render();
      });
    },

    render: function() {
      $('#chart').show();
      $('#grid').hide();
      $('#map').hide();
    }

  };

  Analytics.ChartView = ChartView;

})();

(function() {
  'use strict';

  function MapView() {

  }

  MapView.prototype = {

    initialize: function(data) {
      var self = this;
      $('#map-tab').click(function(e) {
        e.preventDefault();
        self.render();
      });
    },
    
    render: function() {
      $('#chart').hide();
      $('#grid').hide();
      $('#map').show();
    }

  };

  Analytics.MapView = MapView;

})();
