describe('Controller', function () {
  describe('constructor', function () {
    before(function() {
      this.controller = new Analytics.Controller();
    });

    after(function() {
      delete this.controller;
    });

    it('should contain a data property', function () {
      expect(this.controller).to.include.keys('data');
    });
  });

  describe('initialize', function() {
    before(function() {
      this.controller = new Analytics.Controller();
      this.controller.initialize();
      this.searchBtn = document.querySelector('#search-btn');
      this.searchBtn.click();
      sinon.stub(this.controller, 'showChart');
      sinon.stub(this.controller, 'showMap');
    });

    after(function() {
      delete this.controller;
    });

    it('should setup global paceOptions', function() {
      expect(window.paceOptions).to.be.exist;
      expect(window.paceOptions).to.have.property('target', '.progress-wrapper');
      expect(window.paceOptions).to.have.property('restartOnRequestAfter', 10);
    });

    it('should set hash url when default search button click', function() {

    });

    it('should call showChart method when chart-tab clicked', function() {
      $('#chart-tab').click();

      expect(this.controller.showChart.called).to.be.true;
    });

    it('should call showMap method when map-tab clicked', function() {
      $('#map-tab').click();

      expect(this.controller.showMap.called).to.be.true;
    });
  });

  describe('getSelectedData', function() {
    before(function() {
      this.controller = new Analytics.Controller();
    });

    after(function() {
      delete this.controller;
    });

    it('should be return data', function() {
      var data = this.controller.getSelectedData();

      expect(data).to.be.exist;
    });
  });

  describe('showGrid', function() {
    before(function() {
      this.controller = new Analytics.Controller();
    });

    after(function() {
      delete this.controller;
    });

    beforeEach(function() {
      sinon.spy(Analytics.GridView.prototype, 'setView');
    });

    afterEach(function () {
      Analytics.GridView.prototype.setView.restore();
    });

    it('should initialize GridView and GridModel first time', function() {
      expect(this.controller.gridview).to.be.undefined;
      expect(this.controller.gridmodel).to.be.undefined;

      this.controller.showGrid();

      expect(this.controller.gridview).to.be.ok;
      expect(this.controller.gridmodel).to.be.ok;
      expect(this.controller.gridview.setView.called).to.be.true;
    });

    it('should directly refresh after first time call', function() {
      this.controller.showGrid();
      this.controller.showGrid();

      expect(this.controller.gridview).to.not.be.undefined;
      expect(this.controller.gridmodel).to.not.be.undefined;
      expect(this.controller.gridview.setView.called).to.be.true;
    });
  });

  describe('showChart', function() {
    before(function() {
      this.controller = new Analytics.Controller();
      sinon.spy(jQuery, 'ajax');
    });

    after(function() {
      delete this.controller;
      jQuery.ajax.restore();
    });

    beforeEach(function() {
      sinon.spy(Analytics.ChartView.prototype, 'setView');
      sinon.spy(Analytics, 'ChartView');
      sinon.spy(Analytics, 'ChartModel');
    });

    afterEach(function () {
      Analytics.ChartView.prototype.setView.restore();
      Analytics.ChartView.restore();
      Analytics.ChartModel.restore();
    });

    it('should make a XMLHttpRequest for loading hightchart library first time', function() {
      this.controller.showChart();
      expect(jQuery.ajax.calledWithMatch({
        url: "http://cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.2/highcharts.js"
      })).to.be.true;
    });

    it('should initialize ChartView and ChartModel first time', function() {
      // Not complete yet
    });

    it('should directly refresh after first time call', function() {
      // Not complete yet
    });
  });

  describe('showMap', function() {
    before(function() {
      this.controller = new Analytics.Controller();
      sinon.spy(jQuery, 'ajax');
    });

    after(function() {
      delete this.controller;
      jQuery.ajax.restore();
    });

    beforeEach(function() {
      this.controller.showMap();
    });

    it('should make a XMLHttpRequest for loading google map library first time', function() {
      expect(jQuery.ajax.calledWithMatch({
        url: "http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initGoogleMap"
      })).to.be.true;
    });

    it('should make a XMLHttpRequest for loading gmap3 library first time', function() {
      expect(jQuery.ajax.calledWithMatch({
        url: "http://cdn.jsdelivr.net/gmap3/5.1.1/gmap3.min.js"
      })).to.be.true;
    });
  });
});
