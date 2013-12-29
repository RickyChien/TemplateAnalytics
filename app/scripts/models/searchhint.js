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
        }

    });

    return SearchHint;
});
