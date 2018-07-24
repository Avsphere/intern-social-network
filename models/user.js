const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  displayName : { type : String, required : true },
  firstName : { type : String, required : true },
  surname : { type : String, required : true },
  upn : { type : String, required : true },
  team : { type : String, required : false },
  org : { type : String, required : false },
  department : { type : String, required : true },
  jobTitle : { type : String, required: true },
  projects : [{ type: mongoose.Schema.Types.ObjectId, required: true }]
})




module.exports = mongoose.model('User', userSchema);
