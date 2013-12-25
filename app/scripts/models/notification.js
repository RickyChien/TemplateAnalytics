define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Notification = Backbone.Model.extend({

        defaults: {
            selected: false
        },

        initialize: function () {
            this.set({
                rate: (this.get('read_count') / (this.get('read_count') + this.get('unread_count')) * 100).toFixed(2)
            });
        },

        toggle: function () {
            this.set({
                selected: !this.get('selected')
            });
        }

    });

    return Notification;
});
