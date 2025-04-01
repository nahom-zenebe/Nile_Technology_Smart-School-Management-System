const User=require('../model/Usermodel')
const bcrypt = require("bcryptjs");
const generateToken=require('../lib/Tokengenerator')
const Cloundinary=require('../lib/Cloundinary') 




module.exports.signup = async (req, res) => {
  try {
    const { firstName,lastName, email, password,role } = req.body;

    if(!firstName||!lastName||! email||!password||!role){
        return res.status(400).json({ error: "Please provide all neccessary information" });
    }

    const duplicatedUser = await User.findOne({ email });
    if (duplicatedUser) {
      return res.status(400).json({ error: "User already exists" });
    }


    const hashedpassword = await bcrypt.hash(password, 10);





    const newUser = new User({
     firstName,
     lastName,
      email,
      password: hashedpassword,
      ProfilePic:"",
      role,
    });


    const savedUser = await newUser.save();
    const token = await generateToken(savedUser, res);

   
   


    res.status(201).json({
      message: "Signup successful",
      savedUser: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
        ProfilePic: savedUser.ProfilePic,
        token,
       
      },
    });

   


  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(400).json({ error: "Error during signup: " + error.message });
  }
};



module.exports.login=async(req,res)=>{
    try {
        
      const {email,password}=req.body;

     const duplicatedUser=await User.findOne({email})

     if(!duplicatedUser){

   return res.status(400).json({error:"No user found"})
     }


     const hasedpassword=await bcrypt.compare(password,duplicatedUser.password)


      if(!hasedpassword){
            return res.status(400).json({message:'Invalid credentials'})
        }

        const token=await generateToken(duplicatedUser,res)




   return res.status(201).json({
    message:"login successfully",
    user:{
        id:duplicatedUser.id,
        firstName:duplicatedUser.firstName,
        lastName:duplicatedUser.lastName,
        email:duplicatedUser.email,
        role:duplicatedUser.role,
        ProfilePic:duplicatedUser.ProfilePic,
        token } })


    } catch (error) {
  res.status(400).json({
    error:"Error in login"
  })

        
    }
}

module.exports.logout=async(req,res)=>{
  try {
     res.cookie("Schoolmanagmentsystem",'',{maxAge:0})
       res.status(200).json({message:"Logged out successfully"})

  } catch (error) {
     res.status(500).json({
      message: 'An error occurred during logout. Please try again.',
      error: error.message,
    });
    
  }
}


module.exports.updateProfile = async (req, res) => {
  try {
    const { ProfilePic } = req.body;
    const userId = req.user?._id;


    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
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
          updatedUser
        });
        

      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed:", cloudinaryError);
        return res.status(500).json({ message: "Image upload failed", error: cloudinaryError.message });
      }
    } else {
      return res.status(400).json({ message: "No profile picture provided" });
    }
  } catch (error) {
    console.error("Error in update profile Controller", error.message);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

