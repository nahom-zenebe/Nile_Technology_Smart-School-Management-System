const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSchema = new mongoose.Schema({
 
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
    required: true
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
