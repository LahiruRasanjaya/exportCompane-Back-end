// utils/attendanceReset.js
const cron = require('node-cron');
const generateAttendanceReport = require('./generateAttendanceReport');
const Attendance = require('../models/EmployeeAttendance'); // Adjust the path to your Attendance model

const resetAttendanceDaily = async () => {
  try {
    // Step 1: Generate attendance report
    await generateAttendanceReport();

    // Step 2: Proceed with resetting attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all attendance records for the current day
    const attendances = await Attendance.find({ date: { $gte: today -1 } });

    // Update the attendance records for the next day
    for (let attendance of attendances) {
      const updatedDate = new Date();
      updatedDate.setHours(0, 0, 0, 0); // Set the time to 21:00 (9 PM)
      
      attendance.date = updatedDate;// Set the date to today
      attendance.entryTime = null;  // Reset entry time
      attendance.exitTime = null;   // Reset exit time
      attendance.workingHours = 0;  // Reset working hours
      attendance.OTHours = 0;       // Reset OT hours
      attendance.status = 'Absent'; // Reset status to Absent
      attendance.specialDate = false; // Reset special date
      await attendance.save(); // Save the updated record
    }

    console.log('Attendance records reset for the new day.');
  } catch (error) {
    console.error('Error resetting attendance records:', error);
  }
};

// Schedule the cron job to run at midnight (00:00) every day
cron.schedule('0 0 * * *', resetAttendanceDaily);

module.exports = resetAttendanceDaily;

