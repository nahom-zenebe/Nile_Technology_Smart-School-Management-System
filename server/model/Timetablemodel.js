const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimetableSchema = new Schema({
  
    classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  
  endTime: {
    type: Date,
    required: true,

  }
}, {
  timestamps: true
});

const Timetable = mongoose.model('Timetable', TimetableSchema);

module.exports =Timetable;
