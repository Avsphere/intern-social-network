import axios from 'axios'
export class Account {
  constructor() {
    this.initHandlers()
  }
  helloworld() {
    console.log('Hello world from account')
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

  grabFormData() {
    return this.returnDummyFormData()
  }

  updateAccount() {
    return new Promise((resolve, reject) => {
      let data = {
        formData: this.grabFormData(),
        userId: $('#titleHeader').attr('data-account-id'),
      }
      axios
        .post('/updateUser', data)
        .then(res => {
          if (res.statusText === 'OK') {
            resolve(res.data)
          } else {
            console.log('FAILED', res)
          }
        })
        .catch(e => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }

  addProjectHtml() {
    console.log('Running html fun')

    $('#projectSection').append(`
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
              <textarea class="form-control" id="projectDescription" type="text" placeholder="Enter Project Description"></textarea>
            </div>
            <div class="form-group">
              <select name="cars">  
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div class="form-group">
              <div class="Account__newProject__timeTitle">Time spent during avg. week on...</div>
              <label for="meetingTime"> Meetings </label> 
              <input class="form-control" id="meetingTime" type="text" placeholder="x hrs">
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
    `)
    $('#footer').remove()
  }

  initHandlers() {
    let that = this

    $('#submitForm').on('click', el => {
      el.preventDefault()
      that.updateAccount()
    })

    $('#addProject').on('click', e => {
      e.preventDefault()
      that.addProjectHtml()
    })
  }
}
