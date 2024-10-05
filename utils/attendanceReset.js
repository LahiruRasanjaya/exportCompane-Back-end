
// const cron = require('node-cron');
// const Attendance = require('../models/EmployeeAttendance'); // Adjust the path to your Attendance model
// const generateAttendanceReport = require('./generateAttendanceReport');
// const updateAttendanceReport = require('./updateAttendanceReport');

// // Function to delete attendance records where the date is not today
// const deleteOldAttendanceRecords = async () => {
//   try {

//     await generateAttendanceReport();
//     await updateAttendanceReport();
//     // Get today's date (midnight)
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Delete all attendance records where the date is not today
//     const result = await Attendance.deleteMany({ date: { $ne: today } });

//     console.log(`${result.deletedCount} old attendance records deleted.`);
//   } catch (error) {
//     console.error('Error deleting old attendance records:', error);
//   }
// };

// // Schedule the cron job to run at midnight (00:00) every day
// cron.schedule('0 0 * * *', deleteOldAttendanceRecords);

// module.exports = { deleteOldAttendanceRecords };

const cron = require('node-cron');
const Attendance = require('../models/EmployeeAttendance'); // Adjust the path to your Attendance model
const generateAttendanceReport = require('./generateAttendanceReport');
const updateAttendanceReport = require('./updateAttendanceReport');

// Function to delete attendance records where the date is not today
const deleteOldAttendanceRecords = async () => {
  try {
    // Calculate yesterday's date (or any other date you want the report for)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const reportDateString = yesterday.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Call the generateAttendanceReport with the reportDateString
    await generateAttendanceReport(reportDateString);

    // Call any other necessary functions, such as updateAttendanceReport
    await updateAttendanceReport();

    // Get today's date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Delete all attendance records where the date is not today
    const result = await Attendance.deleteMany({ date: { $ne: today } });

    console.log(`${result.deletedCount} old attendance records deleted.`);
  } catch (error) {
    console.error('Error deleting old attendance records:', error);
  }
};

// Schedule the cron job to run at midnight (00:00) every day
cron.schedule('0 0 * * *', deleteOldAttendanceRecords);

module.exports = { deleteOldAttendanceRecords };
