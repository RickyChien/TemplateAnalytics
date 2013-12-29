define([
    'underscore',
    'backbone',
    'collections/records'
], function (_, Backbone, Notifications) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            ':xxx': 'showNotifications'
        },

        showNotifications: function () {
            console.log('notifications');
        }

    });

    return Router;
});
