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
        },

        setLogsUrl: function (url) {
            this.logs.url = url;
        },

        toggle: function () {
            console.log(this)
            this.set({
                selected: !this.get('selected')
            });

            if (this.get('selected') === true && this.logs.models.length === 0) {
                this.logs.fetch();
            }
        }

    });

    return Record;
});
