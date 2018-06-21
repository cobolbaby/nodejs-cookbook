/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// 自定义日志目录
const LOG_DIR = 'logs';

//=======================================================================================
// prepare log directoy before start.
//=======================================================================================
((logdir) => {

	const dirname = path.resolve(logdir);
	console.log('prepare log directoy before start.');

	// check if exist, otherwise create one.
	try {
		fs.accessSync(dirname, fs.F_OK)
	} catch (err) {
		fs.mkdirSync(dirname);
	}
	let fstat = fs.statSync(dirname);
	if (!fstat.isDirectory()) {
		throw new Error(`${dirname} is not a directoy`);
	}
	// check writable.
	try {
		fs.accessSync(dirname, fs.W_OK);
	} catch (error) {
		throw new Error(`${dirname} not allowed to write`);
	}

})(LOG_DIR);

// let option = require('');
let option = {
	levels: {},
	level: 'silly',
	transports: []
};
option.levels = {
	silent: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	verbose: 5,
	silly: 6
};
option.transports = option.transports.concat([
	new winston.transports.Console({
		colorize: true,
		timestamp: true
	}),
	new winston.transports.DailyRotateFile({
		dirname: LOG_DIR,
		filename: 'application.%DATE%.log',
		datePattern: 'yyyy-MM-dd',
		zippedArchive: true,
		// maxFiles: '14d',
	})
]);
const logger = new winston.Logger(option);

module.exports.log = {
	// Pass in our custom logger, and pass all log levels through.
	custom: logger,
	level: 'silly',

	// Disable captain's log so it doesn't prefix or stringify our meta data.
	inspect: false
};
