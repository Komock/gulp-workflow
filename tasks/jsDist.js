'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

module.exports = function(options) {
    
    return function () {
    gulp.src(options.src)
        .pipe($.rigger())
        .pipe($.uglify())
        .pipe(gulp.dest(options.dist))
        .pipe(reload({stream: true}));
    };
};