const mongoose = require("mongoose");

const TeacherSchema=new mongoose.Schema({
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
      subjects:[{
        type:mongoose.Schema.Types.ObjectId,
           ref:'Subject'
       }],
      attendance:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'TeacherAttendance',
}],

      assignedClasses:[ {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Class"
        }
      ],



      



},
    { timestamps: true }
)

const Teacher= mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;