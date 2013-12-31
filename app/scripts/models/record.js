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
            this.set('logs', new Logs());
        },

        setLogsUrl: function (url) {
            this.get('logs').url = url;
        },

        toggle: function () {
            this.set({ selected: !this.get('selected') });

            if (this.get('selected') === true && this.get('logs').models.length === 0) {
                this.get('logs').fetch();
            }
        }

    });

    return Record;
});
