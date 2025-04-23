const express = require('express');
const router = express.Router();
const {createFee,getAllFees,getFeeById,updateFee,deleteFee} = require('../controller/Feecontroller');

router.post('/CreateFee',createFee);
router.get('/getallFee', getAllFees);
router.get('/:Feeid', getFeeById);
router.put('/updatefee/:Feeid', updateFee);
router.delete('/deletefee/:Feeid', deleteFee);

module.exports = router;
