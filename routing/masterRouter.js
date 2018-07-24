const express = require('express');
const router = express.Router();
const passport = require('passport')
const path = require('path')
const checkAuthenticated = require('./authMiddleware.js')
const utils = require('../utils/utils.js');


router.get('/', (req, res) => {
  if (!req.isAuthenticated() ) {
    console.log('redirecting!')
    res.redirect('/login');
  } else {
    res.render('index');
  }
});


router.get('/login',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
});

router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      utils.getUserData( req.user.accessToken ).then( (userData) => {
        req.user.profile = {
          firstName : userData.body.givenName,
          surname : userData.body.surname,
          displayName : userData.body.displayName,
          department : userData.body.department,
          jobTitle : userData.body.jobTitle,
          upn : userData.body.onPremisesUserPrincipalName
        }
        return utils.findUserByUPN( req.user.profile.upn );
      }).then( (foundUser) => {
          if ( foundUser ) {
            return new Promise( (resolve,reject) => { resolve(foundUser); })
          } else {
            console.log("Creating new user");
            return utils.createNewUser( req.user.profile )
          }
      }).then( (user) => {
        res.render('index', { user : user})
      }).catch( (e) => {
        renderError(e, res);
      })
          // utils.findUserByUPN( req.user.profile.upn ).then( (d) => {
          //   console.log("FOUND USER DATA ", d)
          // }).catch( (e) => {
          //   console.log("Something went wrong", e)
          // })
      }
);

router.get('/disconnect', (req, res) => {
  req.session.destroy(() => {
    req.logOut();
    res.clearCookie('graphNodeCookie');
    res.status(200);
    res.redirect('/');
  });
});

// router.post('/login/anonymous', passport.authenticate('local'), function(req, res) {
//   console.log("yser logged in !")
//   res.render('blogLanding', { title: 'Express' });
// });
// router.post('/login/anonymous',
//   passport.authenticate('local'),
//   function(req, res) {
//     res.send({success : true })
//   }
// );


function renderError(e, res) {
  e.innerError = (e.response) ? e.response.text : '';
  res.render('error', {
    error: e
  });
}
module.exports = router;
