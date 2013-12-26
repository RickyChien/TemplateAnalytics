define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MapView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.listenTo(this.$collection, 'sync', this.render);

            this.collection.fetch();
        },

        render: function () {
            return this;
        }

    });

    return MapView;
});
