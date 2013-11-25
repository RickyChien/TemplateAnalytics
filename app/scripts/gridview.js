/*
 * Grid View
 */

var GridView = GridView || {
  
  _createTableRow: function _createTableRow(element) {
    var tr = $('<tr>'),
        checkbox = { type: 'checkbox' };

    $('<input>', checkbox).wrap('<td>').parent().appendTo(tr);
    $('<td>').text(element.Host).appendTo(tr);
    $('<td>').text(element.Origin).appendTo(tr);
    $('<td>').text(element.Accept).appendTo(tr);

    return tr;
  },

  updateView: function updateView(data) {
    var fragment = document.createDocumentFragment();
        tr = this._createTableRow(data);

    $(fragment).append(tr);
    $('#grid-data tbody').append(fragment);
  }
};
