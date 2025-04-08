const mongoose = require("mongoose");

const SubjectSchema=new mongoose.Schema({

    SubjectName:{
        type: String,
        required: true,
      },
      TeacherId:{
        type:Schema.Types.ObjectId,
        ref:"Teacher"
        
      },
      ClassId:{
        type:Schema.Types.ObjectId,
        ref:"Class"
        
      },
},
{ timestamps: true })

const Subject= mongoose.model("Subject", SubjectSchema);
module.exports =  Subject;