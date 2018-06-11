var fs = require('fs');
var path = require("path"); 

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
	if (mkdirsSync(path.dirname(dirname))) {
		fs.mkdirSync(dirname);
		return true;
	}
}

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {
	fs.exists(dirname, function (exists) {
		if (exists) {
			return callback();
		}
		// console.log(path.dirname(dirname));  
		mkdirs(path.dirname(dirname), function () {
			fs.mkdir(dirname, callback);
		});
	});
}

let currentFile = './dist/dir/config.js';
let fileContent = 'abc';

// console.log(path.dirname(currentFile));
// console.log(path.dirname(path.resolve(__dirname, currentFile)));

mkdirsSync(path.dirname(currentFile));
fs.writeFileSync(currentFile, fileContent);