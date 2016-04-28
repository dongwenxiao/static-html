var
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    usemin = require('gulp-usemin'),
    uglify = require("gulp-uglify"),
    minifyHtml = require('gulp-minify-html'),
    minifycss = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps'),
    sequence = require('gulp-sequence');

/**
 * 自定义部署目录
 */

var DEVELOP_PATH = './dist/';
var SOURCE_PATH = './generate/';
var USEMIN_HTML_LIST = [
    'index.html'
];



// gulp.task('minify-js', function(){
//     return gulp.src([
//             "./static/jquery/1.11.3/jquery.min.js",
//             "./static/jquery.plugin/slider/1.0.0/slider.js",
//             "./static/jquery.plugin/lazyload/1.9.5/jquery.lazyload.js",
//             "./static/cmcm.responsive/1.0.0/cmcm.js",
//             "./static/v/old/base.js",
//             "./static/v/common/src/channel.js",
//             "./static/v/old/comm-channel.js",
//             "./static/v/common/src/fixedNav.js",
//             "./static/v/old/scrolling.js"
//         ])
//         .pipe(concat("lib.min.js"))
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(sourcemaps.write("./static/v/common/dist"))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DEVELOP_PATH + "javascripts"));
// });







/**
 * 清理发布目录
 */
gulp.task('clean', function() {
    return gulp.src(DEVELOP_PATH, { read: false })
        .pipe(rimraf());
});

/**
 * 静态资源拷贝
 */
// gulp.task('copy-assets', function(){
//     return gulp.src(['./public/**/*'])
//         .pipe(gulp.dest('dist/assets/'));
// });

/**
 * 压缩图片并拷贝
 */
gulp.task('min-image', function() {
    return gulp.src(SOURCE_PATH + 'images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DEVELOP_PATH + 'images/'));
});


/**
 * 源代码压缩、合并、替换引用
 */
USEMIN_HTML_LIST.forEach(function(htmlName, i) {
    gulp.task('usemin-' + htmlName, function() {
        return gulp.src(SOURCE_PATH + htmlName)
            .pipe(usemin({
                html: [function() {
                    return minifyHtml({ // 压缩html
                        empty: true,
                        conditionals: true,
                        spare: true,
                        cdata: true
                    });
                }],
                js: [uglify()], // 压缩js
                css: [minifycss()] // 压缩css
            }))
            .pipe(rev()) // md5后缀
            // .pipe(rev.manifest())
            .pipe(gulp.dest(DEVELOP_PATH));
    });
});

/**
 * HTML 压缩任务队列生成
 */
var sequenceString = USEMIN_HTML_LIST.map(function(htmlName, i) {
    return "'usemin-" + htmlName + "'";
}).join(',');
var sequenceTaskString = "gulp.task('usemin-sequence', sequence(" + sequenceString + "));"
eval(sequenceTaskString);

/**
 * 配置默认gulp任务
 */
gulp.task('default', ['clean'], function() {
    gulp.start('usemin-sequence');
    gulp.start('min-image');
});
