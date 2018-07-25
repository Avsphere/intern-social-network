const request = require('superagent');
const User = require('../models/user');
const Project = require('../models/project');
const passport = require('passport')


function getUserData(accessToken) {
  return new Promise( (resolve, reject) => {
    request
     .get('https://graph.microsoft.com/beta/me')
     .set('Authorization', 'Bearer ' + accessToken)
     .end((err, res) => {
       if ( !err ) { resolve(res) }
       else { reject(err) };
     });
  })
}

function createProjects( userId, formProjects ) {
  return new Promise( (resolve, reject) => {
    let promises = formProjects.map( (p) => {
      return new Promise( (resolve, reject) => {
        p.ownedBy = userId;
        let newProject = new Project(p);
        newProject.save( function(err, newProject) {
          if ( err ) {
            console.error("Error in create projects", err); reject(err);
          }
          else {
            resolve(newProject.ownedBy);
          }
        })
      })
    })
    //promises is the list of resolutions from above
    Promise.all( promises ).then( (projectIds) => {
      resolve(projectIds);
    })
  })
}

function checkAuthenticated(req, res , next) {
  //where req.isAuthenticated is passports implementation of : if ( req.user ... )
  if ( req.isAuthenticated() ) {
    next()
  } else {
    res.redirect('/');
  }
}

function findUserByUPN( upn ) {
  return new Promise( ( resolve, reject ) => {
    User.findOne( { 'upn' : upn }, function (err, user) {
      if ( err ) { console.log("Error when finding user", err); reject(err); }
      else { resolve(user); }
    })
  })
}

function createNewUser( profileData ) {
  return new Promise( ( resolve, reject ) => {
    let u = new User({
      displayName : profileData.displayName,
      firstName : profileData.firstName,
      surname : profileData.surname,
      department : profileData.department,
      jobTitle : profileData.jobTitle,
      upn : profileData.upn
    });
    u.save( function(err, newUser) {
      if ( err ) { console.error(err); reject(err); }
      else {
        resolve(newUser);
      }
    })
  })
}

function getProfilePhoto(accessToken) {
  return new Promise( ( resolve, reject ) => {
    request
     .get('https://graph.microsoft.com/beta/me/photo/$value')
     .set('Authorization', 'Bearer ' + accessToken)
     .end((err, res) => {
       if ( !err ) { resolve(res) }
       else { reject(err) };
     });
  })
}

exports.createProjects = createProjects;
exports.checkAuthenticated = checkAuthenticated;
exports.getUserData = getUserData;
exports.findUserByUPN = findUserByUPN;
exports.createNewUser = createNewUser;
exports.getProfilePhoto = getProfilePhoto;
