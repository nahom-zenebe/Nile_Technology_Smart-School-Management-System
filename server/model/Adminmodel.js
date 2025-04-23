const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
 
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
      Status: {
        type: String,
        enum: ['active','suspending','pending'],
        default: 'active'
      }},{
        
     timestamps: true
          
      }

);

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
