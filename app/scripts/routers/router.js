define([
    'underscore',
    'backbone',
    'views/app',
    'models/notification',
    'models/vipcard',
    'models/banner',
    'models/topsite',
    'models/searchhint',
    'collections/records'
], function (_, Backbone, AppView, Notification, VipCard, Banner, TopSite, SearchHint, Records) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            'notifications': 'showNotifications',
            'vipcards': 'showVIPCards',
            'banners': 'showBanners',
            'topsites': 'showTopSites',
            'searchhints': 'showSearchHint'
        },

        initialize: function () {
            this.AppView = new AppView({ collection: new Records() });
            this.showNotifications();
        },

        showNotifications: function () {
            var self = this;

            if (!this.notifications) {
                this.notifications = new Records([], {
                    model: Notification,
                    url: 'scripts/api/notifications.json'
                });
                this.notifications.fetch().then(function () {
                    self.AppView.update(self.notifications.models);
                });
            } else {
                this.AppView.update(this.notifications.models);
            }

            this.selectMenuItem('notifications');
            this.AppView.render();
        },

        showVIPCards: function () {
            var self = this;

            if (!this.vipcards) {
                this.vipcards = new Records([], {
                    model: VipCard,
                    url: 'scripts/api/vipcards.json'
                });
                this.vipcards.fetch().then(function () {
                    self.AppView.update(self.vipcards.models);
                });
            } else {
                this.AppView.update(this.vipcards.models);
            }

            this.selectMenuItem('vipcards');
            this.AppView.render();
        },

        showBanners: function () {
            var self = this;
            
            if (!this.banners) {
                this.banners = new Records([], {
                    model: Banner,
                    url: 'scripts/api/banners.json'
                });
                this.banners.fetch().then(function () {
                    self.AppView.update(self.banners.models);
                });
            } else {
                this.AppView.update(this.banners.models);
            }

            this.selectMenuItem('banners');
            this.AppView.render();
        },

        showTopSites: function () {
            var self = this;
            
            if (!this.topsites) {
                this.topsites = new Records([], {
                    model: TopSite,
                    url: 'scripts/api/topsites.json'
                });
                this.topsites.fetch().then(function () {
                    self.AppView.update(self.topsites.models);
                });
            } else {
                this.AppView.update(this.topsites.models);
            }

            this.selectMenuItem('topsites');
            this.AppView.render();
        },

        showSearchHint: function () {
            var self = this;
            
            if (!this.searchhints) {
                this.searchhints = new Records([], {
                    model: SearchHint,
                    url: 'scripts/api/searchhints.json'
                });
                this.searchhints.fetch().then(function () {
                    self.AppView.update(self.searchhints.models);
                });
            } else {
                this.AppView.update(this.searchhints.models);
            }

            this.selectMenuItem('searchhints');
            this.AppView.render();
        },

        selectMenuItem: function (hrefName) {
            $('.list-group-item.active').removeClass('active');
            $('a[href="#' + hrefName + '"]').addClass('active');
        }

    });

    return Router;
});
