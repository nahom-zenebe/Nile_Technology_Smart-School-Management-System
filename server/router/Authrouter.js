const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout, ForgotPassword, ResetPassword}=require('../controller/Authcontroller')
const {authmiddleware,Adminmiddleware,Managermiddleware,Teachermiddleware,Studentmiddleware}=require("../middleware/Authmiddleware")



router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateProfile",authmiddleware,updateProfile)

router.post("/forgot-password", ForgotPassword);
router.patch("/reset-password/:token", ResetPassword);





module.exports=router