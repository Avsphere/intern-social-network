const express = require('express');
const router = express.Router();
const passport = require('passport')
const path = require('path')
const checkAuthenticated = require('./authMiddleware.js')



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', checkAuthenticated, function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/landing', checkAuthenticated, function(req, res, next) {
  console.log("get on landing")
  res.render('blogLanding', { title: 'Blog Landing' });
});


// router.post('/login/anonymous', passport.authenticate('local'), function(req, res) {
//   console.log("yser logged in !")
//   res.render('blogLanding', { title: 'Express' });
// });
router.post('/login/anonymous',
  passport.authenticate('local'),
  function(req, res) {
    res.send({success : true })
  }
);



module.exports = router;
