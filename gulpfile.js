const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const cssbeautify = require('gulp-cssbeautify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const del = require('del');
const notifier = require("node-notifier");
const size = require('gulp-size');
const pug = require('gulp-pug');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const spritesmith = require('gulp.spritesmith');
const reload = browserSync.reload;
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgSprite = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');
const tinify = require('gulp-tinify');
const imagemin = require('gulp-imagemin');


const isProduction = false;
const tinifyKey = "YOUR_API_KEY";

const path = {
    css: {
        cssSrc: 'src/style/main.scss',
        cssDist: 'dist/style/'
    },
    pug: {
        pugSrc: ['src/**/*.pug', '!src/templates/**/*.pug'],
        pugDist: 'dist/'
    },
    image: {
        imageDev: ['src/image/**/*.*', '!src/image/toSprite/*.*', '!src/image/toSpriteSVG/*.*'],
        imageDist: 'dist/image/'
    },
    fonts: {
        fontsDev: 'src/fonts/**/*.*',
        fontsDist: 'dist/fonts/'
    },
    watch: {
        style: 'src/style/**/*.scss',
        pug: 'src/**/*.pug',
        fonts: 'src/fonts/**/*.*',
        image: 'src/image/**/*.*'
    },
    dist: 'dist'

};

gulp.task('serve', function() {
    browserSync.init({
        server: path.dist
    });
});

gulp.task('css', () => {
    return gulp.src(path.css.cssSrc)
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Scss',
                    message: err.message
                };
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(debug({title: 'start-scss:'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(csscomb())
        .pipe(cssbeautify())
        .pipe(size({
            title: 'before compress'
        }))
        .pipe(gulpIf(isProduction, cleanCSS({compatibility: 'ie10'})))
        .pipe(size({
            title: 'after compress'
        }))
        .pipe(debug({title: 'end-scss:'}))
        .pipe(gulp.dest(path.css.cssDist))
        .pipe(reload({stream: true}));
});

gulp.task('pug', () => {
    return gulp.src(path.pug.pugSrc)
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Pug',
                    message: err.message
                };
            })
        }))
        .pipe(pug({
            pretty: !isProduction
        }))
        .pipe(gulp.dest(path.pug.pugDist))
        .on('end', reload);

});

gulp.task('fonts', () => {
    return gulp.src(path.fonts.fontsDev)
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Fonts',
                    message: err.message
                };
            })
        }))
        .pipe(changed(path.fonts.fontsDist))
        .pipe(debug({title: 'start-fonts:'}))
        .pipe(size({
            title: 'fonts size'
        }))
        .pipe(gulp.dest(path.fonts.fontsDist))
        .pipe(reload({stream: true}));
});

gulp.task('image', () => {
    return gulp.src(path.image.imageDev)
        .pipe(plumber({
            errorHandler: notify.onError((err) => {
                return {
                    title: 'Image',
                    message: err.message
                };
            })
        }))
        .pipe(changed(path.image.imageDist))
        .pipe(debug({title: 'image:'}))
        .pipe(gulpIf(isProduction, size({
            title: 'before tinify'
        })))
        .pipe(gulpIf(isProduction, tinify(tinifyKey)))
        .pipe(size({
            title: 'images size'
        }))
        .pipe(gulp.dest(path.image.imageDist))
        .pipe(reload({stream: true}));
});


gulp.task('cleansprite', () => {
    return del('src/image/sprites/sprite');
});


gulp.task('spritemade', function() {
    const spriteData =
        gulp.src('src/image/sprites/toSprite/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                padding: 15,
                cssFormat: 'scss',
                algorithm: 'binary-tree'
            }));

    spriteData.img.pipe(gulp.dest('src/image/sprites/sprite'));
    spriteData.css.pipe(gulp.dest('src/style/part'));

    return spriteData;
});

gulp.task('sprite', gulp.series('cleansprite', 'spritemade'));

gulp.task('svgmin', function () {
    return gulp.src('src/image/sprites/toSpriteSVG/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: false }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('src/image/sprites/spriteSVG/'));
});


gulp.task('clean', () => {
    return del(path.dist).then(() => {
        notifier.notify({
            title: 'Directory dist',
            message: 'Clean Done!'
        });
    }).catch(function () {
        notifier.notify({
            title: 'Directory dist',
            message: 'Clean Failed!'
        });
    });
});


gulp.task('watch', () => {
    gulp.watch(path.watch.style, gulp.series('css'));
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.fonts, gulp.series('fonts'));
    gulp.watch(path.watch.image, gulp.series('image'));
    gulp.watch('src/image/toSprite/*.*', gulp.series('spritemade'));
});

gulp.task('dev', gulp.series(
    'clean',
    gulp.parallel('pug', 'css', 'fonts',  gulp.series('sprite', 'image'))));

gulp.task('default', gulp.series('dev', gulp.parallel('watch', 'serve')));
