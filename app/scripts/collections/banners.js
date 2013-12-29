define([
    'underscore',
    'backbone',
    'colors',
    'collections/records',
    'models/banner'
], function (_, Backbone, Colors, Records, Banner) {
    'use strict';

    var Banners = Records.extend({

        model: Banner,

        url: 'scripts/api/banners.json',

        initialize: function () {
            Records.prototype.initialize.call(this);
        }

    });

    return Banners;
});
