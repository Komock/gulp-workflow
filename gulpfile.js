'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const browserSync = require('browser-sync');

var config = {
    server: { baseDir: "dist" },
    notify: false
};

gulp.task('webserver', function () {
    browserSync.init(config);
});

function requireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        var task = require(path).call(this, options);
        return task(callback);
    });
}

requireTask('pug:dev', './tasks/pugDev.js', {
    src: ['src/**/*.pug', '!src/templates/**/*.pug', '!src/layout/**/*.pug'],
    dist: 'dist/'
});

requireTask('style:dev', './tasks/styleDev.js', {
    src: 'src/**/main.scss',
    dist: 'dist/'
});

// requireTask('style:dist', './tasks/styleDist.js', {
//     src: 'src/**/*.scss',
//     dist: 'dist/'
// });

requireTask('js:dev', './tasks/jsDev.js', {
    src: 'src/**/main.js',
    dist: 'dist/'
});

// requireTask('js:dist', './tasks/jsDist.js', {
//     src: 'src/**/*.js',
//     dist: 'dist/'
// });

requireTask('image:dev', './tasks/img.js', {
    src: 'src/img/**/*.*',
    dist: 'dist/img/'
});

requireTask('fonts:dev', './tasks/fonts.js', {
    src: 'src/fonts/**/*.*',
    dist: 'dist/fonts/'
});

requireTask('clean', './tasks/clean.js', {
    dist: './dist/'
});

requireTask('watch', './tasks/watch.js', {
    pug: 'src/**/*.pug',
    js: 'src/**/*.js',
    style: 'src/**/*.scss',
    img: 'src/**/*.*',
    fonts: 'src/**/*.*'
});

gulp.task('development', gulp.parallel('pug:dev', 'js:dev', 'style:dev', 'fonts:dev', 'image:dev'));

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('development', 'watch', 'webserver')));
