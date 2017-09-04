var gulp = require('gulp');
var child_process = require('child_process');

module.exports = function() {

    /*
    var exec = require('child_process').exec; 
    var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
    exec(cmdStr, function(err,stdout,stderr){
        if(err) {
            console.log('get weather api error:'+stderr);
        } else {
            // 这个stdout的内容就是上面我curl出来的这个东西：
            // {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
            var data = JSON.parse(stdout);
            console.log(data);
        }
    });
    */

    gulp.task('deploy:weixinaudit', function(cb) { // 异步任务支持

        let secret = require('../secret.json');
        let cmdstr = [
            'rsync',
            '--archive --compress --verbose',
            '--exclude=.* --exclude=gulp --exclude=node_modules --exclude=gulpfile.js',
            '.', ['rsync://', secret.username, '@', secret.host, ':', secret.targetDir].join('')
        ].join(' ');

        child_process.exec(cmdstr, function(err, stdout, stderr) {
            if (err) {
                return cb(err); // 返回 error
            }
            console.log(stdout);
            cb(); // 完成 task
        });
    });
}