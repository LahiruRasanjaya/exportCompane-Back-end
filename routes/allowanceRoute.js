const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Update an employee by ID
router.put('/:employeeId', employeeController.updateAllowance);


module.exports = router;
