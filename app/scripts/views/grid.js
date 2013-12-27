define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GridItemView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            'click input': 'toggleSelected'
        },

        render: function () {
            $('<input>', { type: 'checkbox' }).wrap('<td>').parent().appendTo(this.el);
            $('<td>').text(this.model.get('id')).appendTo(this.el);
            $('<td>').text(this.model.get('content')).appendTo(this.el);
            $('<td>').text(this.model.get('read_count')).appendTo(this.el);
            $('<td>').text(this.model.get('unread_count')).appendTo(this.el);
            $('<td>').text(this.model.get('rate') + " %").appendTo(this.el);
            $('<td>').text(this.model.get('created_at')).appendTo(this.el);

            return this;
        },

        toggleSelected: function () {
            this.model.toggle();
        }

    });

    var GridView = Backbone.View.extend({

        el: '#view',

        initialize: function () {
            this.listenTo(this.collection, 'add', this.addRow);

            this.collection.fetch();
        },

        render: function () {
            return this;
        },

        addRow: function (model) {
            var view = new GridItemView({ model: model });
            this.$('#grid-data tbody').append(view.render().el);
        }

    });

    return GridView;
});
