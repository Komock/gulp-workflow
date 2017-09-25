global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});


$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel('sass:src', 'pug', 'img:src', 'fonts' )));

$.gulp.task('dist', $.gulp.series(
    'clean',
    $.gulp.parallel('sass:dist', 'pug', 'img:dist', 'fonts' )));


$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
