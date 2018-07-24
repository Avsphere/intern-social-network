export class Account {
  constructor() {

  }
  helloworld() {
    console.log("Hello world from account");
  }


  updateAccount() {
    return new Promise( (resolve, reject) => {
      let formData = grabFormData();
      axios.post('/updateUser', formData).then( (res) => {
        if ( res.statusText === 'OK' ) {
          resolve(res.data);
        } else { console.log("FAILED", res); }
      }).catch( (e) => {
        console.log("ERROR in request runner login", err);
        resolve(err);
      })
    })
  }


}
