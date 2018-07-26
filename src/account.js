import axios from 'axios';
import { TagMaster } from './tagMaster.js'
export class Account {
  constructor() {
    this.initHandlers();
    this.tagMaster = new TagMaster();
    this.currProjectCount = 0;
    this.currUserId = $('#titleHeader').attr('data-account-id');
    this.getUserProjects().then( (d) => { console.log(d); })
    console.log(this)

  }
  getUserProjects() {
    return new Promise( (resolve, reject) => {
      axios.post('/getUserProjects', { userId : this.currUserId })
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

  addTabs() {
    this.getUserProjects().then( (projects) => {
      let tabs = projects.map( (p) => {
        return `<li><a href="#">Project</a></li>`
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
    return this.returnDummyFormData();
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
            <div id="conceptTags${this.currProjectCount}">
            </div>
            <div id="techStackTags${this.currProjectCount}">
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

  initHandlers() {
    let that = this;
    $('#submitForm').on('click', (el) => {
      el.preventDefault();
      that.updateAccount();
    })
      e.preventDefault();
      let conceptTagDivId = 'conceptTagDiv' + that.currProjectCount,
          techStackTagDivId = 'techStackDiv' + that.currProjectCount,
          newProjectHtml = that.buildProjectHtml();

      let conceptTagHtml = that.tagMaster.buildTags(conceptTagDivId, 'concept'),
          techStackTagHtml = that.tagMaster.buildTags(techStackTagDivId, 'techStack');
      $('#projectSection').append(newProjectHtml);
      $('#conceptTags' + that.currProjectCount).append(conceptTagHtml);
      $('#techStackTags' + that.currProjectCount).append(techStackTagHtml)
      that.tagMaster.addHandles(conceptTagDivId);
      that.tagMaster.addHandles(techStackTagDivId);
    })
  }


}
