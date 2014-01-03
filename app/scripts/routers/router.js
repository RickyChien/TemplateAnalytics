define([
    'underscore',
    'backbone',
    'views/app',
    'models/notification',
    'models/vipcard',
    'models/banner',
    'collections/records'
], function (_, Backbone, AppView, Notification, Vipcard, Banner, Records) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            ':hash': 'action'
        },

        initialize: function () {
            this.AppView = new AppView({ collection: new Records() });
            this.action('notifications');
        },

        action: function (type) {
            var records = this[type],
                self = this;

            if (!records) {
                records = this[type] = new Records([], {

                    model: function (attrs, options) {
                        if (type === 'notifications') {
                            return new Notification(attrs, options);
                        } else if (type === 'vipcards') {
                            return new Vipcard(attrs, options);
                        } else if (type === 'banners') {
                            return new Banner(attrs, options);
                        }
                    },

                    url: 'scripts/api/' + type + '.json'

                });
                records.fetch().then(function () {
                    self.AppView.update(records.models);
                });
            } else {
                this.AppView.update(records.models);
            }

            this.selectMenuItem(type);
            this.AppView.render();
        },
        
        selectMenuItem: function (hrefName) {
            $('.list-group-item.active').removeClass('active');
            $('a[href="#' + hrefName + '"]').addClass('active');
        }

    });

    return Router;
});
