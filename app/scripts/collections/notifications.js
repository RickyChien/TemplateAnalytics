define([
    'underscore',
    'backbone',
    'models/notification'
], function (_, Backbone, Notification) {
    'use strict';

    var Notifications = Backbone.Collection.extend({

        model: Notification,

        url: 'scripts/api/notifications.json',

        comparator: function (notification) {
            return notification.get('id');
        }

    });

    return Notifications;
});
