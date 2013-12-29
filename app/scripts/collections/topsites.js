define([
    'underscore',
    'backbone',
    'colors',
    'collections/records',
    'models/topsite'
], function (_, Backbone, Colors, Records, TopSite) {
    'use strict';

    var TopSites = Records.extend({

        model: TopSite,

        url: 'scripts/api/topsites.json',

        initialize: function () {
            Records.prototype.initialize.call(this);
        }

    });

    return TopSites;
});
