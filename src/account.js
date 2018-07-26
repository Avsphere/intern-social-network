import axios from 'axios';
import { TagMaster } from './tagMaster.js'
export class Account {
  constructor() {
    this.tagMaster = new TagMaster();
    this.currProjectCount = 0;
    this.currUserId = $('#titleHeader').attr('data-account-id');

    this.getUserAndProjects().then((data) => {
      this.currUser = data.user;
      this.projectList = data.projects;
      console.log("Project and user", this.projectList, this.currUser)
      this.buildTabs();
      $('.formWrapper').html(this.buildProfilePage())
      this.initHandlers();
    })

    console.log(this.tagMaster)

  }
  getUserProjects() {
    return new Promise((resolve, reject) => {
      axios.post('/getUserProjects', { userId: this.currUserId })
        .then((res) => {
          if (res.statusText === 'OK') {
            resolve(res.data);
          } else {
            console.log("FAILED", res);
          }
        }).catch((err) => {
          console.log("ERROR in request runner login", err);
          resolve(err);
        })
    })
  }

  getUserAndProjects() {
    return new Promise((resolve, reject) => {
      axios.post('/getUserAndProjects', { userId: this.currUserId })
        .then((res) => {
          if (res.statusText === 'OK') {
            resolve(res.data);
          } else {
            console.log("FAILED", res);
          }
        }).catch((err) => {
          console.log("ERROR in request runner login", err);
          resolve(err);
        })
    })
  }

  getUserById() {
    return new Promise((resolve, reject) => {
      axios.post('/getUserById', { userId: this.currUserId })
        .then((res) => {
          if (res.statusText === 'OK') {
            resolve(res.data);
          } else {
            console.log("FAILED", res);
          }
        }).catch((err) => {
          console.log("ERROR in request runner login", err);
          resolve(err);
        })
    })
  }

  returnDummyFormData() {
    return {
      team: "aarons team",
      org: 'awesome org',
      projects: [{
        title: "Awesome project",
        description: "A cool ass project yo",
        conceptTags: ['IoT', 'cloud'],
        techStackTags: ['ps', 'js', 'css'],
        timeDistribution: {
          meetingTime: 4,
          devTime: 3,
          designTime: 1,
          emailTime: 1,
          writingTime: 3
        }
      },
      {
        title: "Woah woah project",
        description: "A cool ass project yo",
        conceptTags: ['Mixed Reality', 'Design'],
        techStackTags: ['ps', 'js', 'css'],
        timeDistribution: {
          meetingTime: 4,
          devTime: 3,
          designTime: 11,
          emailTime: 11,
          writingTime: 3
        }
      }
      ]

    }
  }


  grabFormData() {

  }

  findProjectById(id) {
    return this.projectList.find((p) => {
      if (p._id === id) {
        return p;
      }
    })
  }
  highlightClickedTab(tabClicked) {
    $('#tabsMenu').find('li').toArray().forEach((t) => {
      if ($(t).hasClass('active')) { $(t).removeClass('active'); }
    })
    tabClicked.addClass('active');
  }

  buildTabs() {
    this.projectList.forEach((p) => {
      let projectTitle = p.title,
        tabItem = $(`<li class="menuTab" data-id=${p._id}><a href="#">${projectTitle}</a></li>`)
      $('#tabsMenu').append(tabItem)
      tabItem.on('click', (el) => {
        el.preventDefault();
        let tabClicked = $(el.target).closest('li'),
          projectId = tabClicked.attr('data-id'),
          projectData = this.findProjectById(projectId);
        this.highlightClickedTab(tabClicked);
        let projectHtml = this.buildProjectHtml(projectData);
        $('.formWrapper').html(projectHtml)
        let conceptTagContainerId = 'projectConceptTags' + this.currProjectCount,
          conceptTagHtml = this.tagMaster.buildTags(conceptTagContainerId, 'concept');
        let techStackTagContianerId = 'projectTechStackTags' + this.currProjectCount,
          techStackTagHtml = this.tagMaster.buildTags(techStackTagContianerId, 'techStack');
        this.currProjectCount++;
        console.log("Tag html", conceptTagHtml);
        $('#' + conceptTagContainerId).append(conceptTagHtml);
        $('#' + techStackTagContianerId).append(techStackTagHtml);
        //These are the mandatory handles that add selected tags to array
        this.tagMaster.addHandles();
      })
    })
  }

  updateAccount() {
    return new Promise((resolve, reject) => {
      let data = {
        formData: this.grabFormData(),
        userId: this.currUserId
      }
      axios.post('/updateUser', data).then((res) => {
        if (res.statusText === 'OK') {
          resolve(res.data);
        } else {
          console.log("FAILED", res);
        }
      }).catch((err) => {
        console.log("ERROR in request runner login", err);
        resolve(err);
      })
    })
  }



  buildProjectHtml(projectData) {
    //add so that auto populates if already there are projects
    let html = `
          <form autocomplete="off">
            <div class="form-group">
              <label for="projectName"> Project Name </label>
              <input class="form-control" id="projectName" type="text" placeholder="${projectData.title}">
            </div>
            <div class="form-group">
              <label for="projectDescription"> Project Description </label>
              <input class="form-control" id="projectDescription" type="text" placeholder="${projectData.description}">
            </div>
            <label for="projectDescription"> Concept Tags </label>
            <div class="Account__tagFilter__tagList"> 
              <div id="projectConceptTags${this.currProjectCount}">
              </div>
            </div>
            <label for="projectDescription"> Stack Tags </label>
            <div class="Account__tagFilter__tagList"> 
              <div id="projectTechStackTags${this.currProjectCount}">
              </div>
            </div>
            <div class="form-group">
              <div class="Account__newProject__timeTitle">Time spent during avg. week on...</div>
              <label for="meetingTime"> Meetings </label>
              <input class="form-control" id="meetingTime" type="text" placeholder="${projectData.timeDistribution.meetingTime}">
              <label for="devTime"> Dev Work </label>
              <input class="form-control" id="devTime" type="text" placeholder="${projectData.timeDistribution.devTime}">
              <label for="designTime"> Design Work </label>
              <input class="form-control" id="designTime" type="text" placeholder="${projectData.timeDistribution.designTime}">
              <label for="emailTime"> Emails </label>
              <input class="form-control" id="emailTime" type="text" placeholder="${projectData.timeDistribution.emailTime}">
              <label for="writingTime"> Writing/Specing </label>
              <input class="form-control" id="writingTime" type="text" placeholder="${projectData.timeDistribution.writingTime}">
            </div>
          </form>
    `;
    return html;
  }
  buildNewProjectHtml() {
    //add so that auto populates if already there are projects
    let html = `
      <div class="Account__newProject">
        <div class="Account__newProject__title"> New Project </div>
        <div class="formWrapper" style="margin-left:3%; max-width:50%;">
          <form autocomplete="off">
            <div class="form-group">
              <label for="projectName"> Project Name </label>
              <input class="form-control" id="projectName" type="text" placeholder="Enter Project Name">
            </div>
            <div class="form-group">
              <label for="projectDescription"> Project Description </label>
              <input class="form-control" id="projectDescription" type="text" placeholder="Enter Project Description">
            </div>
            <div class="Account__tagFilter__tagList">
              <div id="conceptTags${this.currProjectCount}">
              </div>
            </div>
            <div class="Account__tagFilter__tagList">
              <div id="techStackTags${this.currProjectCount}">
              </div>
            </div>
            <div class="form-group">
              <div class="Account__newProject__timeTitle">Time spent during avg. week on...</div>
              <label for="meetingTime"> Meetings </label>
              <input class="form-control" id="meetingTime" type="text" placeholder="x fraction">
              <label for="devTime"> Dev Work </label>
              <input class="form-control" id="devTime" type="text" placeholder="x hrs">
              <label for="designTime"> Design Work </label>
              <input class="form-control" id="designTime" type="text" placeholder="x hrs">
              <label for="emailTime"> Emails </label>
              <input class="form-control" id="emailTime" type="text" placeholder="x hrs">
              <label for="writingTime"> Writing/Specing </label>
              <input class="form-control" id="writingTime" type="text" placeholder="x hrs">
            </div>
          </form>
        </div>
      </div>
    `;
    return html;
  }

  buildProfilePage() {
    let profileData = this.currUser;
    let html = `<form autocomplete="off">
       <div class="form-group"><label for="displayName">Display Name</label><input class="form-control" id="displayName" type="text" aria-describedby="emailHelp" value="${profileData.displayName}" disabled=""></div>
       <div class="form-group"><label for="exampleInputPassword1">UPN</label><input class="form-control" id="upn" type="text" value="${profileData.upn}" disabled=""></div>
       <div class="form-group"><label for="displayName">Department</label><input class="form-control" id="department" type="text" aria-describedby="emailHelp" value="${profileData.department}" disabled=""></div>
       <div class="form-group"><label for="displayName">Job Title</label><input class="form-control" id="jobTitle" type="text" aria-describedby="emailHelp" value="${profileData.jobTitle}" disabled=""></div>
       <div class="form-group"><label for="exampleInputPassword1">Team</label><input class="form-control" id="team" type="text" value="${profileData.team}"></div>
       <div class="form-group"><label for="exampleInputPassword1">Org</label>
       <input class="form-control" id="org" type="text" value="${profileData.org}"></div>
    </form>`
    return html;
  }



  initHandlers() {
    let that = this;
    $('#submitForm').on('click', (el) => {
      el.preventDefault();
      that.updateAccount();
    })

    $('#profileTab').on('click', (el) => {
      el.preventDefault();
      let tabClicked = $(el.target).closest('li');
      that.highlightClickedTab(tabClicked);
      $('.formWrapper').html(that.buildProfilePage())
    })

    $('#addProject').on('click', (e) => {
      e.preventDefault();
      let conceptTagDivId = 'conceptTagDiv' + that.currProjectCount,
        techStackTagDivId = 'techStackDiv' + that.currProjectCount,
        newProjectHtml = that.buildNewProjectHtml();

      let conceptTagHtml = that.tagMaster.buildTags(conceptTagDivId, 'concept'),
        techStackTagHtml = that.tagMaster.buildTags(techStackTagDivId, 'techStack');
      $('#projectSection').append(newProjectHtml);
      $('#conceptTags' + that.currProjectCount).append(conceptTagHtml);
      $('#techStackTags' + that.currProjectCount).append(techStackTagHtml)
      that.tagMaster.addHandles();
    })
  }


}
