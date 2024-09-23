import gulp from 'gulp';
import sass from 'gulp-sass';
import * as sassCompiler from 'sass'; // Импортируем как модуль
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import minify from 'gulp-minify';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';


// Используем gulp-sass с sass-компилятором
const gulpSass = sass(sassCompiler);

function buildStyles() {
    return gulp.src('./style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest('./'));
}

function watch() {
    gulp.watch('./*.scss', gulp.series(buildStyles));
}

function buildCss() {
    return gulp.src('./style.css')
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
}

function buildJs() {
    return gulp.src('script.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
}

function buildHtml() {
    return gulp.src('index.html')
        .pipe(minify())
        .pipe(gulp.dest('dist'));
}

async function optimizeImages() {
    await imagemin(['assets/*.{jpg,png}'], {
        destination: 'dist/assets',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
}

const build = gulp.series(buildCss, buildJs, buildHtml, optimizeImages);

export { watch, build };
