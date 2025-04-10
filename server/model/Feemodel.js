const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({

  studentID: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Student', 
     required: true },
  amount: { type: Number,
     required: true },
  dueDate: { type: Date,
     required: true },
  paidStatus: { type: Boolean, 
    default: false },
  paymentDate: { type: Date },
  paymentMethod: { type: String },
  receipt: { type: String },
},{
    timestamps: true
});



const Fee= mongoose.model("Fee", FeeSchema);
module.exports=Fee ;
