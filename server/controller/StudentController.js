const Student=require('../model/Studentmodel');
const Grade = require("../model/Grade");



module.exports.UpdateProfile=async(req,res)=>{
  try {
      const userId = req.user?._id;
      const { firstName, lastName, email, phone,Address,Dateofbirth,gender} = req.body;

      if (!firstName || !lastName || !email  ||!Address|| !Dateofbirth|| !gender) {
          return res
            .status(400)
            .json({ error: "Please provide all neccessary information" });
        }


      /*  if (ProfilePic) {
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
        } */



        const newStudent = new Student({
          firstName,
          lastName,
          email,
          phone,
          Address,
          Dateofbirth,
          gender, 
         
           
         
        });

      await newStudent.save();
        
    
        res.status(201).json({
          message: "Student profile created successfully",
        });



  } catch (error) {
  console.error("Error during creating Student profile:", error.message);
  res.status(400).json({ error: "Error during creating Student profile: " + error.message });
  }
}


exports.DeleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteStudent = await Student.findByIdAndDelete(userId);
    if (!deleteStudent) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

module.exports.getallStudents=async(req,res)=>{
  try {
    const allStudents = await Student.find()
    res.json(allStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.GetAcadamicRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    const  Studentinfo = await  Student.findById(userId);
    if (! Studentinfo) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const grades = await Grade.find({ userId });
    if (grades.length === 0) {
      return res.status(404).json({
        message: "No academic records found",
      });
    }

    res.status(200).json({
      academicRecords: grades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
