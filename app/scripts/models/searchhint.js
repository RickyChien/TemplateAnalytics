define([
    'underscore',
    'backbone',
    'models/record'
], function (_, Backbone, Record) {
    'use strict';

    var SearchHint = Record.extend({

        initialize: function () {
            Record.prototype.initialize.call(this);

            this.setLogsUrl('scripts/api/searchhints/' + this.id + '.json');

            this.set({
                rate: (this.get('read_count') / (this.get('read_count') + this.get('unread_count')) * 100).toFixed(2) + ' %'
            });
        }

    });

    return SearchHint;
});
