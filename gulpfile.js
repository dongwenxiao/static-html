/*
* @Author: cs_victor
* @Date:   2016-07-16 17:50:31
* @Last Modified by:   cs_victor
* @Last Modified time: 2016-07-17 13:20:17
*/
var
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    usemin = require('gulp-usemin'),
    uglify = require("gulp-uglify"),
    minifyHtml = require('gulp-minify-html'),
    minifycss = require("gulp-minify-css"),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sequence = require('gulp-sequence'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    ejs = require("gulp-ejs");

var
    through = require('through2'),
    path = require('path'),
    colors = require('colors');


/**
 * 页面配置
 */
var configPages = require('./config/config-pages');
// 需要压缩的静态HTML列表
var USEMIN_HTML_LIST = [];
configPages.forEach(function(item) {
    USEMIN_HTML_LIST.push(item.page + '.html');
});
// 需要编译的EJS模板列表
var EJS_LIST = configPages.slice(0);


/**
 * 自定义部署目录
 */
var EJS_PATH = './views/';  
var STATIC_PATH = './generate/';
var DEPLOY_PATH = './dist/';
var DEV_LESS_PATH = './public/assets/stylesheets/less/';
var DEV_CSS_PATH = './public/assets/stylesheets/';


/**
 * 清理发布目录
 */
gulp.task('clean', ['clean-static', 'clean-dist'], function() {
    console.log('static & dist both clean.'.green);
});
gulp.task('clean-static', function() {
    return gulp.src(STATIC_PATH, { read: false })
        .pipe(rimraf());
});
gulp.task('clean-dist', function() {
    return gulp.src(DEPLOY_PATH, { read: false })
        .pipe(rimraf());
});


/**
 * EJS模板编译任务列表
 * 
 * 总任务名：static
 */
var staticTasks = [];
EJS_LIST.forEach(function(tpl) {
    var task = 'static-' + tpl.page + '.ejs';
    staticTasks.push(task);
    gulp.task(task, function() {
        // ejs 模板路径
        var fileName = EJS_PATH + tpl.page + '.ejs';

        // 文件相对路径
        var dir = path.dirname(tpl.page);

        // 编译ejs
        gulp.src(fileName)
            .pipe(ejs(tpl.data).on('error', gutil.log))
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(gulp.dest(STATIC_PATH + dir))
    });
});
gulp.task("static", staticTasks, function() {
    // console.info('Static html finished.'.green);
});


/**
 * 静态资源拷贝
 * 与生成静态HTML一起执行
 * 排除了less
 */
gulp.task('copy-assets', function(){
    return gulp.src(['./public/**/*','!**/*less*'])
        .pipe(gulp.dest(STATIC_PATH));
});

/**
 * 在dist时候，补充favcion.ico
 */
gulp.task('copy-assets-favicon', function(){
    return gulp.src(['./public/favicon.ico'])
        .pipe(gulp.dest(DEPLOY_PATH))
});

/**
 * 压缩图片用于发布
 *与压缩静态HTML一起执行
 */
gulp.task('min-image', function() {
    return gulp.src(STATIC_PATH + 'assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(DEPLOY_PATH + 'assets/images/'));
});


/**
 * 静态HTML源代码压缩、合并、替换引用任务列表
 * 由于每个页面的js和css可能是共同引用的，所以不能并行处理，
 * 利用任务队列，一个一个执行。
 *
 * 总任务名：usemin
 */
USEMIN_HTML_LIST.forEach(function(htmlName) {
    var dir = path.dirname(htmlName);
    gulp.task('usemin-' + htmlName, function() {
        return gulp.src(STATIC_PATH + htmlName)
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
            .pipe(gulp.dest(DEPLOY_PATH + dir));
    });
});
var useminSequenceTasks = USEMIN_HTML_LIST.map(function(htmlName) {
    return "'usemin-" + htmlName + "'";
}).join(',');
var sequenceTaskString = "gulp.task('usemin', sequence(" + useminSequenceTasks + "));"
eval(sequenceTaskString);


/**
 * Less 编译
 */
gulp.task("less", function() {
    gulp.src(DEV_LESS_PATH + "*.less")
        .pipe(less())
        .pipe(autoprefixer({ cascade: false, browsers: ['> 1%', 'Firefox >= 10', 'Opera >= 10', 'ie >= 9', 'iOS >= 4', 'Chrome >= 10'] }))
        .pipe(gulp.dest(DEV_CSS_PATH));
});
/**
 * Less 编译 - 自动
 */
gulp.task("auto-less", function() {
    gulp.watch(DEV_LESS_PATH + "*.less", ["less"]);
});


/**
 * 配置默认gulp任务
 */
gulp.task('step1', ['clean-static'], function(){
    gulp.start('static');
    gulp.start('copy-assets');
});

gulp.task('step2', ['clean-dist'], function(){
    gulp.start('usemin');
    gulp.start('min-image');
    gulp.start('copy-assets-favicon');
});

gulp.task('default', ['step1'], function() {
    // 由于磁盘写入延迟，所以
    // 延迟1s开始 step2 任务
    setTimeout(function(){
        gulp.start('step2');
    },1000);
});