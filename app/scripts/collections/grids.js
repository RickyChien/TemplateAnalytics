define([
    'underscore',
    'backbone'
], function (_, Backbone, Grid) {
    'use strict';

    var GridsCollection = Backbone.Model.extend({

        model: Grid,

        comparator: function (grid) {
            return grid.get('id');
        }

    });

    return new GridsCollection();
});
