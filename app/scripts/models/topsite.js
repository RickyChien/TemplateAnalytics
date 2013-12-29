define([
    'underscore',
    'backbone',
    'models/record'
], function (_, Backbone, Record) {
    'use strict';

    var TopSite = Record.extend({

        initialize: function () {
            Record.prototype.initialize.call(this);

            this.setLogsUrl('scripts/api/topsites/' + this.id + '.json');
        }

    });

    return TopSite;
});
