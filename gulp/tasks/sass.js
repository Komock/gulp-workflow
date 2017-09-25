module.exports = function () {
    $.gulp.task('sass:src', () => {
        return $.gulp.src('./src/style/main.scss')
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({
                browsers: ['last 5 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.cleanCss({compatibility: 'ie10'}))
            .pipe($.gulp.dest('./dist/style/'))
    });
    $.gulp.task('sass:dist', () => {
        return $.gulp.src('./src/style/main.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass())
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Scss',
                    message: error.message
                };
            }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.autoprefixer({
                browsers: ['last 5 version']
            }))
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
