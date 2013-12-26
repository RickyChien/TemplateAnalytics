define([
    'underscore',
    'backbone',
    'collections/notifications'
], function (_, Backbone, Notifications) {
    'use strict';

    var MapView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.$collection = new Notifications();

            this.listenTo(this.$collection, 'sync', this.render);

            this.$collection.fetch();
        },

        render: function () {
            return this;
        }

    });

    return MapView;
});
