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
            exports: 'jquery'
        },
        bootstrap_tab: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jquery_ui: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jquery_ui_slider: {
            deps: ['jquery', 'jquery_ui'],
            exports: 'jquery'
        },
        jquery_ui_timepicker: {
            deps: ['jquery', 'jquery_ui', 'jquery_ui_slider'],
            exports: 'jquery'
        },
        gmap3: {
            deps: ['jquery', 'async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
            exports: 'jquery'
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
        text: '../bower_components/requirejs-text/text',
        highcharts: '../bower_components/highcharts/highcharts',
        gmap3: '../bower_components/gmap3/gmap3'
    }
});

require([
    'backbone',
    'bootstrap_tab',
    'views/app'
], function (Backbone, BootstrapTab, AppView) {
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});
