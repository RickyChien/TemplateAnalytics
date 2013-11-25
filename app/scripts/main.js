(function() {
  $('#start-time').datetimepicker();
  $('#end-time').datetimepicker();
  $.ajax({
    data: {format: "json"},
    url: "http://headers.jsontest.com/"
  }).done(function(data) {
    GridView.updateView(data);
  });
}());
