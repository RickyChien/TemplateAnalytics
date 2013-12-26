define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Log = Backbone.Model.extend({

    });

    var Logs = Backbone.Collection.extend({

        model: Log

    });

    var Record = Backbone.Model.extend({

        defaults: {
            selected: false
        },

        initialize: function () {
            this.logs = new Logs();
            this.logs.url = 'scripts/api/' + this.get('type') + '/' + this.id + '.json';

            this.update();
        },

        toggle: function () {
            this.set({
                selected: !this.get('selected')
            });
        },

        update: function () {
            this.set({
                rate: (this.get('read_count') / (this.get('read_count') + this.get('unread_count')) * 100).toFixed(2)
            });
        }

    });

    return Record;
});
