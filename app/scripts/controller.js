(function() {
  $('#start-time').datetimepicker();
  $('#end-time').datetimepicker();

  var gridview = new Analytics.GridView(),
      chartview = new Analytics.ChartView(),
      mapview = new Analytics.MapView();

  $.ajax({
    data: {format: "json"},
    url: "http://headers.jsontest.com/"
  }).done(function(data) {
    gridview.initialize(data);
    chartview.initialize(data);
    mapview.initialize(data);
  });

  gridview.render();

}());
