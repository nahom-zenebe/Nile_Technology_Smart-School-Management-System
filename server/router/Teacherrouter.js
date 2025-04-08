const express=require("express")
const router=express.Router()
const {createTeacherprofile}=require('../controller/TeacherController')


router.post("/TeacherProfile",createTeacherprofile)






module.exports=router