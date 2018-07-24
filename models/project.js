const mongoose = require('mongoose');
const project = mongoose.Schema({
  title : { type : String, required : true },
  description : { type : String, required : true },
  conceptTags : [String],
  techStackTags : [String],
  timeDistribution : {
    meetingTime : { type : Number, required : true },
    devTime : { type : Number, required : true },
    designTime : { type : Number, required : true },
    emailTime : { type : Number, required : true },
    writingTime : { type : Number, required : true }
  },
  ownedBy : { type: mongoose.Schema.Types.ObjectId, required: true }
})



module.exports = mongoose.model('User', userSchema);
