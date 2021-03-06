const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const htmlmin = require('gulp-htmlmin');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app',
        },
    });
}

function cleanDist() {
    return del('dist');
}

function sctipts() {
    return src(['app/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            }),
        )
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function build() {
    return src(
        ['app/css/style.min.css', 'app/fonts/**/*', 'app/js/main.min.js', 'app/images/**/*'],
        {
            base: 'app',
        },
    ).pipe(dest('dist'));
}
function htmls() {
    return src('app/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
}
function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/js/main.js', '!app/js/main.min.js'], sctipts);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.sctipts = sctipts;
exports.cleanDist = cleanDist;
exports.htmls = htmls;

exports.build = series(cleanDist, htmls, build);
exports.default = parallel(styles, sctipts, browsersync, watching);
