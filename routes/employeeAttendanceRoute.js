// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/employeeAttendanceController');

// CRUD operations for attendance records
router.get('/', attendanceController.getAllAttendance);          // Get all attendance records
router.get('/:id', attendanceController.getAttendanceById);      // Get a specific attendance record by ID
router.post('/', attendanceController.createAttendance);         // Create a new attendance record
router.put('/:id', attendanceController.updateAttendance);       // Update an existing attendance record
router.delete('/:id', attendanceController.deleteAttendance);    // Delete an attendance record

module.exports = router;
