'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');

module.exports = function(options) {

    return function () {
        gulp.watch( options.pug , gulp.series('pug:dev'));
        gulp.watch( options.js , gulp.series('js:dev'));
        gulp.watch( options.style , gulp.series('style:dev'));
        gulp.watch( options.img , gulp.series('image:dev'));
        gulp.watch( options.fonts , gulp.series('fonts:dev'));
    }
};
