var project             = 'hotdrinks'; // Name

var styleSRC            = './assets/sass/style.scss'; // Path to main .scss file
var styleDestination    = './'; // Path to place the compiled CSS file
// Defualt set to root folder


var jsVendorSRC         = './assets/js/vendors/*.js'; // Path to JS vendors folder
var jsVendorDestination = './assets/js/'; // Path to place the compiled JS vendors file
var jsVendorFile        = 'vendors'; // Compiled JS vendors file name
// Default set to vendors i.e. vendors.js


var jsCustomSRC         = './assets/js/custom/*.js'; // Path to JS custom scripts folder
var jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
var jsCustomFile        = 'custom'; // Compiled JS custom file name
// Default set to custom i.e. custom.js

var styleWatchFiles     = './assets/sass/*.scss'; // Path to all *.scss files inside css folder and inside them
var vendorJSWatchFiles  = './assets/js/vendors/*.js'; // Path to all vendors JS files
var customJSWatchFiles  = './assets/js/custom/*.js'; // Path to all custom JS files

var gulp         = require('gulp');

// CSS related plugins.
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-uglifycss');

// JS related plugins.
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

// Utility related plugins.
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync').create();


gulp.task('styles', gulp.series(function(done) {
    gulp.src(styleSRC)
    .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compact',
            outputStyle: 'compressed',
            // outputStyle: 'nested',
            // outputStyle: 'expanded',
            precision: 10
        }))
        .pipe(autoprefixer(
            'last 2 version',
            '> 1%',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'))
        .pipe(minifycss({
            maxLineLen: 10
        }))
        .pipe(gulp.dest(styleDestination))
        .pipe(notify({ message: 'TASK: "styles" Completed!', onLast: true }))
        .pipe(browserSync.stream());
        done();
}));

gulp.task('vendorsJs', gulp.series(function(done) {
    gulp.src(jsVendorSRC)
    .pipe(concat(jsVendorFile + '.js'))
    .pipe(gulp.dest(jsVendorDestination))
    .pipe(rename({
        basename: jsVendorFile,
        suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(jsVendorDestination))
    .pipe(notify({ message: 'TASK: "vendorsJs" Completed!', onLast: true }));
    done();
}));

gulp.task('customJS', gulp.series(function(done) {
    gulp.src(jsCustomSRC)
        .pipe(concat(jsCustomFile + '.js'))
        .pipe(gulp.dest(jsCustomDestination))
        .pipe(rename({
            basename: jsCustomFile,
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsCustomDestination))
        .pipe(notify({ message: 'TASK: "customJs" Completed!', onLast: true }));
        done();
}));

gulp.task('browser-sync', gulp.series(function(done) {
    browserSync.init({
        proxy: "hot-drinks.test"
    });
    done();
}));

gulp.task('default', gulp.series(['styles', 'vendorsJs', 'customJS', 'browser-sync'], function() {
    gulp.watch(styleWatchFiles, gulp.series(['styles']));
    gulp.watch(vendorJSWatchFiles, gulp.series(['vendorsJs']));
    gulp.watch(customJSWatchFiles, gulp.series(['customJS']));
}));
