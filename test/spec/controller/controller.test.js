'use strict';
(function () {
  describe('Controller', function () {
    var controller = new Analytics.Controller();

    describe('constructor', function () {
      it('should contain a data property', function () {
        expect(controller).to.include.keys('data');
      });
    });

    describe('initialize', function() {
      before(function() {
        controller.initialize();
      });

      it('should setup global paceOptions', function() {
        expect(window.paceOptions).to.be.exist;
        expect(window.paceOptions).to.have.property('target', '.progress-wrapper');
        expect(window.paceOptions).to.have.property('restartOnRequestAfter', 10);
      });

      it('should attach "hashchange" event to window', function() {
        
      });
    });
  });
})();
