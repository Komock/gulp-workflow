'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function(options) {

    return function () {
        $.watch([options.pug], function (event, cb) {
            gulp.start('pug:dev');
        });
        $.watch([options.style], function (event, cb) {
            gulp.start('style:dev');
        });
        $.watch([options.js], function (event, cb) {
            gulp.start('js:dev');
        });
        $.watch([options.img], function (event, cb) {
            gulp.start('image:dev');
        });
        $.watch([options.fonts], function (event, cb) {
            gulp.start('fonts:dev');
        });
    }
};