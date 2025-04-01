
const mongoose=require('mongoose')




const UserSchema= new mongoose.Schema({

    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }, 
    role:{
        type:String,
        enum:['Teacher','Manager','Admin','Student'],
        default:'Student',
    
    },
    ProfilePic:{
        type:String
   

    },
    createdAt:{
        type:Date,
        default:Date.now

    },},
    { timestamps: true }


)

const User=mongoose.model("User",UserSchema)

module.exports=User