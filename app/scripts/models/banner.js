define([
    'underscore',
    'backbone',
    'models/record'
], function (_, Backbone, Record) {
    'use strict';

    var Banner = Record.extend({

        initialize: function () {
            Record.prototype.initialize.call(this);

            this.setLogsUrl('scripts/api/banners/' + this.id + '.json');

            this.set('key', 'name');
            this.set('rate', (this.get('click_count') / ((this.get('click_count') +
                this.get('view_count')) || 1) * 100).toFixed(2) + ' %');
        }

    });

    return Banner;
});
