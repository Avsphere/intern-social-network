const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')
const utils = require('../utils/utils.js')
const User = require('../models/user')
const Project = require('../models/project')
const checkAuthenticated = utils.checkAuthenticated;

/* Auth routes, these depend on whether prod or dev */
if (process.env.NODE_ENV === 'production') {

  router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect('/login')
    } else {
      let profileData = req.user.profile
      res.render('index', {
        user: profileData,
      })
    }
  })

  router.get('/account', checkAuthenticated, function(req, res) {
    let profileData = req.user.profile;
    if (!profileData.team) {
      profileData.team = 'Enter Team Name'
    }
    if (!profileData.org) {
      profileData.org = 'Enter Org Name'
    }
    res.render('account', {
      user: profileData,
    })
  })

} else {
  router.get('/', (req, res) => {
    res.render('index', {
      user: utils.getDummyUser()
    })
  })
  router.get('/account', function(req, res) {
    let profileData = utils.getDummyUser()
    if (!profileData.team) {
      profileData.team = 'Enter Team Name'
    }
    if (!profileData.org) {
      profileData.org = 'Enter Org Name'
    }
    res.render('account', {
      user: profileData,
    })
  })

}






router.get('/about', function(req, res) {
  res.render('about')
})

router.get('/login', passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/')
  },
)

router.get('/token', passport.authenticate('azuread-openidconnect', {
    failureRedirect: '/',
  }),
  (req, res) => {
    let blanketScoped_userData;
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
          let p = utils.getThumbnail(req.user.accessToken).then( (picPath) => {
            return utils.createNewUser({
              firstName: blanketScoped_userData.body.givenName,
              surname: blanketScoped_userData.body.surname,
              displayName: blanketScoped_userData.body.displayName,
              department: blanketScoped_userData.body.department,
              jobTitle: blanketScoped_userData.body.jobTitle,
              upn: blanketScoped_userData.body.onPremisesUserPrincipalName,
              profilePicPath : picPath,
              team : 'Unknown Team',
              org : 'Unknown Org',
              projects : []
            })
          })
          return p;
        }
      })
      .then(mongoUser => {
        console.log("Got mongo user", mongoUser)
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
  },
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
    userData = req.body.formData

  User.findById(userId, function(err, user) {
    if (!err) {
      //console.log('Update user Found user: ', user)
      user.team = userData.team;
      user.org = userData.org;
      user.save(err => {
        res.send({
          success: true
        })
      })
    }
  })
})

router.post('/createProject', (req, res) => {
  let newProject = new Project(req.body.formData),
    ownedBy = req.body.formData.ownedBy;

  newProject.save(function(err, newProj) {
    if (err) {
      console.error('Error in create projects', err);
    } else {
      User.findById(ownedBy, function(err, user) {
        if (err) {
          console.error('Error in create projects find user', err);
        } else {
          user.projects.push(newProj._id);
          user.save((err, saved) => {
            if (err) {
              console.log("Error in create projects save user", err)
            }
          })
          res.send(newProj);
        }
      })
    }
  })
})


router.post('/updateProject', (req, res) => {
  let projectId = req.body.projectId,
    projectData = req.body.formData
  Project.findById(projectId, function(err, project) {
    if (!err) {
      project.title = projectData.title
      project.description = projectData.description
      project.likesAndDislikes = projectData.likesAndDislikes
      project.conceptTags = projectData.conceptTags
      project.techStackTags = projectData.techStackTags
      project.timeDistribution = projectData.timeDistribution
      project.save(err => {
        if (err) {
          console.log(err);
        }
        res.send({
          success: true
        })
      })
    }
  })
})

router.post('/getUserById', (req, res) => {
  let userId = req.body.userId
  User.findById(userId, function(err, user) {
    if (!err) {
      res.send(user)
    } else {
      console.log('error in getUserById')
    }
  })
})

router.post('/getUserProjects', (req, res) => {
  let userId = req.body.userId
  User.findById(userId, function(err, user) {
    if (!err) {
      Project.find({
          _id: {
            $in: user.projects,
          },
        },
        function(err, projects) {
          res.send(projects)
        },
      )
    } else {
      console.log('Problem in update user!')
    }
  })
})

router.post('/getUserAndProjects', (req, res) => {
  let userId = req.body.userId
  let foundUser = {}
  User.findById(userId, function(err, user) {
    if (!err) {
      foundUser = user
      Project.find({
          _id: {
            $in: user.projects,
          },
        },
        function(err, projects) {
          res.send({
            projects: projects,
            user: foundUser
          })
        },
      )
    } else {
      console.log('Problem in update user!')
    }
  })
})

router.post('/getAggregateUsersAndProjects', (req, res) => {
  User.find({}, function(err, usersDocs) {
    let users = usersDocs.map(d => d.toObject())
    let promises = users.map(u => {
      return new Promise((resolve, reject) => {
        Project.find({
            _id: {
              $in: u.projects,
            },
          },
          function(err, projects) {
            u.projects = projects
            resolve(u)
          },
        )
      })
    })
    Promise.all(promises).then(usersAndProjects => {
      res.send(usersAndProjects)
    })
  })
})

router.post('/getAllProjects', (req, res) => {
  Project.find({}, function(err, projects) {
    res.send(projects)
  })
})

module.exports = router
