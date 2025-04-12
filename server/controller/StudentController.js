const User = require("../model/Usermodel");
const Grade = require("../model/Grade");

exports.UpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, password, profilePic } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (profilePic) user.ProfilePic = profilePic;

    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

exports.DeleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
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

exports.GetAcadamicRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
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
