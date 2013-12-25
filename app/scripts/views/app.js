define([
    'underscore',
    'backbone',
    'views/grid'
], function (_, Backbone, GridView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function () {
            this.$gridTab = this.$('#grid-tab');
            this.$gridTab.parent().addClass('active');
            new GridView();
        }

    });

    return AppView;
});
