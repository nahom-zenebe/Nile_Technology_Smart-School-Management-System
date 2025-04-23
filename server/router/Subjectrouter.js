const express = require('express');
const router = express.Router();
const subjectController = require('../controller/Subjectcontroller');


router.post('/createSubject', subjectController.createSubject);


router.get('/getallSubject', subjectController.getAllSubjects);


router.get('/getsingleSubject/:id', subjectController.getSubjectById);


router.put('/updateSubject/:id', subjectController.updateSubject);


router.delete('/deleteSubject/:id', subjectController.deleteSubject);

module.exports = router;
