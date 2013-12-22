define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var Grid = Backbone.Model.extend({

        defaults: {
            selected: false
        },

        toggle: function () {
            this.save({
                selected: !this.get('selected')
            });
        },

        url: function () {
            return 'scripts/push_notification.json';
        }

    });

    return Grid;
});
