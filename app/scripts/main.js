/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
        },
        bootstrap_affix: {
            deps: ['jquery']
        },
        bootstrap_tab: {
            deps: ['jquery']
        },
        jquery_ui: {
            deps: ['jquery'],
        },
        jquery_ui_slider: {
            deps: ['jquery', 'jquery_ui']
        },
        jquery_ui_timepicker: {
            deps: ['jquery', 'jquery_ui', 'jquery_ui_slider']
        },
        gmap3: {
            deps: ['jquery', 'async!http://maps.google.com/maps/api/js?v=3&sensor=false']
        },
        colors:{
            exports: 'Colors'
        }
    },
    paths: {
        async: '../bower_components/requirejs-plugins/src/async',
        jquery: '../bower_components/jquery/jquery',
        jquery_ui: '../bower_components/jquery-ui/ui/jquery-ui',
        jquery_ui_slider: '../bower_components/jqueryui-timepicker-addon/src/jquery-ui-sliderAccess',
        jquery_ui_timepicker: '../bower_components/jqueryui-timepicker-addon/src/jquery-ui-timepicker-addon',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        bootstrap_tab: '../bower_components/sass-bootstrap/js/tab',
        highcharts: '//code.highcharts.com/highcharts',
        gmap3: '//cdn.jsdelivr.net/gmap3/5.1.1/gmap3.min',
        colors: 'addons/colors',
        pace: '../bower_components/pace/pace'
    }
});

require([
    'backbone',
    'bootstrap_tab',
    'async',
    'routers/router'
], function (Backbone, BootstrapTab, Async, Router) {
    Backbone.history.start();
    
    // Initialize the router
    new Router();
});

require(['pace'], function (Pace) {
    Pace.start({
        target: '.progress-wrapper'
    });
});
