define([
    'underscore',
    'backbone',
    'colors',
    'collections/records',
    'models/searchhint'
], function (_, Backbone, Colors, Records, SearchHint) {
    'use strict';

    var SearchHints = Records.extend({

        model: SearchHint,

        url: 'scripts/api/searchhints.json',

        initialize: function () {
            Records.prototype.initialize.call(this);
        }

    });

    return SearchHints;
});
