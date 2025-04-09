const Notification = require('../model/Notificationmodel');


module.exports.createNotification = async (req, res) => {
  try {

    const { title,message,date,targetUsers, targetUsersModel,status} = req.body;

    if (!title||!message||!date||!targetUsers||! targetUsersModel||!status) {
        return res
          .status(400)
          .json({ error: "Please provide all neccessary information" });
      }



    const notification = new Notification({
        title,
        message,
        date,
        targetUsers,
         targetUsersModel,
         status
    });

    const savedNotification = await notification.save();


    res.status(201).json(savedNotification);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports.getallNoitification = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate({
        path: 'targetUsers',
        model: doc => doc.targetUsersModel
      });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getNotificationById = async (req, res) => {
  try {
    const {notificationId}=req.params;
    const notification = await Notification.findById(notificationId)
      .populate({
        path: 'targetUsers',
        model: doc => doc.targetUsersModel
      });

    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.updateNotification = async (req, res) => {
  try {
    const {notificationId}=req.params;
    const {updateNotification}=req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
       notificationId,
       updateNotification,
      { new: true }
    );

    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports.deleteNotification = async (req, res) => {
  try {

    const {notificationId}=req.params;


    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) return res.status(404).json({ message: 'Notification not found' });

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
