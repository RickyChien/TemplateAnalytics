define([
    'underscore',
    'backbone',
    'views/app',
    'collections/notifications',
    'collections/vipcards',
    'collections/banners',
    'collections/topsites',
    'collections/searchhints'
], function (_, Backbone, AppView, Notifications, VipCards, Banners, TopSites, SearchHints) {
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
            this.AppView = new AppView();
            this.showNotifications();
        },

        showNotifications: function () {
            this.notifications = this.notifications || new Notifications();
            this.AppView.records = this.notifications;
            this.AppView.renderGrid();
        },

        showVIPCards: function () {
            this.vipcards = this.vipcards || new VipCards();
            this.AppView.records = this.vipcards;
            this.AppView.renderGrid();
        },

        showBanners: function () {
            this.banners = this.banners || new Banners();
            this.AppView.records = this.banners;
            this.AppView.renderGrid();
        },

        showTopSites: function () {
            this.topsites = this.topsites || new TopSites();
            this.AppView.records = this.topsites;
            this.AppView.renderGrid();
        },

        showSearchHint: function () {
            this.searchhints = this.searchhints || new SearchHints();
            this.AppView.records = this.searchhints;
            this.AppView.renderGrid();
        }

    });

    return Router;
});
