var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css');
    

// Compile Sass to css and place it in css/styles.css
gulp.task('styles', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
        'sourcemap=none': true
    }))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('css/'))
    
    // Minify css
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

// Watch for changes in scss files
gulp.task('watch', function(gulpCallback){
    browserSync.init({
        server: './',
        open: true
    }, function callback() {
        gulp.watch('index.html', browserSync.reload);
        
        gulp.watch('css/*', function() {
            gulp.src('css/*')
                .pipe(browserSync.stream());
        })

    gulpCallback();
    })
    
    gulp.watch('src/scss/*.scss', ['styles']);
});

// All tasks together
gulp.task('default', ['styles', 'watch'])