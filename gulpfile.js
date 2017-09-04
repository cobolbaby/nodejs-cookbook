var gulp = require('gulp'); //本地安装gulp所用到的地方
var fs = require('fs');

var taskPath = './gulp';
fs.readdirSync(taskPath).filter(function(file) {
    return file.match(/js$/); // 排除非 JS 文件，如 Vim 临时文件
}).forEach(function(_file) { // 引用公共方法，并且触发
    require('./' + taskPath + '/' + _file)();
});

//======================================================================
// main task entries
//======================================================================
gulp.task('default', [
    'deploy:weixinaudit',
], function() {
    console.log("gulp default done and exit.");
});