var Analytics = Analytics || {};

(function() {
  'use strict';

  function GridView() {

  }

  GridView.prototype = {

    setView: function(options) {
      var tbody = $('<tbody>').addClass('table-content'),
          content = [],
          key,
          tr,
          checkbox,
          count = 0;

      for (key in options) {
        var item = options[key];

        tr = $('<tr>');
        checkbox = { type: 'checkbox' };
        $('<input>', checkbox).attr('id', count++).wrap('<td>').parent().appendTo(tr);
        $('<td>').text(key).attr('class','content').appendTo(tr);
        $('<td>').text(item.read).appendTo(tr);
        $('<td>').text(item.unread).appendTo(tr);
        $('<td>').text(item.rate + " %").appendTo(tr);
        content.push(tr);
      }

      tbody.append(content);
      $('#grid-data tbody').replaceWith(tbody);
    }
    
  };

  Analytics.GridView = GridView;

})();
