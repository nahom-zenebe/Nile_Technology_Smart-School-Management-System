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
