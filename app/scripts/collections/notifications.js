define([
    'underscore',
    'backbone',
    'colors',
    'collections/records',
    'models/notification'
], function (_, Backbone, Colors, Records, Notification) {
    'use strict';

    var Notifications = Records.extend({

        model: Notification,

        url: 'scripts/api/notifications.json',

        initialize: function () {
            Records.prototype.initialize.call(this);
        }

    });

    return Notifications;
});
