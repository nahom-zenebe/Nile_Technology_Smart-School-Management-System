const Grade=require("../model/Grade")



module.exports.createGrade=async(req,res)=>{

try{

    const { studentId, subjectId, teacherId, grade, examType,date}=req.body;


    if ( !studentId|| !subjectId||! teacherId||! grade||!examType,date) {
        return res
          .status(400)
          .json({ error: "Please provide all neccessary information" });
      }
      const newGrade = new Grade({
        studentId, 
        subjectId, 
        teacherId, 
        grade, 
        examType,date
       
      });

    await newGrade.save();
      
  
      res.status(201).json({
        message: "Grade created successfully",
      });


}
catch(error){
    console.error("Error during creating Grade:", error.message);
    res.status(400).json({ error: "Error during Grade: " + error.message });
}

}

module.exports.getallGrade=async(req,res)=>{
    try{
      const grades=await Grade.find()
      .populate('studentId')
      .populate('subjectId')
      .populate('teacherId');
      res.status(200).json(grades);

    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}


module.exports.getGradeById = async (req, res) => {
    try {
        const {GraderId}=req.params;
      const grade = await Grade.findById(GraderId)
        .populate('studentId')
        .populate('subjectId')
        .populate('teacherId');
  
      if (!grade) return res.status(404).json({ message: 'Grade not found' });
  
      res.status(200).json(grade);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  module.exports.updateGrade = async (req, res) => {
    try {
        const {GraderId}=req.params;
        const {updatedData}=req.body
      const updatedGrade = await Grade.findByIdAndUpdate(GraderId, updatedData, { new: true });
  
      if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' });
  
      res.status(200).json(updatedGrade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
 
  module.exports.deleteGrade = async (req, res) => {


    try {

        const {GraderId}=req.params;
      const deletedGrade = await Grade.findByIdAndDelete(GraderId);
  
      if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });
  
      res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

