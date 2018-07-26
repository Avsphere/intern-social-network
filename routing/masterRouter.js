const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const utils = require('../utils/utils.js')
const User = require('../models/user')
const Project = require('../models/project')
// const frontendDev = true

// if (frontendDev) {
//   router.get('/', (req, res) => {
//     res.render('index', {
//       user: User.dummyData,
//     })
//   })
// }

// router.get('/', (req, res) => {
//   if (!req.isAuthenticated()) {
//     res.redirect('/login')
//   } else {
//     let profileData = req.user.profile
//     res.render('index', {
//       user: profileData,
//     })
//   }
// })

function getDummyUser() {
  //this id is a real user id
  return {
    _id : '5b57b107f2ade61c10c4f0f8',
    displayName : "Aaron",
    firstName : "aa",
    surname : "perr",
    upn : "woahAaron@gmail.com",
    team : "Bea",
    org : "uty",
    department : "cloud",
    jobTitle : "awesomeJob",
    projects : []
  }
}

router.get('/', (req, res) => {
  res.render('index', { user : getDummyUser() })
})
router.get('/account', function(req, res) {
  // let profileData = req.user.profile;
  let profileData =  getDummyUser();
  if (!profileData.team) {
    profileData.team = 'Enter Team Name'
  }
  if (!profileData.org) {
    profileData.org = 'Enter Org Name'
  }
  res.render('account', {
    user: profileData
  })
})

router.get('/about', function(req, res) {
  res.render('about')
})

router.get('/blogTest', function(req, res) {
  res.render('blogTest')
})

router.get(
  '/login',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get(
  '/token',
  passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
  }),
  (req, res) => {
    let blanketScoped_userData
    utils
      .getUserData(req.user.accessToken)
      .then(userData => {
        blanketScoped_userData = userData
        return utils.findUserByUPN(userData.body.onPremisesUserPrincipalName)
      })
      .then(foundUser => {
        if (foundUser) {
          return new Promise((resolve, reject) => {
            resolve(foundUser)
          })
        } else {
          return utils.createNewUser({
            firstName: blanketScoped_userData.body.givenName,
            surname: blanketScoped_userData.body.surname,
            displayName: blanketScoped_userData.body.displayName,
            department: blanketScoped_userData.body.department,
            jobTitle: blanketScoped_userData.body.jobTitle,
            upn: blanketScoped_userData.body.onPremisesUserPrincipalName,
          })
        }
      })
      .then(mongoUser => {
        req.user.profile = mongoUser
        res.render('index', {
          user: req.user.profile,
        })
      })
      .catch(e => {
        e.innerError = e.response ? e.response.text : ''
        res.render('error', {
          error: e,
        })
      })
  }
)

router.get('/disconnect', (req, res) => {
  req.session.destroy(() => {
    req.logOut()
    res.clearCookie('graphNodeCookie')
    res.status(200)
    res.redirect('/')
  })
})

router.post('/updateUser', (req, res) => {
  let userId = req.body.userId,
      userData = req.body.formData;
  User.findById(userId, function(err, user) {
    if (!err) {
      //console.log('Update user Found user: ', user);
      user.team = userData.team
      user.org = userData.org
      utils.createProjects(userId, userData.projects).then( (projectIds) => {
        console.log('New project Ids ', projectIds);
        user.projects = user.projects.concat(projectIds);
        user.save( (err) => {
          res.send({success : true})
        })
      })
    } else {
      console.log('Problem in update user!')
    }
  })
})

router.post('/getUserProjects', (req, res) => {
  let userId = req.body.userId;
  User.findById(userId, function(err, user) {
    if (!err) {
      Project.find({
        '_id' : {
          $in : user.projects
        }
      }, function(err, projects){
          res.send(projects)
      })
    } else {
      console.log('Problem in update user!')
    }
  })
})

router.post('/getAllProjects', (req,res) => {
  Project.find({}, function(err, projects) {
    res.send(projects);
  })
})




module.exports = router
