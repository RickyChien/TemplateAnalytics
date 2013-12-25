define([
    'underscore',
    'backbone',
    'views/grid',
    'jquery_ui_slider',
    'jquery_ui_timepicker'
], function (_, Backbone, GridView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#view',

        initialize: function () {
            this.$start = this.$('#start-time');
            this.$end = this.$('#end-time');
            this.$start.datetimepicker();
            this.$end.datetimepicker();

            this.$gridTab = this.$('#grid-tab');
            this.$gridTab.parent().addClass('active');
            new GridView();
        }

    });

    return AppView;
});
