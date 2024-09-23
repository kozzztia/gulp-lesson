const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function buildStyles() {
    return gulp.src('./style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./'));
  };

function autoprefixStyles(){
    return gulp.src('./*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./'));

};


  function watch(){
    gulp.watch('./*.scss', gulp.series(buildStyles, autoprefixStyles))
  }

  exports.buildStyles = buildStyles;
  exports.autoprefixStyles = watch;
  exports.watch = watch;