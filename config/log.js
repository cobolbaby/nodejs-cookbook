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
const _ = require('lodash');

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
option.transports = _.extend(option.transports, [
	new winston.transports.Console({
		colorize: true,
		timestamp: true
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
