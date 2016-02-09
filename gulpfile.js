//  Plugins
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    cssnano      = require('gulp-cssnano'),
    htmlmin      = require('gulp-htmlmin'),
    //  inlineSource = require('gulp-inline-source'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    sassdoc      = require('sassdoc'),
    reload       = browserSync.reload;

//  HTML
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});

//  Fonts
gulp.task('fonts', function() {
    gulp.src('./app/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts/'))
        .pipe(reload({
            stream: true
        }));
});

//  SASS
gulp.task('sass', function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sassdoc())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:  ['last 2 versions'],
            cascade:   false
        }))
        //  .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }));
});

//  Serve
gulp.task('serve', ['sass','html','fonts'], function() {
    browserSync.init({
        server: "./dist",
        notify: false
    });
});

//  Watch
gulp.task('watch', ['serve'], function() {
    gulp.watch('./app/*.html', ['html']);
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/fonts/**/*.*', ['fonts']);
});

//  Default
gulp.task('default', ['watch']);
