import axios from 'axios'
import {TagMaster} from './tagMaster.js'
export class Account {
  constructor() {
    this.tagMaster = new TagMaster()
    this.currProjectCount = 0
    this.currUserId = $('#titleHeader').attr('data-account-id')

    this.getUserAndProjects().then(data => {
      this.currUser = data.user;
      this.projectList = data.projects;
      console.log('Project list', this.projectList)
      console.log("Curr user", this.currUser);
      this.buildTabs()
      $('.formWrapper').html(this.buildProfilePage())
      this.initHandlers()
    })

    //console.log(this.tagMaster)
  }
  getUserProjects() {
    return new Promise((resolve, reject) => {
      axios
        .post('/getUserProjects', {userId: this.currUserId})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  getUserAndProjects() {
    return new Promise((resolve, reject) => {
      axios
        .post('/getUserAndProjects', {userId: this.currUserId})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  getUserById() {
    return new Promise((resolve, reject) => {
      axios
        .post('/getUserById', {userId: this.currUserId})
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  returnDummyFormData() {
    return {
      team: 'aarons team',
      org: 'awesome org',
      projects: [
        {
          title: 'Awesome project',
          description: 'A cool ass project yo',
          conceptTags: ['IoT', 'cloud'],
          techStackTags: ['ps', 'js', 'css'],
          timeDistribution: {
            meetingTime: 4,
            devTime: 3,
            designTime: 1,
            emailTime: 1,
            writingTime: 3,
          },
        },
        {
          title: 'Woah woah project',
          description: 'A cool ass project yo',
          conceptTags: ['Mixed Reality', 'Design'],
          techStackTags: ['ps', 'js', 'css'],
          timeDistribution: {
            meetingTime: 4,
            devTime: 3,
            designTime: 11,
            emailTime: 11,
            writingTime: 3,
          },
        },
      ],
    }
  }
  grabAccountFormData() {
    let formData = {
      team: $('#team').val(),
      org: $('#org').val(),
    }
    return formData
  }
  grabProjectFormData() {
    let selectedTags = this.tagMaster.getSelected(),
      conceptTags = selectedTags.selectedConceptTags,
      techStackTags = selectedTags.selectedTechStackTags;
    let formData = {
      title: $('#new_projectName').val(),
      description: $('#new_projectDescription').val(),
      likesAndDislikes : $('#new_projectLikesAndDislikes').val(),
      conceptTags: conceptTags,
      techStackTags: techStackTags,
      timeDistribution: {
        meetingTime: $('#new_meetingTime').val(),
        devTime: $('#new_devTime').val(),
        designTime: $('#new_designTime').val(),
        emailTime: $('#new_emailTime').val(),
        writingTime: $('#new_writingTime').val(),
      },
      ownedBy: this.currUserId,
    }

    let projectId = $('#projectData').attr('data-projectId')
    return {
      projectId: projectId,
      formData: formData,
    }
  }
  findProjectById(id) {
    return this.projectList.find(p => {
      if (p._id === id) {
        return p
      }
    })
  }
  highlightClickedTab(tabClicked) {
    $('#tabsMenu')
      .find('li')
      .toArray()
      .forEach(t => {
        if ($(t).hasClass('active')) {
          $(t).removeClass('active')
          $(t).find('a').removeClass('tabBorder');
        }
      })
    tabClicked.addClass('active')
    tabClicked.find('a').addClass('tabBorder');
  }
  buildTabs() {
    let newProject = {
      title: 'Add New Project',
      _id: '',
      newTab: true,
    }
    this.projectList.push(newProject)
    this.projectList.forEach(p => {
      let projectTitle = p.title,
        tabItem = ''
      if (p.newTab) {
        tabItem = $(
          `<li class="nav-item menuTab" id='newTab' data-id=${p._id}><a class="nav-link" href="#">${projectTitle}</a></li>`,
        )
      } else {
        tabItem = $(
          `<li class="nav-item menuTab" data-id=${p._id}><a class="nav-link" href="#">${projectTitle}</a></li>`,
        )
      }
      $('#tabsMenu').append(tabItem)
      tabItem.on('click', el => {
        el.preventDefault()
        let tabClicked = $(el.target).closest('li'),
          projectId = tabClicked.attr('data-id')
        if (projectId) {
          let projectData = this.findProjectById(projectId);
          this.highlightClickedTab(tabClicked)
          let projectHtml = this.buildProjectHtml(projectData);
          console.log("Project data", projectData);
          $('.formWrapper').html(projectHtml)
          let conceptTagContainerId = 'projectConceptTags' + this.currProjectCount,
              conceptTagHtml = this.tagMaster.buildTags( conceptTagContainerId, 'concept');
          let techStackTagContainerId = 'projectTechStackTags' + this.currProjectCount,
              techStackTagHtml = this.tagMaster.buildTags(techStackTagContainerId, 'techStack');
          this.currProjectCount++
          $('#' + conceptTagContainerId).append(conceptTagHtml)
          $('#' + techStackTagContainerId).append(techStackTagHtml)
          //These are the mandatory handles that add selected tags to array
          this.tagMaster.addHandles()
          this.tagMaster.selectTags( projectData.conceptTags.concat( projectData.techStackTags ) );
        } else {
          this.highlightClickedTab(tabClicked)
          $('.formWrapper').html(this.buildNewProjectHtml())
          let conceptTagContainerId = 'projectConceptTags' + this.currProjectCount,
              conceptTagHtml = this.tagMaster.buildTags( conceptTagContainerId, 'concept');
          let techStackTagContainerId = 'projectTechStackTags' + this.currProjectCount,
              techStackTagHtml = this.tagMaster.buildTags(techStackTagContainerId, 'techStack');
          this.currProjectCount++
          $('#' + conceptTagContainerId).append(conceptTagHtml)
          $('#' + techStackTagContainerId).append(techStackTagHtml)
          this.tagMaster.addHandles()
        }
      })
    })
  }
  updateAccount() {
    return new Promise((resolve, reject) => {
      let data = {
        userId: this.currUserId,
        formData: this.grabAccountFormData(),
      }
      axios
        .post('/updateUser', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
            window.location.href = "/account";
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  createProject() {
    return new Promise((resolve, reject) => {
      let formDataAndId = this.grabProjectFormData()
      let data = {
        projectId: formDataAndId.projectId,
        formData: formDataAndId.formData,
      }
      console.log("Posting project data", data)
      axios
        .post('/createProject', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  updateProject() {
    return new Promise((resolve, reject) => {
      let formDataAndId = this.grabProjectFormData()
      let data = {
        projectId: formDataAndId.projectId,
        formData: formDataAndId.formData,
      }
      console.log("Posting data to update project", data);

      axios
        .post('/updateProject', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  buildProjectHtml(projectData) {
    let projectLikesAndDislikes = projectData.likesAndDislikes || "No likes or dislikes";
    let html = `
          <form autocomplete="off">
            <div class="form-group" id="projectData" data-projectId=${
              projectData._id
            } >
              <label for="projectName"> Project Name </label>
              <input class="form-control" id="new_projectName" type="text" value="${
                projectData.title
              }">
            </div>
            <div class="form-group">
              <label for="projectDescription"> Project Description </label>
              <textArea class="form-control" id="new_projectDescription" type="text" style="min-height:6rem">${projectData.description}</textArea>
            </div>
              <label for="projectLikes"> Project Likes and Dislikes </label>
              <textArea class="form-control" id="new_projectLikesAndDislikes" type="text" style="min-height:6rem">${projectLikesAndDislikes}</textArea>
            <label for="projectDescription"> Concept Tags </label>
            <div class="Account__tagFilter__tagList">
          <div id="projectConceptTags${this.currProjectCount}"></div>
          </div>
            <label for="projectDescription"> Stack Tags </label>
        <div class="Account__tagFilter__tagList">
          <div id="projectTechStackTags${this.currProjectCount}"></div>
        </div>
        <div class="form-group">
          <div class="Account__newProject__timeTitle">Percentage of time spent on:</div>
          <label for="meetingTime"> Meetings </label>
          <input class="form-control" id="new_meetingTime" type="text" value="${
            projectData.timeDistribution.meetingTime
          }">
            <label for="devTime"> Dev Work </label>
            <input class="form-control" id="new_devTime" type="text" value="${
              projectData.timeDistribution.devTime
            }">
              <label for="designTime"> Design Work </label>
              <input class="form-control" id="new_designTime" type="text" value="${
                projectData.timeDistribution.designTime
              }">
                <label for="emailTime"> Emails </label>
                <input class="form-control" id="new_emailTime" type="text" value="${
                  projectData.timeDistribution.emailTime
                }">
                  <label for="writingTime"> Writing/Specing </label>
                  <input class="form-control" id="new_writingTime" type="text" value="${
                    projectData.timeDistribution.writingTime
                  }">
            </div>
          </form>
                `
    return html
  }
  buildNewProjectHtml() {
    let html = `
          <form autocomplete="off">
            <div class="form-group" id="projectData">
              <label for="projectName"> Project Name </label>
              <input class="form-control" id="new_projectName" type="text">
            </div>
            <div class="form-group">
              <label for="projectDescription"> Project Description </label>
              <input class="form-control" id="new_projectDescription" type="text" >
            </div>
            <label for="projectDescription"> Concept Tags </label>
            <div class="Account__tagFilter__tagList">
          <div id="projectConceptTags${this.currProjectCount}"></div>
          </div>
            <label for="projectDescription"> Stack Tags </label>
        <div class="Account__tagFilter__tagList">
          <div id="projectTechStackTags${this.currProjectCount}"></div>
        </div>
        <div class="form-group">
          <div class="Account__newProject__timeTitle">Percentage of time spent on:</div>
          <label for="meetingTime"> Meetings </label>
          <input class="form-control" id="new_meetingTime" type="text" placeholder="All things meetings">
            <label for="devTime"> Dev Work </label>
            <input class="form-control" id="new_devTime" type="text" placeholder="All things dev">
              <label for="designTime"> Design Work </label>
              <input class="form-control" id="new_designTime" type="text" placeholder="Anything design related,">
                <label for="emailTime"> Emails </label>
                <input class="form-control" id="new_emailTime" type="text" placeholder="Crafting emails, talking emails, thinking about emails...">
                <label for="writingTime"> Writing/Specing </label>
                <input class="form-control" id="new_writingTime" type="text" placeholder="PowerPoint / Excel / Articulation work would fall in this category">
            </div>
          </form>
                `
    return html
  }
  buildProfilePage() {
    let profileData = this.currUser;
    if ( !profileData.org ) { profileData.org = 'Unknown org'}
    let html = `<form autocomplete="off">
                  <div class="form-group">
                    <label for="displayName">Display Name</label>
                    <input class="form-control" id="displayName" type="text" aria-describedby="emailHelp" value="${
                      profileData.displayName
                    }" disabled="">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">UPN</label>
                    <input class="form-control" id="upn" type="text" value="${
                      profileData.upn
                    }" disabled="">
                  </div>
                  <div class="form-group">
                    <label for="displayName">Department</label>
                    <input class="form-control" id="department" type="text" aria-describedby="emailHelp" value="${
                      profileData.department
                    }" disabled="">
                  </div>
                  <div class="form-group">
                    <label for="displayName">Job Title</label>
                    <input class="form-control" id="jobTitle" type="text" aria-describedby="emailHelp" value="${
                      profileData.jobTitle
                    }" disabled="">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Team</label>
                    <input class="form-control" id="team" type="text" value="${
                      profileData.team
                    }">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Org</label>
                    <input class="form-control" id="org" type="text" value="${
                      profileData.org
                    }">
                  </div>
                </form>`
    return html
  }
  initHandlers() {
    let that = this
    $('#submitForm').on('click', el => {
      el.preventDefault()
      if ($('#profileTab').hasClass('active')) {
        that.updateAccount()
      } else {
        if ($('#newTab').hasClass('active')) {
          that.createProject().then( (newProject) => {
            console.log("new project", newProject)
            window.location.href = "/account";
          }).catch( (e) => { console.log("Error when creating new project", e); });

        } else {
          that.updateProject().then( (updatedProject) => {
            console.log( "Updated project", updatedProject );
          })
        }
      }
    })

    $('#profileTab').on('click', el => {
      el.preventDefault()
      let tabClicked = $(el.target).closest('li')
      that.highlightClickedTab(tabClicked)
      $('.formWrapper').html(that.buildProfilePage())
    })

  }
}
