const mongoose = require("mongoose");

const ClassSchema=new mongoose.Schema({

   ClassName:{
    type:String,
    required:true
   },
   Section:{
    type:String,
    required:true
   },

   teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Teacher",
   
   },
   students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Student",
   }],
   subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  timetable: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timetable'
  }]

},

  
{ timestamps: true })

const Class= mongoose.model("Class", ClassSchema);
module.exports =  Class;