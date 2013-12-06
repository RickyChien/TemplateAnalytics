var Analytics = Analytics || {};

(function() {
  'use strict';

  function MapModel() {
    this.colors = new Analytics.Colors();
  }

  MapModel.prototype = {

    createMapOptions: function(data) {
      if (data.length === 0) {
        return [{
          map: {
            options: {
              center: [23.57873, 121.0227],
              zoom: 7,
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
              }
            }
          }
        }];
      }

      var clusters = {},
          markerTypes = [],
          content,
          options = [],
          key;

      data.forEach(function(item) {
        content = item.content;

        if (markerTypes.indexOf(content) === -1) {
          markerTypes.push(content);
        } else {
          clusters[content] = clusters[content] || [];
          clusters[content].push(item);
        }
      });

      this.colors.count = 0;

      for (key in clusters) {
        options.push(this.createMarker(clusters[key]));
      }

      return options;
    },

    createMarker: function(data) {
      var opt,
          markers,
          randomColor = this.colors.noRandom();

      markers = data.map(function(item) {
        return {
          content: item.content,
          latLng: [item.lat, item.lng]
        };
      });

      opt = {
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
              content: "<div class='cluster cluster-s' style='background: " + randomColor + "''>CLUSTER_COUNT</div>",
              width: 50,
              height: 50
            },
            5: {
              content: "<div class='cluster cluster-m' style='background: " + randomColor + "''>CLUSTER_COUNT</div>",
              width: 80,
              height: 80
            },
            10: {
              content: "<div class='cluster cluster-l' style='background: " + randomColor + "''>CLUSTER_COUNT</div>",
              width: 110,
              height: 110
            }
          }
        }
      };

      return opt;
    }
    
  };
    
  Analytics.MapModel = MapModel;

})();
