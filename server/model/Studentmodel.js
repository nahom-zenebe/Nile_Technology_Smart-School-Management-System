const mongoose = require("mongoose");

const StudentSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String
      },
      Address: {
        type: String
      },
      Dateofbirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum:["Male","Female"]

      },

      profileImage: {
        type: String,
       
      },
      
      attendance:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'TeacherAttendance',
}],

 grades:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Grade"

 }]
,
feeStatus:{
    type:String,
    enum: ['pending', 'paid'],
    default: 'pending',

},
     

      status:{
        type:String,
        enum: ['active', 'graduated', 'suspended'],
        default: 'active',
      }
      




},
    { timestamps: true }
)

const Student= mongoose.model("Student", StudentSchema);

module.exports = Student;