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
      sinon.spy(Analytics, 'GridView');
      sinon.spy(Analytics, 'GridModel');
    });

    afterEach(function () {
      Analytics.GridView.prototype.setView.restore();
      Analytics.GridView.restore();
      Analytics.GridModel.restore();
    });

    it('should initialize GridView and GridModel first time', function() {
      expect(this.controller.gridview).to.be.undefined;
      expect(this.controller.gridmodel).to.be.undefined;

      this.controller.showGrid();

      expect(this.controller.gridview.setView.called).to.be.true;
      expect(Analytics.GridView.called).to.be.true;
      expect(Analytics.GridModel.called).to.be.true;
      expect(this.controller.gridview).to.be.ok;
      expect(this.controller.gridmodel).to.be.ok;
    });

    it('should directly setView after first time call', function() {
      this.controller.showGrid();
      this.controller.showGrid();

      expect(this.controller.gridview.setView.called).to.be.true;
      expect(Analytics.GridView.called).to.be.false;
      expect(Analytics.GridModel.called).to.be.false;
    });
  });

  describe('showChart', function() {
    before(function() {
      this.controller = new Analytics.Controller();
      this.controller.initialize();
      sinon.spy(jQuery, "ajax");
    });

    after(function() {
      delete this.controller;
      jQuery.ajax.restore();
    });

    beforeEach(function() {
      this.controller.showChart();
    });

    it('should make a XMLHttpRequest for loading hightchart library', function() {
      expect(jQuery.ajax.calledWithMatch({
        url: "http://cdnjs.cloudflare.com/ajax/libs/highcharts/3.0.2/highcharts.js"
      })).to.be.true;
    });
  });

  describe('showMap', function() {
    before(function() {
      this.controller = new Analytics.Controller();
      this.controller.initialize();
      sinon.spy(jQuery, "ajax");
    });

    after(function() {
      delete this.controller;
      jQuery.ajax.restore();
    });

    beforeEach(function() {
      this.controller.showMap();
    });

    it('should make a XMLHttpRequest for loading google map library', function() {
      expect(jQuery.ajax.calledWithMatch({
        url: "http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initGoogleMap"
      })).to.be.true;
    });

    it('should make a XMLHttpRequest for loading gmap3 library', function() {
      expect(jQuery.ajax.calledWithMatch({
        url: "http://cdn.jsdelivr.net/gmap3/5.1.1/gmap3.min.js"
      })).to.be.true;
    });
  });
});
