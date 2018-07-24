const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');




module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log("in serialize", user)
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    console.log("in deserializeUser", id)
    User.findById(id, (err, user) => {
      if ( err ) { console.log( err ) }
      console.log("Found user", user)
      done(err, user);
    })
  });
  passport.use('local', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) {
      User.findOne({ anonymous : { username : username } }, ( err, user ) => {
        if ( err ) { console.log(err); }
        if ( !user ) {
          User.createNewAnonymousUser(username, req.clientIp).then( user => {
            return done(null, user);
          })
        }
        else {
          return done(null, user);
        }
      })
    }
  ));







}
