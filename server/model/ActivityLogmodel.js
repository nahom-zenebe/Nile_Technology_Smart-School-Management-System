const mongoose = require("mongoose");
const logger=require('../libs/logger')


const ActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, 
    },
    entity: {
      type: String,
      required: true,
      enum: ["Teacher","Student","Attendance","Grade","Notification","Grade","Fee","Class","Subject","Timetable"], 
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, 
    },
    ipAddress: {
        type: String,
        required: false,
      },
    
  },
  { timestamps: true }

);







const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);

module.exports = ActivityLog;