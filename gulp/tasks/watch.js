module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./src/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./src/fonts/**/*.*', $.gulp.series('fonts'));
        $.gulp.watch('./dev/style/**/*.scss', $.gulp.series('sass:src'));
        // $.gulp.watch('./dev/static/img/svg/*.svg', $.gulp.series('svg'));
        // $.gulp.watch('./dev/static/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        $.gulp.watch('./dist/image/**/*.{png,jpg,gif}', $.gulp.series('img:src'));
    });
};