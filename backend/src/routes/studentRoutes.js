const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);

module.exports = router;
