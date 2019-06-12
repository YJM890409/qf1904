const gulp = require('gulp'); //引入gulp模块
const html = require('gulp-minify-html');
const css = require('gulp-minify-css');
// const sass = require('gulp-sass');
const uglifyjs=require('gulp-uglify');
const rename=require('gulp-rename');
// const babel=require('gulp-babel');
// const es2015=require('babel-preset-es2015');
const watch=require('gulp-watch');


gulp.task('htmlfile',function(){
    return gulp.src('src/index.html')//引入文件
    .pipe(html())//压缩
    .pipe(gulp.dest('dist/'))//输出
});

gulp.task('cssfile',function(){
    return gulp.src('src/css/*.css')
    .pipe(css())
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('uglifyjs',function(){
    return gulp.src('src/js/*.js')
    .pipe(uglifyjs())
    .pipe(gulp.dest('dist/js/'))
});