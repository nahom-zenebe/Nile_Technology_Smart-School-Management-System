const Timetable = require('../models/Timetable');


module.exports.createTimetable = async (req, res) => {
  try {
    const {  classId, subjectId,teacherId,startTime,endTime} = req.body;

    if (! classId || !subjectId || !teacherId|| !startTime || !endTime) {
      return res
        .status(400)
        .json({ error: "Please provide all neccessary information" });
    }

    const timetable = new Timetable({
        classId,
         subjectId,
         teacherId,
         startTime,
         endTime
    });


    await timetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate('classID')
      .populate('subjectID')
      .populate('teacherID');
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports.getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate('classID')
      .populate('subjectID')
      .populate('teacherID');
    if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports.updateTimetable = async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Timetable not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.deleteTimetable = async (req, res) => {
  try {
    const deleted = await Timetable.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Timetable not found' });
    res.json({ message: 'Timetable deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};