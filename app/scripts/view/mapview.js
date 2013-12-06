var Analytics = Analytics || {};

(function() {
  'use strict';

  function MapView() {

  }

  MapView.prototype = {

    setView: function(options) {
      $("#map-canvas").gmap3({
        clear: {
          name: "marker"
        }
      });

      options.forEach(function(opt) {
        $("#map-canvas").gmap3(opt);
      });
    }
    
  };

  Analytics.MapView = MapView;

})();
