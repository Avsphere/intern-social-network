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

const dummyData = {
  'displayName': 'Ivraj Seerha',
  'firstName': 'Ivraj',
  'surname': 'Seerha',
  'upn': 't-ivseer@microsoft.com',
  'team': 'ASM',
  'org': 'Azure Security',
  'department': 'Core Sec Eng Services',
  'jobTitle': 'Program Management Intern',
  'projects': ''
}


module.exports = mongoose.model('User', userSchema);
