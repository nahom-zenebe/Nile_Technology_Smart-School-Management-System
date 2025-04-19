const jwt = require('jsonwebtoken');

require('dotenv').config();


const generateToken = async (user, res) => {
  try {
    
    if (!process.env.SecretKey) {
      throw new Error("Secret key is not defined in the environment variables.");
    }

    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SecretKey,
      { expiresIn: '7d' }
    );

    
    res.cookie("Schoolmanagmentsystem", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true, 
      sameSite: "strict", 
      secure: process.env.NODE_ENV !== "development", 
    });

    return token; 
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token");
  }
};
module.exports=generateToken;