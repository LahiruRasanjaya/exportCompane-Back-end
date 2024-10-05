// routes/attendanceReportRoutes.js
const express = require('express');
const attendanceReportController = require('../controllers/attendanceReportController');

const router = express.Router();

// Create a new attendance report
router.post('/', attendanceReportController.createAttendanceReport);

// Get all attendance reports
router.get('/', attendanceReportController.getAllAttendanceReports);

// Get an attendance report by ID
router.get('/:id', attendanceReportController.getAttendanceReportById);

// Update an attendance report by ID
router.put('/:id', attendanceReportController.updateAttendanceReport);

// Delete an attendance report by ID
router.delete('/:id', attendanceReportController.deleteAttendanceReport);

// Get attendance reports for an employee filtered by date range
router.get('/employee/:employeeId', attendanceReportController.getAttendanceReportByDateRange);

// Delete attendance reports for an employee in a date range
router.delete('/employee/:employeeId', attendanceReportController.deleteAttendanceReportByDateRange);


module.exports = router;
