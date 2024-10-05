const mongoose = require('mongoose');

// Schema for permanent attendance report
const attendanceReportSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Employee reference
  reports: [{
    date: { type: Date, required: true },  // Date for the attendance
    status: { type: String, enum: ['Present', 'Absent', 'Special Date', 'Server Down'], required: true }, // Attendance status
    entryTime: { type: Date, default: null }, // Entry time
    exitTime: { type: Date, default: null },  // Exit time
  }],
});

const AttendanceReport = mongoose.model('AttendanceReport', attendanceReportSchema);

module.exports = AttendanceReport;
