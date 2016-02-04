//  Plugins
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    cssnano      = require('gulp-cssnano'),
    htmlmin      = require('gulp-htmlmin'),
    inlineSource = require('gulp-inline-source'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    sequence     = require('gulp-sequence'),
    sassdoc      = require('sassdoc'),
    reload       = browserSync.reload;

//  HTML
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./min'))
});

//  InlineSource
gulp.task('inline', function() {
    gulp.src('./min/*.html')
        .pipe(inlineSource())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
});

//  Fonts
gulp.task('fonts', function() {
    gulp.src('./app/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts/'))
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
        .pipe(cssnano())
        .pipe(gulp.dest('./min/css'))
});

//  Serve
gulp.task('serve', ['sequence'], function() {
    browserSync.init({
        server: "./dist",
        notify: false
    });
});

//  Order
gulp.task('sequence', function(cb) {
    sequence('sass','html','inline')(cb)
});

//  Watch
gulp.task('watch', ['serve'], function() {
    gulp.watch('./app/*.html', ['sequence']);
    gulp.watch('./app/sass/**/*.scss', ['sequence']);
    gulp.watch('./app/fonts/**/*.*', ['fonts']);
});

//  Default
gulp.task('default', ['watch']);
