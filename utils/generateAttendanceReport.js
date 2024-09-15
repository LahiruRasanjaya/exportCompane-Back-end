
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const Employee = require('../models/Employee');
const Attendance = require('../models/EmployeeAttendance');

const generateAttendanceReport = async () => {
  try {
    const reportsDir = path.join(__dirname, '../reports');

    // Ensure the reports directory exists
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const filePath = path.join(reportsDir, 'Attendance_Report.xlsx');
    const workbook = new ExcelJS.Workbook();

    // Load the workbook if it exists
    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Set 'today' to the start of the previous day
    today.setDate(today.getDate());
    const dateString = today.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format


    // Create or access the sheet for the current date
    let worksheet = workbook.getWorksheet(dateString);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(dateString);

      // Define columns for the sheet
      worksheet.columns = [
        { header: 'Employee ID', key: 'employeeId', width: 15 },
        { header: 'Employee Name', key: 'employeeName', width: 30 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Entry Time', key: 'entryTime', width: 15 },
        { header: 'Exit Time', key: 'exitTime', width: 15 },
        { header: 'Working Hours', key: 'workingHours', width: 15 },
        { header: 'OT Hours', key: 'OTHours', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Special Date', key: 'specialDate', width: 15 }
      ];
    }

    // Fetch all employees
    const employees = await Employee.find();

    // Fetch attendance records for the current day
    const attendances = await Attendance.find({ date: { $gte: today -1 } }).populate('employee');

    // Create a map to quickly look up attendance by employee ID
    const attendanceMap = {};
    
    attendances.forEach((attendance) => {
      attendanceMap[attendance.employee._id.toString()] = attendance;
    });

    // Add rows to the worksheet, ordered by employee ID
    employees.sort((a, b) => a.employeeId.localeCompare(b.employeeId)).forEach((employee) => {
      const attendance = attendanceMap[employee._id.toString()] || {};
      //console.log(attendance)

      worksheet.addRow({
        employeeId: employee.employeeId,
        employeeName: `${employee.firstName} ${employee.secondName}`,
        date: dateString,
        entryTime: attendance.entryTime ? attendance.entryTime.toISOString().split('T')[1] : 'Absent',
        exitTime: attendance.exitTime ? attendance.exitTime.toISOString().split('T')[1] : 'Absent',
        workingHours: attendance.workingHours || 0,
        OTHours: attendance.OTHours || 0,
        status: attendance.status || 'Absent',
        specialDate: attendance.specialDate ? 'Yes' : 'No',
      });
    });

    // Save the Excel file
    await workbook.xlsx.writeFile(filePath);

    console.log(`Attendance report updated with new sheet: ${dateString}`);
  } catch (error) {
    console.error('Error generating attendance report:', error);
  }
};

module.exports = generateAttendanceReport;
