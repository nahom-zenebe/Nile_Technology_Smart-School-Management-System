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
    type: Schema.Types.ObjectId,
    ref:"Teacher",
   
   },
   students:[{
    type: Schema.Types.ObjectId,
    ref:"Student",
   }],
   subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },
  timetable: [{
    type: Schema.Types.ObjectId,
    ref: 'Timetable'
  }]

},

  
{ timestamps: true })

const Class= mongoose.model("Class", ClassSchema);
module.exports =  Class;