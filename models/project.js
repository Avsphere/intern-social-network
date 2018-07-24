const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  username : { type : String, required : true },
  hasVisited : { type : Boolean, required : true }
})


// userSchema.statics.createNewAnonymousUser = function(username, ip) {
//   if ( !username || !ip ) { throw new Error('Creating new anon user, invalid params'); }
//   else {
//     let user = new this({
//       ipAddr : ip,
//       username : username,
//       hasVisited : false
//     })
//     return user.save();
//   }
// }


module.exports = mongoose.model('User', userSchema);
