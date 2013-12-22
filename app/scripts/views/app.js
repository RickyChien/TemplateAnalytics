define([
    'underscore',
    'backbone',
    'collections/grids',
    'views/grid'
], function (_, Backbone, Grids, GridView) {
    'use strict';

    var AppView = Backbone.View.extend({

        initialize: function () {
            this.$search = this.$('#search-btn');
            this.listenTo(Grids, 'search', this.showResult);
        },

        render: function () {

        },

        showResult: function (grid) {
            var view = new GridView({ model: grid });
        }

    });

    return AppView;
});
