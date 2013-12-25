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
        bootstrapTab: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jqueryUI: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jquery_ui_slider: {
            deps: ['jquery', 'jqueryUI'],
            exports: 'jquery'
        },
        jquery_ui_timepicker: {
            deps: ['jquery', 'jqueryUI', 'jquery_ui_slider'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jqueryUI: '../bower_components/jquery-ui/ui/jquery-ui',
        jquery_ui_slider: '../bower_components/jqueryui-timepicker-addon/src/jquery-ui-sliderAccess',
        jquery_ui_timepicker: '../bower_components/jqueryui-timepicker-addon/src/jquery-ui-timepicker-addon',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        text: '../bower_components/requirejs-text/text'
    }
});

require([
    'backbone',
    'bootstrapTab',
    'views/app'
], function (Backbone, BootstrapTab, AppView) {
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});
