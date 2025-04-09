const express=require("express")
const router=express.Router()
const {createAttendance , getAllAttendance ,getAttendanceById,updateAttendance ,deleteAttendance }=require('../controller/Attendancecontroller')


router.post("/createAttendance",createAttendance)
router.get('/getallAttendance', getAllAttendance);
router.get('/getAttendance/:AttendanceId',getAttendanceById);
router.put('/updateAttendance/:AttendanceId', updateAttendance);
router.delete('/deleteAttendance/:AttendanceId',deleteAttendance);





module.exports=router