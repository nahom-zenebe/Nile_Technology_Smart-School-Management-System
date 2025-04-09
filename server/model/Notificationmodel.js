const mongoose = require("mongoose");

const NotificationSchema=new mongoose.Schema({

   title:{
    type:String,
    required:true
   },
   message:{
    type:String,
    required:true
   },

   date:{
    type:Date,
    required:true,
    default: Date.now
   
   },
   targetUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'targetUsersModel'
  }],
  targetUsersModel: {
    type: String,
    required: true,
    enum: ['Teacher', 'Student', 'Admin', 'Manager']
  },  
   status:{
    type:String,
    enum:["read","unread"]
   }
},
{ timestamps: true })

const Notification= mongoose.model("Notification", NotificationSchema);
module.exports =  Notification;