const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
  title : { type : String, required : true },
  description : { type : String, required : true },
  likesAndDislikes : { type : String, required : false },
  conceptTags : [String],
  techStackTags : [String],
  timeDistribution : {
    meetingTime : { type : String, default : '0' },
    devTime : { type : String, default : '0' },
    designTime : { type : String, default : '0' },
    emailTime : { type : String, default : '0' },
    writingTime : { type : String, default : '0' }
  },
  ownedBy : { type: mongoose.Schema.Types.ObjectId, required: true }
})



module.exports = mongoose.model('Project', projectSchema);
