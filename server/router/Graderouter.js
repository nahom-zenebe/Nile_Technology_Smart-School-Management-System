const express=require("express")
const router=express.Router()
const {createGrade,getallGrade,getGradeById,updateGrade ,deleteGrade}=require('../controller/Gradecontroller')


router.post("/createGrade",createGrade)
router.get('/getallGrader',getallGrade);
router.get('/getGrader/:GraderId',getGradeById);
router.put('/updateGrader/:GraderId', updateGrade);
router.delete('/deleteGrader/:GraderId', deleteGrade);





module.exports=router