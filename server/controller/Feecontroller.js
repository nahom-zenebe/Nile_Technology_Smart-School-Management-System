const Fee = require('../model/Feemodel');


module.exports.createFee = async (req, res) => {
  try {


    const { studentId,amount, dueDate, paidStatus,  paymentDate,paymentMethod}=req.body;


    if ( !studentId||!amount|| !dueDate||! paidStatus||!  paymentDate||!paymentMethod) {
        return res
          .status(400)
          .json({ error: "Please provide all neccessary information" });
      }
      

    const fee = new Fee({
        studentId,
        amount, dueDate,
         paidStatus, 
          paymentDate,
          paymentMethod, 
          
    });
    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('studentID');
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports.getFeeById = async (req, res) => {
  try {
    const {Feeid}=req.params;
    const fee = await Fee.findById(Feeid).populate('studentID');
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateFee = async (req, res) => {
  try {
    const {Feeid}=req.params;
    const {updatedData}=req.body;


    const updated = await Fee.findByIdAndUpdate(Feeid, updatedData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Fee not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.deleteFee = async (req, res) => {
  try {
    const {Feeid}=req.params;
    const deleted = await Fee.findByIdAndDelete(Feeid);
    if (!deleted) return res.status(404).json({ message: 'Fee not found' });
    res.json({ message: 'Fee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
