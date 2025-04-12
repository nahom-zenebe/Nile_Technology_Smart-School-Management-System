const express = require("express");
const router = express.Router();
const {
  UpdateProfile,
  DeleteProfile,
  GetAcadamicRecords,
} = require("../controller/StudentController");

const { authmiddleware } = require("../middleware/Authmiddleware");
router.patch("/profile/:userId", authmiddleware, UpdateProfile);

router.delete("/profile/:userId", authmiddleware, DeleteProfile);

router.get("/academic-records/:userId", authmiddleware, GetAcadamicRecords);

module.exports = router;
