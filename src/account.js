import axios from 'axios'
export class Account {
  constructor() {
    this.initHandlers();
  }
  helloworld() {
    console.log("Hello world from account");
  }

  returnDummyFormData(){
    return {
      team : "aarons team",
      org : 'awesome org',
      projects : [
        {
        title : "Awesome project",
        description : "A cool ass project yo",
        conceptTags : ['IoT','cloud'],
        techStackTags : ['ps', 'js', 'css'],
        timeDistribution : {
          meetingTime : 4,
          devTime : 3,
          designTime : 1,
          emailTime : 1,
          writingTime : 3
        }
      },
      {
      title : "Woah woah project",
      description : "A cool ass project yo",
      conceptTags : ['Mixed Reality','Design'],
      techStackTags : ['ps', 'js', 'css'],
      timeDistribution : {
        meetingTime : 4,
        devTime : 3,
        designTime : 11,
        emailTime : 11,
        writingTime : 3
      }
    }
    ]

    }
  }

  grabFormData() {
    return this.returnDummyFormData();
  }

  updateAccount() {
    return new Promise( (resolve, reject) => {
      let data = {
        formData : this.grabFormData(),
        userId : $('#titleHeader').attr('data-account-id')
      }
      axios.post('/updateUser', data).then( (res) => {
        if ( res.statusText === 'OK' ) {
          resolve(res.data);
        } else { console.log("FAILED", res); }
      }).catch( (e) => {
        console.log("ERROR in request runner login", err);
        resolve(err);
      })
    })
  }


  initHandlers() {
    let that = this;
    $('#submitForm').on('click', (el) => {
      el.preventDefault();
      that.updateAccount();
    })
  }


}
