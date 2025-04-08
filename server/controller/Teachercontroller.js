const Teacher=require("../model/Teachermodel")
const Cloundinary = require("../lib/Cloundinary");
const User = require("../model/Usermodel");

module.exports.createTeacherprofile=async(req,res)=>{
    try {
        const userId = req.user?._id;
        const { firstName, lastName, email, phone,Address,Dateofbirth,gender, profileImage, subjects,attendance,  assignedClasses, status} = req.body;

        if (!firstName || !lastName || !email || !password || !phone|| !Address|| !Dateofbirth|| !gender|| !subjects||!attendance||!assignedClasses) {
            return res
              .status(400)
              .json({ error: "Please provide all neccessary information" });
          }


          if (ProfilePic) {
            try {
              const uploadResponse = await Cloundinary.uploader.upload(ProfilePic, {
                folder: "profile_school_managment_system",
                upload_preset: "upload",
              });
      
              const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { ProfilePic: uploadResponse.secure_url },
                { new: true }
              );
      
              if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
              }
      
              return res.status(200).json({
                message: "Profile updated successfully",
                updatedUser,
              });
            } catch (cloudinaryError) {
              console.error("Cloudinary upload failed:", cloudinaryError);
              return res.status(500).json({
                message: "Image upload failed",
                error: cloudinaryError.message,
              });
            }
          } 



          const newTeacher = new Teacher({
            firstName,
            lastName,
            email,
            phone,
            Address,
            Dateofbirth,
            gender, 
            profileImage,
             subjects,
             attendance, 
              assignedClasses, 
              status
           
          });

        await newTeacher.save();
          
      
          res.status(201).json({
            message: "Teacher profile created successfully",
          });



    } catch (error) {
    console.error("Error during creating teacher profile:", error.message);
    res.status(400).json({ error: "Error during creating teacher profile: " + error.message });
    }
}


module.exports.getTeacher=async(req,res)=>{
    try{
        const teachers=await Teacher.find()
        .populate('subjects')
        .populate('attendance')
        .populate('assignedClasses');

        res.status(200).json(teachers);

    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


module.exports.getTeacherById=async(req,res)=>{
    const {TeacherId}=req.params;
    try{
        const teacher=await Teacher.findById(TeacherId)
        .populate('subjects')
        .populate('attendance')
        .populate('assignedClasses');

        if (!teacher){
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.status(200).json(teacher);


    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
module.exports.updateTeacher=async(req,res)=>{

    try{
        const {TeacherId}=req.params;
        const {updateData}=req.body;


        const updatedTeacher=await Teacher.findByIdAndUpdate(TeacherId,updateData,{new: true})

       if(!updatedTeacher){
        
        return res.status(404).json({ error: 'Teacher not found' });

       }

      res.status(200).json(updatedTeacher);


    }
    catch(error){
        res.status(400).json({ error: error.message });

    }
}


module.exports.deleteTeacher=async(req,res)=>{
    try{
        const {TeacherId}=req.params;
        const deletedTeacher=await Teacher.findByIdAndDelete(TeacherId)
            if (!deletedTeacher) {
                return res.status(404).json({ error: 'Teacher not found' });
              }
        res.status(200).json({ message: 'Teacher deleted successfully' });

    
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

