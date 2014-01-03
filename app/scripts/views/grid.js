define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var skipsAttrs = ['selected', 'key', 'logs'];

    var GridItemView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            'click input': 'toggle'
        },

        template: _.template('\
            <td><input type="checkbox" <%= selected === true ? \'checked\' : \'\' %>></td>\
            <% _.each(attrs, function (attr) { %>\
                <td><%= attr %></td>\
            <% }); %>\
        '),

        render: function () {
            this.$el.html(this.template(this.parse(this.model.attributes, skipsAttrs)));

            return this;
        },

        toggle: function () {
            this.model.toggle();
        },

        parse: function (attrs, skips) {
            var data = [],
                index;
            for (var attr in attrs) {
                if (!_.contains(skips, attr)) {
                    if (attr !== 'created_at') {
                        data.push(attrs[attr]);
                    }
                }
            }

            data.push(attrs.created_at);

            return {
                selected: attrs.selected,
                attrs: data
            };
        }

    });

    var GridView = Backbone.View.extend({

        el: '#grid-data',

        template: _.template('\
            <tr>\
            <% attrs.forEach(function (attr) { %>\
                <th><%= attr %></th>\
            <% }); %>\
            </tr>\
        '),

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            this.$('thead').html(this.template({
                attrs: this.parse(this.collection.models[0].attributes, skipsAttrs)
            }));
            this.$('tbody tr').remove();
            this.collection.each(function (model) {
                var view = new GridItemView({ model: model });
                this.$('tbody').append(view.render().el);
            }, this);

            return this;
        },

        parse: function (attrs, skips) {
            var data = ['Select'],
                index;

            for (var attr in attrs) {
                if (!_.contains(skips, attr)) {
                    attr = attr[0].toUpperCase() + attr.slice(1);
                    index = attr.indexOf('_');
                    attr = attr.substring(0, (index === -1) ? attr.length : index);
                    if (attr !== 'Created') {
                        data.push(attr);
                    }
                }
            }

            data.push('Create Time');

            return data;
        }

    });

    return GridView;
});
