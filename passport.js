const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
require('dotenv').config()


module.exports = function(passport) {
  const users = {};
  passport.serializeUser( (user, done) => {
    const id = uuid.v4();
    users[id] = user;
    done(null, id);
  });
  passport.deserializeUser((id, done) => {
    const user = users[id];
    done(null, user);
  });

  passport.use(new OIDCStrategy({
    redirectUrl: 'http://localhost:3000/token',
    clientID: '06322244-0a08-4e0a-9687-bdc3438b93b1',
    clientSecret: 'bpZVE61#(zmdspYNIQ592|%',
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
    allowHttpForRedirectUrl: true, // For development only
    responseType: 'code',
    validateIssuer: false, // For development only
    responseMode: 'query',
    scope: ['User.Read', "User.ReadBasic.All"]
  }, (iss, sub, pulledProfile, accessToken, refreshToken, done) => {
      done(null, {
        pulledProfile,
        accessToken,
        refreshToken
      });
  })
);



}