/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

const Raven = require('raven');
const ENV = require('./env/development');
Raven.config(ENV.sentryio.dsn).install();

module.exports.http = {

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/

    middleware: {

        /****************************************************************************
         *                                                                           *
         * Example custom middleware; logs each request to the console.              *
         *                                                                           *
         ****************************************************************************/

        customRequestLogger: function(req, res, next) {
            console.log("Requested :: ", req.method, req.url);
            return next();
        },

        passportInit: require('passport').initialize(),
        passportSession: require('passport').session(),

        // Raven's handlers has to be added as a keys to http.middleware config object
        requestHandler: Raven.requestHandler(),
        errorHandler: Raven.errorHandler(),

        /***************************************************************************
         *                                                                          *
         * The body parser that will handle incoming multipart HTTP requests. By    *
         * default as of v0.10, Sails uses                                          *
         * [skipper](http://github.com/balderdashy/skipper). See                    *
         * http://www.senchalabs.org/connect/multipart.html for other options.      *
         *                                                                          *
         * Note that Sails uses an internal instance of Skipper by default; to      *
         * override it and specify more options, make sure to "npm install skipper" *
         * in your project first.  You can also specify a different body parser or  *
         * a custom function with req, res and next parameters (just like any other *
         * middleware function).                                                    *
         *                                                                          *
         ***************************************************************************/

        bodyParser: require('skipper')({
            strict: true
        }),

        /***************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP request. (the Sails *
         * router is invoked by the "router" middleware below.)                     *
         *                                                                          *
         ***************************************************************************/

        order: [
            // The request handler must be the very first one
            'requestHandler',
            'favicon',
            'customRequestLogger',
            'www',
            'startRequestTimer',
            'cookieParser',
            'session',
            'passportInit',
            'passportSession',
            'bodyParser',
            'compress',
            // '$custom',
            'router',
            // The error handler must be after router, but before any other error middleware
            'errorHandler',
            '404',
            '500'
        ]

    },

    /***************************************************************************
     *                                                                          *
     * The number of seconds to cache flat files on disk being served by        *
     * Express static middleware (by default, these files are in `.tmp/public`) *
     *                                                                          *
     * The HTTP static cache is only active in a 'production' environment,      *
     * since that's the only time Express will cache flat-files.                *
     *                                                                          *
     ***************************************************************************/

    // cache: 31557600000
};