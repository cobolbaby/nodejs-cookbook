/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
	/***************************************************************************
	 * Set the default database connection for models in the development       *
	 * environment (see config/connections.js and config/models.js )           *
	 ***************************************************************************/

	// models: {
	//   connection: 'someMongodbServer'
	// }

	appUrl: "http://localhost:1337",

	entry: {
		home: '/',
		login: '/login',
		resource: 'http://oss.aliyun.com/'
	},

	proxyServer: 'http://45.76.206.97:1337',

	sentryio: {
		dsn: 'https://30a7efe55976451c8afd8e645232fe36@sentry.io/1222009'
	}
};
