var Analytics = Analytics || {};

(function() {
  'use strict';

  function GridModel() {

  }

  GridModel.prototype = {

    create: function(data) {
      var options = {},
          key;

      data.forEach(function(item) {
        var keyItem = options[item.content] = options[item.content] || {};
        keyItem.unread = keyItem.unread || 0;
        keyItem.read = keyItem.read || 0;
        (item.status == 0) ? (++keyItem.unread) : (++keyItem.read);
      });

      for (key in options) {
        var item = options[key];
        item.rate = (item.read / (item.read + item.unread) * 100).toFixed(2);
      }

      return options;
    }

  };
    
  Analytics.GridModel = GridModel;

})();
