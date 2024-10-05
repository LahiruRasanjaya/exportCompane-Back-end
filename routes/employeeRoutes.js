const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create a new employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Get employee details by ID
router.get('/exist/employees/:id', employeeController.getEmployeeById); 

// Update an employee by ID
router.patch('/employees/att/:employeeId', employeeController.updateAllowance);

// Update an employee by ID
router.put('/employees/:employeeId', employeeController.updateEmployee);



// Find an employee by ID or name
router.get('/employees/find', employeeController.findEmployee); // New route for finding employees

// Delete an employee by ID
router.delete('/employees/:employeeId', employeeController.deleteEmployee);

module.exports = router;
