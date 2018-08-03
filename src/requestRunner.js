import axios from 'axios'

export class RequestRunner {
  static login(username) {
    console.log("Logging user in anon")
    return new Promise( (resolve,reject) => {
      console.log("Front - username is ", username)
      axios.post('/login/anonymous', {
        username : username,
        password : 'na'
      })
      .then( (res) => {
        if ( res.status === 200 ) {
          resolve(res.data);
        } else { console.log("FAILED", res); }
      })
      .catch( (err) => {
        console.log("ERROR in request runner login", err);
        resolve(err);
      })
    })
  }
  static fetchRestrictedData(url, userId) {
    axios.post(url, {
      userId : userId
    }).then( (res) => {
        if ( res.status === 200 ) {
          return res.data;
        }
    }).catch( (err) => {
      console.log(err);
      return err;
    })
  }
}
