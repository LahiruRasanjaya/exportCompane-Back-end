
const DailyAttendance = require('../models/EmployeeAttendance'); // Daily attendance
const AttendanceReport = require('../models/AttendanceReport'); // Permanent report schema

const updateAttendanceReport = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day

  try {
    // Fetch attendance records from the past until today
    const attendances = await DailyAttendance.find({ date: { $lte: today } }).populate('employee');

    // Loop through each attendance record
    for (const attendance of attendances) {
      const employeeId = attendance.employee._id;
      const attendanceDate = new Date(attendance.date);
      const daysDifference = Math.floor((today - attendanceDate) / (1000 * 60 * 60 * 24));

      // Find or create the report for the employee
      let report = await AttendanceReport.findOne({ employee: employeeId });
      if (!report) {
        report = new AttendanceReport({ employee: employeeId, reports: [] });
      }

      // Loop through the range of days between the attendance date and today
      for (let i = 0; i < daysDifference; i++) {
        const dateToRecord = new Date(attendanceDate);
        dateToRecord.setDate(attendanceDate.getDate() + i);

        // If it's the same day as attendance, use the actual attendance data
        if (i === 0) {
          report.reports.push({
            date: attendance.date,
            status: attendance.status,
            entryTime: attendance.entryTime,
            exitTime: attendance.exitTime,
          });
        } else {
          // For subsequent days, mark as "Server Down"
          report.reports.push({
            date: dateToRecord,
            status: 'Server Down', // Indicate the server was down
            entryTime: null,
            exitTime: null,
          });
        }
      }

      // Save the updated permanent report
      await report.save();
    }

    // Optionally clear the daily records
    // await DailyAttendance.deleteMany({ date: { $lt: today } });

    console.log('Attendance report updated with historical data and server downtime.');
  } catch (error) {
    console.error('Error updating attendance report:', error);
  }
};

module.exports = updateAttendanceReport;

