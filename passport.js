const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
require('dotenv').config()

function getOIDCStrategy() {
  if ( process.env.NODE_ENV === 'production' ) {
    return new OIDCStrategy({
      redirectUrl: 'https://intern-project-hub.internplaygrounds.com/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
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
  } else {
    return new OIDCStrategy({
      redirectUrl: 'http://localhost:3000/token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
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
  }
}




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
  passport.use( getOIDCStrategy() );



}
