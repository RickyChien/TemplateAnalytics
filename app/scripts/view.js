var Analytics = Analytics || {};
(function() {
  'use strict';

  function View() {

  }

  View.prototype = {

    _createTableRow: function _createTableRow(element) {
      var tr = $('<tr>'),
          checkbox = { type: 'checkbox' };

      $('<input>', checkbox).wrap('<td>').parent().appendTo(tr);
      $('<td>').text(element.Host).appendTo(tr);
      $('<td>').text(element.Origin).appendTo(tr);
      $('<td>').text(element.Accept).appendTo(tr);

      return tr;
    },

    updateGridView: function updateView(data) {
      var fragment = document.createDocumentFragment(),
          tr = this._createTableRow(data);

      $(fragment).append(tr);
      $('#grid-data tbody').append(fragment);
    }
    
  };

  Analytics.View = View;

})();
