define([
    'underscore',
    'backbone',
    'colors',
    'collections/records',
    'models/vipcard'
], function (_, Backbone, Colors, Records, VIPCard) {
    'use strict';

    var VIPCards = Records.extend({

        model: VIPCard,

        url: 'scripts/api/vipcards.json',

        initialize: function () {
            Records.prototype.initialize.call(this);
        }

    });

    return VIPCards;
});
