var url = require('url'),
    passport = require('passport');

/**
 * Passport Service
 *
 * A painless Passport.js service for your Sails app that is guaranteed to
 * Rock Your Socks™. It takes all the hassle out of setting up Passport.js by
 * encapsulating all the boring stuff in two functions:
 *
 *   passport.endpoint()
 *   passport.callback()
 *
 * The former sets up an endpoint (/auth/:provider) for redirecting a user to a
 * third-party provider for authentication, while the latter sets up a callback
 * endpoint (/auth/:provider/callback) for receiving the response from the
 * third-party provider. All you have to do is define in the configuration which
 * third-party providers you'd like to support. It's that easy!
 *
 * Behind the scenes, the service stores all the data it needs within "Pass-
 * ports". These contain all the information required to associate a local user
 * with a profile from a third-party provider. This even holds true for the good
 * ol' password authentication scheme – the Authentication Service takes care of
 * encrypting passwords and storing them in Passports, allowing you to keep your
 * User model free of bloat.
 */

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Load all strategies defined in the Passport configuration
 *
 * For example, we could add this to our config to use the GitHub strategy
 * with permission to access a users email address (even if it's marked as
 * private) as well as permission to add and update a user's Gists:
 *
    github: {
      name: 'GitHub',
      protocol: 'oauth2',
      strategy: require('passport-github').Strategy
      scope: [ 'user', 'gist' ]
      options: {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET'
      }
    }
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
passport.loadStrategies = function() {
    var self = this,
        strategies = sails.config.passport;

    Object.keys(strategies).forEach(function(key) {
        var options = {
                passReqToCallback: true
            },
            Strategy;

        if (key === 'bearer') {

            if (strategies.bearer) {
                Strategy = strategies[key].strategy;
                self.use(new Strategy(self.protocols.bearer.authorize));
            }

        } else {
            let protocol = strategies[key].protocol,
                callback = strategies[key].options.callback;

            if (!callback) {
                callback = 'auth/' + key + '/callback';
            }
            let baseUrl = sails.config.appUrl;

            switch (protocol) {
                // case 'oauth2':
                case 'wechat-enterprise':
                    options.callbackURL = url.resolve(baseUrl, callback);
                    options.requireState = false;
                    break;
            }

            // Merge the default options with any options defined in the config. All
            // defaults can be overriden, but I don't see a reason why you'd want to
            // do that.
            _.extend(options, strategies[key].options);

            Strategy = strategies[key].strategy;

            self.use(new Strategy(options, self.protocols[protocol]));
        }
    });
};

/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.endpoint = function(req, res) {

    let strategies = sails.config.passport,
        provider = req.param('provider'),
        options = {};

    // If a provider doesn't exist for this endpoint
    if (!strategies.hasOwnProperty(provider)) {
        return res.end('NOT SUPPORT ' + provider.toUpperCase());
    }

    // Attach scope if it has been set in the config
    if (strategies[provider].hasOwnProperty('scope')) {
        options.scope = strategies[provider].scope;
    }

    // Redirect the user to the provider for authentication. When complete,
    // the provider will redirect the user back to the application at
    //     /auth/:provider/callback
    this.authenticate(provider, options)(req, res, req.next);
};

/**
 * Create an authentication callback endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
passport.callback = function(req, res, next) {

    let strategies = sails.config.passport,
        provider = req.param('provider');

    // If a provider doesn't exist for this endpoint
    if (!strategies.hasOwnProperty(provider)) {
        return res.end('NOT SUPPORT ' + provider.toUpperCase());
    }

    // The provider will redirect the user to this URL after approval. Finish
    // the authentication process by attempting to obtain an access token. If
    // access was granted, the user will be logged in. Otherwise, authentication
    // has failed.
    this.authenticate(provider, {}, next)(req, res, req.next);
};

passport.serializeUser(function(user, next) {
    next(null, JSON.stringify(user));
});

passport.deserializeUser(function(serializedUser, next) {
    next(null, JSON.parse(serializedUser));
});

module.exports = passport;