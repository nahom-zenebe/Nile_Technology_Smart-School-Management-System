const mongoose = require("mongoose");

const SubjectSchema=new mongoose.Schema({

    SubjectName:{
        type: String,
        required: true,
      },
      TeacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
        
      },
      ClassId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
        
      },
},
{ timestamps: true })

const Subject= mongoose.model("Subject", SubjectSchema);
module.exports =  Subject;