'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = function(options) {

    return function () {
        return gulp.src(options.src)
        .pipe($.cached('image:dev'))
        .pipe($.imagemin())
        .pipe(gulp.dest(options.dist))
        .pipe(reload({stream: true}));
    };
};