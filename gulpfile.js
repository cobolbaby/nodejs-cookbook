var gulp = require('gulp'); //本地安装gulp所用到的地方
var fs = require('fs');

// 支持命令行参数

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
    'deploy',
], function() {
    console.log("gulp default done and exit.");
});