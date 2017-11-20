const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const del = require('del');
const notifier = require("node-notifier");
const browserSync = require('browser-sync');
const reload = browserSync.reload;

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
        imageSrc: ['src/image/**/*.*', '!src/image/sprites/toSprite/*.*', '!src/image/sprites/toSpriteSVG/*.*'],
        imageDist: 'dist/image/'
    },
    js: {
        // jsSrc: ['node_modules/svg4everybody/dist/svg4everybody.js', 'node_modules/jquery/dist/jquery.js', 'src/js/first.js', 'src/js/part/**/*.js'],
        // if node_modules in your dir
        jsSrc: ['src/js/first.js', 'src/js/part/**/*.js'],
        jsDist: 'dist/js/'
    },
    fonts: {
        fontsSrc: 'src/fonts/**/*.*',
        fontsDist: 'dist/fonts/'
    },
    watch: {
        style: 'src/style/**/*.scss',
        pug: 'src/**/*.pug',
        js: 'src/**/*.js',
        fonts: 'src/fonts/**/*.*',
        image: {
            image: ['src/image/**/*.*', '!src/image/sprites/toSprite/*.*', '!src/image/sprites/toSpriteSVG/*.*'],
            sprite: 'src/image/sprites/toSprite/*.+(jpg|jpeg|png)',
            spriteSVG: 'src/image/sprites/toSpriteSVG/*.svg'
        }
    },
    dist: 'dist'

};

gulp.task('serve', () => {
    browserSync.init({
        server: path.dist
    });
});

gulp.task('css', () => {
    return gulp.src(path.css.cssSrc)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'Scss',
                    message: err.message
                };
            })
        }))
        .pipe($.sourcemaps.init())
        .pipe($.debug({title: 'start-scss:'}))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe($.csscomb())
        .pipe($.cssbeautify())
        .pipe($.size({
            title: 'before compress'
        }))
        .pipe($.if(isProduction, $.csso()))
        .pipe($.if(isProduction, $.cleanCss({compatibility: 'ie10'})))
        .pipe($.size({
            title: 'after compress'
        }))
        .pipe($.debug({title: 'end-scss:'}))
        .pipe(gulp.dest(path.css.cssDist))
        .pipe(reload({stream: true}));
});

gulp.task('pug', () => {
    return gulp.src(path.pug.pugSrc)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'Pug',
                    message: err.message
                };
            })
        }))
        .pipe($.pug({
            pretty: !isProduction
        }))
        .pipe(gulp.dest(path.pug.pugDist))
        .on('end', reload);
});

gulp.task('js', () => {
    return gulp.src(path.js.jsSrc)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'JS',
                    message: err.message
                };
            })
        }))
        .pipe($.concat('main.js'))
        .pipe($.if(isProduction, $.uglifyjs()))
        .pipe(gulp.dest(path.js.jsDist))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', () => {
    return gulp.src(path.fonts.fontsSrc)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'Fonts',
                    message: err.message
                };
            })
        }))
        .pipe($.changed(path.fonts.fontsDist))
        .pipe($.debug({title: 'start-fonts:'}))
        .pipe($.size({
            title: 'fonts size'
        }))
        .pipe(gulp.dest(path.fonts.fontsDist))
        .pipe(reload({stream: true}));
});

gulp.task('image', () => {
    return gulp.src(path.image.imageSrc)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => {
                return {
                    title: 'Image',
                    message: err.message
                };
            })
        }))
        .pipe($.changed(path.image.imageDist))
        .pipe($.debug({title: 'image:'}))
        .pipe($.if(isProduction, $.size({
            title: 'before tinify'
        })))
        .pipe($.if(isProduction, $.tinify(tinifyKey)))
        .pipe($.size({
            title: 'images size'
        }))
        .pipe(gulp.dest(path.image.imageDist))
        .pipe(reload({stream: true}));
});

gulp.task('cleansprite', () => {
    return del('src/image/sprites/sprite');
});

gulp.task('spritemade', () => {
    const spriteData =
        gulp.src('src/image/sprites/toSprite/*.*')
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                imgPath: '../image/sprites/sprite/sprite.png',
                cssName: 'sprite.scss',
                padding: 15,
                cssFormat: 'scss',
                algorithm: 'binary-tree'
            }));

    spriteData.img.pipe(gulp.dest('src/image/sprites/sprite/'));
    spriteData.css.pipe(gulp.dest('src/style/part'));

    return spriteData;
});

gulp.task('sprite', gulp.series('cleansprite', 'spritemade'));

gulp.task('svgmin', () => {
    return gulp.src('src/image/sprites/toSpriteSVG/*.svg')
        .pipe($.svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe($.cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
                $('[xmlns]').removeAttr('xmlns');
            },
            parserOptions: { xmlMode: false }
        }))
        .pipe($.replace('&gt;', '>'))
        .pipe($.svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('src/image/sprites/spriteSVG/'));
});

gulp.task('cleanspriteSVG', () => {
    return del('src/image/sprites/spriteSVG');
});

gulp.task('spriteSVG', gulp.series('cleanspriteSVG', 'svgmin'));

gulp.task('clean', () => {
    return del(path.dist).then(() => {
        notifier.notify({
            title: 'Directory dist',
            message: 'Clean Done!'
        });
    }).catch( () => {
        notifier.notify({
            title: 'Directory dist',
            message: 'Clean Failed!'
        });
    });
});

gulp.task('watch', () => {
    gulp.watch(path.watch.style, gulp.series('css'));
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.js, gulp.series('js'));
    gulp.watch(path.watch.fonts, gulp.series('fonts'));
    gulp.watch(path.watch.image.sprite, gulp.series('sprite'));
    gulp.watch(path.watch.image.spriteSVG, gulp.series('spriteSVG'));
    gulp.watch(path.watch.image.image, gulp.series('image'));
});

gulp.task('dev', gulp.series(
    'clean',
    gulp.parallel('pug', 'css', gulp.series('sprite', 'spriteSVG', 'image'), 'js', 'fonts')));

gulp.task('default', gulp.series('dev', gulp.parallel('watch', 'serve')));
