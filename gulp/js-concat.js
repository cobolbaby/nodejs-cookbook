module.exports = function() {

    /*gulp.task('js-concat', function () {
        gulp.src('src/js/*.js')
            .pipe(concat('all.js'))//合并后的文件名
            .pipe(gulp.dest('dist/js'));
    });*/

    /*gulp.task('html-min', function () {
        var options = {
            removeComments: true, // 清除HTML注释
            collapseWhitespace: true, // 压缩HTML
            removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
            minifyJS: true, // 压缩页面JS
            minifyCSS: true // 压缩页面CSS
        };
        gulp.src('src/html/*.html')
            .pipe(htmlmin(options))
            .pipe(gulp.dest('dist/html'));
    });*/



}