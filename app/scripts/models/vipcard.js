define([
    'underscore',
    'backbone',
    'models/record'
], function (_, Backbone, Record) {
    'use strict';

    var Vipcard = Record.extend({

        initialize: function () {
            Record.prototype.initialize.call(this);

            this.setLogsUrl('scripts/api/vipcards/' + this.id + '.json');

            this.set('key', 'name');
            this.set('rate', (this.get('read_count') / ((this.get('read_count') +
                this.get('unread_count')) || 1) * 100).toFixed(2) + ' %');
        }

    });

    return Vipcard;
});
