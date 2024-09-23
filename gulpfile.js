const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return gulp.src('./style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./'));
  };

  function watch(){
    gulp.watch('./*.scss').then(buildStyles)
  }

  exports.buildStyles = buildStyles;
  exports.watch = watch;