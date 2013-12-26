define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ChartView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);

            this.fetchLog();
        },

        render: function () {
            console.log(this.collection)
            return this;
        },

        fetchLog: function () {
            this.collection.each(function (model) {
                model.logs.fetch();
            });
        }

    });

    return ChartView;
});
