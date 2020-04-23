const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS   = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const shell = require('gulp-shell');

//startup the web server and browserSync
//set watchers
function server() { 
    browserSync.init({
        server: {
            baseDir: "src/",
            index: "views/index.html"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
    gulp.watch('src/scripts/**', scripts);
    gulp.watch('src/styles/scss/**', styles);
    gulp.watch('src/images/**', images);
    gulp.watch('src/views/**', html);
};

//compiling Javascripts
function scripts() { 
    return gulp.src('src/scripts/**/*.js')
    .pipe(plumber())
    .on('error', gutil.log)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('src/scripts'))
    .pipe(browserSync.reload({stream: true}))
};

//compiling Javascripts for deployment
function scriptsDeploy() {
    return gulp.src('src/scripts/**/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
};

//compiling SCSS files
function styles() { 
    return gulp.src('src/styles/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        Browserslist: ['last 2 versions', 'not dead'],
        cascade: true
    }))
    .on('error', gutil.log)
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/styles'))
    .pipe(browserSync.reload({stream: true}))
};

//compiling SCSS files for deployment
function stylesDeploy() {
    return gulp.src('src/styles/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['last 2 versions', 'not dead'],
            cascade: true
        }))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/styles'))
};

//compressing images
async function images() { 
    gulp.src('src/images/**/*.+(png|jpg|gif|svg)')   
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('src/images'));
};

//compressing images for deployment
async function imagesDeploy() {
    gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(plumber())
        .pipe(gulp.dest('dist/images'));
};

//watch and refresh on all HTML file
function html() { 
    return gulp.src('src/views/*.html')
    .pipe(plumber())
    .pipe(browserSync.reload({stream: true}))
    .on('error', gutil.log);
};

//migrating over all HTML files for deployment
async function htmlDeploy() {
    gulp.src('src/*, { nodir: true }')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
//hidden files
    gulp.src('src/.*')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
//html
    gulp.src('src/views/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
};

//cleans dist directory in case things got deleted
async function clean() {
    return shell.task('rm -rf dist');
};

//create folders using shell
async function scaffold() {
    return shell.task([
        'mkdir dist',
        'mkdir dist/images',
        'mkdir dist/scripts',
        'mkdir dist/styles',
    ]
);
};

//development tasks
 exports.styles = styles;
 exports.scripts = scripts;
 exports.images = images;
 exports.html = html;
 exports.server = server;

const compile = gulp.parallel(scripts, styles, html);
exports.default = gulp.series(compile, server);

//deployment tasks
exports.scriptsDeploy = scriptsDeploy;
exports.stylesDeploy = stylesDeploy;
exports.imagesDeploy = imagesDeploy;
exports.htmlDeploy = htmlDeploy;
exports.clean = clean;
exports.scaffold = scaffold;

const preDeploy = gulp.series(clean, scaffold);
const deploy = gulp.parallel(scriptsDeploy, stylesDeploy, imagesDeploy);
exports.deploy = gulp.series(preDeploy, deploy, htmlDeploy);
