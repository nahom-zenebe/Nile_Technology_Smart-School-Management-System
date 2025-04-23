const express=require("express")
const router=express.Router()
const {createNotification,getallNoitification,getNotificationById,updateNotification,deleteNotification }=require('../controller/Notificationcontroller')


router.post("/createNotification",createNotification)
router.get('/getallNotification', getallNoitification);
router.get('/getNotification/:NotificationId',getNotificationById);
router.put('/updateNotification/:NotificationId', updateNotification);
router.delete('/deleteNotification/:NotificationId',deleteNotification);





module.exports=router