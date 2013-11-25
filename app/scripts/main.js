(function() {
  $('#start-time').datetimepicker();
  $('#end-time').datetimepicker();

  var analytics = {};
  analytics.view = new Analytics.View();

  $.ajax({
    data: {format: "json"},
    url: "http://headers.jsontest.com/"
  }).done(function(data) {
    analytics.view.updateGridView(data);
  });

}());
