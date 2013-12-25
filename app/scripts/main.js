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
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
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
