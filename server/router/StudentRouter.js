const express = require("express");
const router = express.Router();
const {
  UpdateProfile,
  DeleteProfile,
  GetAcadamicRecords,
  getallStudents

} = require("../controller/StudentController");

const { authmiddleware } = require("../middleware/Authmiddleware");

router.post("/createStudentprofile",UpdateProfile)
router.get("/getallStudentprofile",getallStudents)

router.delete("/profile/:userId", DeleteProfile);

router.get("/academic-records", GetAcadamicRecords);

module.exports = router;
