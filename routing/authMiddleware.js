const passport = require('passport')


module.exports = function authenticated(req, res , next) {
  //where req.isAuthenticated is passports implementation of : if ( req.user ... )
  if ( req.isAuthenticated() ) {
    next()
  } else {
    res.redirect('/');
  }

}
