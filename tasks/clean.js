'use strict';

const rimraf = require('rimraf');

module.exports = function(options) {
    return function (cb) {
        rimraf(options.dist, cb);
    };
};
