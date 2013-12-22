define([
    'jquery',
    'underscore',
    'backbone',
    'collections/grids'
], function ($, _, Backbone, Grids) {
    'use strict';

    var GridView = Backbone.View.extend({

        initialize: function () {
            this.$content = this.$('#grid');
            this.$tbody = this.$('#grid-data tbody');
        },

        render: function () {
            var tbody = $('<tbody>').addClass('table-content'),
                content = [],
                key,
                tr,
                checkbox,
                count = 0;

            for (key in options) {
                var item = options[key];

                tr = $('<tr>');
                checkbox = { type: 'checkbox' };
                $('<input>', checkbox).attr('id', count++).wrap('<td>').parent().appendTo(tr);
                $('<td>').text(key).attr('class','content').appendTo(tr);
                $('<td>').text(item.read).appendTo(tr);
                $('<td>').text(item.unread).appendTo(tr);
                $('<td>').text(item.rate + " %").appendTo(tr);
                content.push(tr);
            }

            tbody.append(content);
            $('#grid-data tbody').replaceWith(tbody);
        },

        el: '#view',

        template: '',

    });

    return GridView;
});
