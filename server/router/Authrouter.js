const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout}=require('../controller/Authcontroller')
const {authmiddleware,Adminmiddleware,Managermiddleware,Teachermiddleware,Studentmiddleware}=require("../middleware/Authmiddleware")



router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateProfile",authmiddleware,updateProfile)







module.exports=router