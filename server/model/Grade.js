const mongoose = require('mongoose');
const { Schema } = mongoose;

const GradeSchema = new Schema({
  
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['Midterm', 'Final', 'Project', 'Quiz', 'Assignment'], // you can adjust values
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const Grade = mongoose.model('Grade', GradeSchema);

module.exports = Grade;
