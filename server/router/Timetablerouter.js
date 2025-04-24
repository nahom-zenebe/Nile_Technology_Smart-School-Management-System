const express=require("express")
const router=express.Router()
const {createTimetable,getAllTimetables,getTimetableById,updateTimetable,deleteTimetable}=require('../controller/TimetableController')


router.post("/createTimetable",createTimetable)
router.get('/getallTimetable', getAllTimetables);
router.get('/getTimetable/:TimetableId', getTimetableById);
router.put('/updateTimetable/:TimetableId', updateTimetable);
router.delete('/deleteTimetable/:TimetableId', deleteTimetable);





module.exports=router