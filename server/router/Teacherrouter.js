const express=require("express")
const router=express.Router()
const {createTeacherprofile,getTeacher,searchTeacher,getTeacherById,updateTeacher,deleteTeacher}=require('../controller/TeacherController')


router.post("/TeacherProfile",createTeacherprofile)
router.get('/getallTeacher', getTeacher);
router.get('/getTeacher/:TeacherId', getTeacherById);
router.put('/updateTeacher/:TeacherId', updateTeacher);
router.delete('/deleteTeacher/:TeacherId', deleteTeacher);
router.get('/searchTeacher',searchTeacher)




module.exports=router