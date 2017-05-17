// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var del = require('del');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var connect=require('gulp-connect');

// JS hint task
gulp.task('jshint', function() {
    return gulp.src(['app/bower_components/**/*.js','app/*.js','app/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imageMin', function() {
    return  gulp.src('app/images/**/*')
        .pipe(changed('build/app/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('build/app/images'));
});


// move Uploads
gulp.task('uploadsMove', function() {
    return  gulp.src('app/uploads/**/*')
        .pipe(gulp.dest('build/app/uploads'));
});

// minify new or changed HTML pages
gulp.task('htmlMin', function() {
    return  gulp.src('app/views/**/*.html')
        .pipe(changed('build/app/views/'))
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/app/views/'));
});

// minify our js and css files
gulp.task('HtmlJsCssMinMove', function() {
    return  gulp.src(['!app/scripts/*min.js','!app/bower_components/*min.js','app/*.html'])
        .pipe(useref())
        .pipe(gulpif(['*.js'], uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulp.dest('build/app'));
});


//Uglify & moved main js and concat
gulp.task('mainMinJs', function() {
    return  gulp.src(['build/app/js/main.js'])
        .pipe(uglify())
        /*.pipe(concat('js/main.js'))*/
        .pipe(gulp.dest('build/app/js'));
});

//Uglify moved vendors js and concat
gulp.task('vendorsMinJs', function() {
    return  gulp.src(['build/app/js/vendors.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/app/js'));
});

//Move minify js
gulp.task('moveMinJs', function() {
    return  gulp.src(['app/bower_components/dcjqaccordion/js/*min.js','app/bower_components/jquery.nicescroll/dist/*min.js',,'app/bower_components/raphael/*min.js','app/scripts/**/*min.js'])
        .pipe(concat('js/vendorsMin.js'))
        .pipe(gulp.dest('build/app'));
});


//to remove all log from file and concatenate back to file
gulp.task('removeLog', function() {
   return  gulp.src('build/app/js/main.js')
        .pipe(stripDebug())
        .pipe(concat('js/main.js'))
        .pipe(gulp.dest('build/app'));
});


//Copy fonts
gulp.task('copyFonts',function () {
    return gulp.src(['app/bower_components/bootstrap/dist/fonts/**.*','app/bower_components/font-awesome/fonts/**.*'])
        .pipe(gulp.dest('build/app/fonts/'));
});


//clean our dist folder before building
gulp.task('clean', function () {
    return del('build/app');
});

//inject bower component into our app for us
gulp.task('wiredep', function() {
  return  gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app'))
        .pipe(connect.reload());
});

//watch our files for changes for us
gulp.task('watch',function () {
   gulp.watch(['app/**/*.*'],function () {
       gulp.src('./app/**/*.*')
         .pipe(connect.reload());
   });
});

//help to connect our development to a server
gulp.task('launchDev', function () {
    connect.server({
        name: 'Development Application',
        root: ['app'],
        port: 9000,
        livereload: false
    });
});

//help to connect our production version to a server
gulp.task('launchBuild', function () {
    connect.server({
        name: 'Production Application',
        root: 'build',
        port: 9001,
        livereload: false
    });
});

//help to run wiredep to inject component
gulp.task('default',['wiredep']);

//final build for production jsMin
gulp.task('build', function (callback) { //uploadsMove
runSequence('clean','imageMin', 'copyFonts','HtmlJsCssMinMove','mainMinJs','vendorsMinJs','moveMinJs','htmlMin','removeLog',callback);
});

//help to serve our files for use
gulp.task('serve', function (callback) {
    runSequence('watch','wiredep','launchDev', callback);
});