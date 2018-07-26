const User = require('./models/user')
const Project = require('./models/project')
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true
}).then(
  () => {
    console.log("Connected to database!, Seeding!")
    seed();
  },
  err => {
    console.log("ERROR - Database connection failed")
  }
)



function seedDummyProjects() {

  let projects = [
    {
      title : 'Xbox Live Friend Finder',
      description : 'Using machine learning to help Xbox users find users with similar game preferences',
      conceptTags : ['machine learning', 'gaming'],
      techStackTags : ['c#', 'mongoDB', 'java'],
      timeDistribution: {
        meetingTime : 4,
        devTime : 10,
        designTime : 5,
        emailTime : 2,
        writingTime : 1
      },
      ownedBy :''

    },
    {
      title : 'Surface Pen Button Controls',
      description : 'Adding an additional button to the surface pen with customizable functionalities',
      conceptTags : ['productivity', 'hardware'],
      techStackTags : [],
      timeDistribution: {
        meetingTime : 6,
        devTime : 1,
        designTime : 8,
        emailTime : 7,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Windows 10 Update Package Manager',
      description : 'Automating the update process so users dont have to worry about it',
      conceptTags : ['supportability', 'automation'],
      techStackTags : ['ASP.NET', 'c#', 'python'],
      timeDistribution: {
        meetingTime : 5,
        devTime : 9,
        designTime : 2,
        emailTime : 3,
        writingTime : 2
      },
      ownedBy :''
    },
    {
      title : 'Azure Security Monitor',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['node.js'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Azure Portal Redesign',
      description : 'Redesigning the Azure Portal',
      conceptTags : ['UI', 'design'],
      techStackTags : ['aws'],
      timeDistribution: {
        meetingTime : 9,
        devTime : 3,
        designTime : 7,
        emailTime : 8,
        writingTime : 6
      },
      ownedBy : ''
    },
    {
      title : 'Azure Support Center with Cortana',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['python'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'AD FS for the cloud',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['bootstrap.js'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox in the cloud',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['python'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Competitive Strategy for Azure apps',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['html/css'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Speech recognition for Hololens',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['mongodb'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Authenticator app for third parties',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['node.js'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Windows Hello',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['Microsoft Word'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Ink to text for education',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['Microsoft Excel'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Hacking STEM: teaching calculus',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['education'],
      techStackTags : ['Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Predictive analysis for cortana ',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['data analysis'],
      techStackTags : ['mysql'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Forward Looking Xbox Development',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['gaming'],
      techStackTags : ['docker'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Skype for Business redesign',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['productivity'],
      techStackTags : ['jenkins'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'App Proxy Automation',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['automation'],
      techStackTags : ['kubernete'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Windows as a Service story',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['blockchain'],
      techStackTags : ['babel'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Debugging for Windows',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['event sourcing'],
      techStackTags : ['objective c'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Windows Localization',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['IOT', 'big data'],
      techStackTags : ['angular'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Mixer Latency',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['gaming', 'artificial intelligence'],
      techStackTags : ['linux'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Accessibility Workshop for Xbox',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['accessibility', 'gaming'],
      techStackTags : ['powershell'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Azure IOT',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Surface Dial for Conferencing',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#','Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['javascript'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['java'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['c#'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    },
    {
      title : 'Xbox Authentication Library',
      description : 'This project focuses on detecting anomalies',
      conceptTags : ['anomaly detection', 'security'],
      techStackTags : ['ASP.NET', 'c#', 'java', 'Microsoft PowerPoint'],
      timeDistribution: {
        meetingTime : 8,
        devTime : 4,
        designTime : 7,
        emailTime : 9,
        writingTime : 5
      },
      ownedBy :''
    }
  ]

  return projects;

}


function seed() {
  let projects = seedDummyProjects();
  Project.remove({}, function(err, res2) {
    User.find({}, function(err, users) {
      let uIds = users.map( user => user._id )
      projects.forEach( (p) => {
        let theChosenOne = uIds[Math.floor(Math.random() * uIds.length)]
        p.ownedBy = theChosenOne;

        let newProject = new Project(p);
        newProject.save( (err, savedProject) => {
          if(err) { console.log(err); }
          else {
            User.findById( theChosenOne, function(err, doc){
              doc.projects.push( savedProject._id )
              doc.save()
            })
          }
        })
      })

    })



  })
}
