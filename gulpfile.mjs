import gulp from 'gulp';
import sass from 'gulp-sass';
import sassCompiler from 'sass'; // Импортируйте компилятор Sass
import { createRequire } from 'module';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import minify from 'gulp-minify';
import imagemin from 'gulp-imagemin';

const require = createRequire(import.meta.url);
const gulpSass = sass(sassCompiler); // Используйте компилятор здесь

function buildStyles() {
    return gulp.src('./style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError)) // Используйте gulpSass вместо sass
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
        .pipe(minify())
        .pipe(gulp.dest('dist'));
}

function buildHtml() {
    return gulp.src('index.html')
        .pipe(minify())
        .pipe(gulp.dest('dist'));
}

function optimizeImages() {
    return gulp.src('assets/**/*') 
        .pipe(imagemin({
            verbose: true,
            progressive: true,
            interlaced: true,
            optimizationLevel: 5,
        }))
        .on('data', (file) => {
            console.log('Processed file:', file.relative); // Логируем обрабатываемые файлы
            if (file.isNull()) {
                console.log('File is null:', file.relative); // Проверяем, не пустой ли файл
            }
        })
        .pipe(gulp.dest('dist/assets'))
        .on('end', () => console.log('Images processed!'));
}
const build = gulp.series(buildCss, buildJs, buildHtml, optimizeImages);

export { watch, build };