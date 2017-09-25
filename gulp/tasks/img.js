module.exports = function() {
    $.gulp.task('img:src', () => {
        return $.gulp.src('./src/image/**/*.{png,jpg,gif}')
            .pipe($.cached('image:dev'))
            .pipe($.gulp.dest('./dist/image/'));
    });

    $.gulp.task('img:dist', () => {
        return $.gulp.src('./src/image/**/*.{png,jpg,gif}')
            .pipe($.imagemin())
            .pipe($.gulp.dest('./dist/image/'));
    });


    // $.gulp.task('svg:copy', () => {
    //     return $.gulp.src('./dev/static/img/general/*.svg')
    //         .pipe($.gulp.dest('./build/static/img/general/'));
    // });
};
