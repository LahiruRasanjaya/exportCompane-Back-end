const AttendanceReport = require('../models/AttendanceReport');
const Employee = require('../models/Employee');

// Create a new attendance report
const createAttendanceReport = async (req, res) => {
  try {
    const { employee, reports } = req.body;
    const newReport = new AttendanceReport({ employee, reports });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating attendance report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all attendance reports
const getAllAttendanceReports = async (req, res) => {
  try {
    const reports = await AttendanceReport.find().populate('employee');
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching attendance reports:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get attendance report by ID
const getAttendanceReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AttendanceReport.findById(id).populate('employee');
    if (!report) {
      return res.status(404).json({ message: 'Attendance report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching attendance report by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAttendanceReport = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Find the existing attendance report
      const report = await AttendanceReport.findById(id).populate('employee');
      if (!report) {
        return res.status(404).json({ message: 'Attendance report not found' });
      }
  
      // Calculate changes based on the new status
      const previousStatus = report.status;
      const employee = report.employee;
  
      if (updatedData.status === 'Present') {
        if (previousStatus !== 'Present') {
          // Update working days for Present status
          employee.workingDays += 1;
        }
      } else if (updatedData.status === 'Absent') {
        if (previousStatus === 'Present') {
          // Update working days for Absent status
          employee.workingDays -= 1;
        }
      }
  
      // Calculate overtime if entryTime and exitTime are provided
      if (updatedData.entryTime && updatedData.exitTime) {
        const entryTime = new Date(updatedData.entryTime);
        const exitTime = new Date(updatedData.exitTime);
        const workingHours = (exitTime - entryTime) / (1000 * 60 * 60); // Convert to hours
  
        if (workingHours > 8) {
          employee.OTHrs += (workingHours - 8); // Assuming only hours over 8 are counted as OT
        }
      }
  
      // Update the attendance report with the new data
      const updatedReport = await AttendanceReport.findByIdAndUpdate(id, updatedData, { new: true });
  
      // Save the employee updates
      await employee.save();
  
      res.status(200).json({ updatedReport, employee });
    } catch (error) {
      console.error('Error updating attendance report:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Delete attendance report by ID
const deleteAttendanceReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AttendanceReport.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ message: 'Attendance report not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting attendance report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAttendanceReportByDateRange = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { startDate, endDate } = req.query;

    // Convert start and end dates to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find attendance reports for the specified employee within the date range
    const report = await AttendanceReport.findOne({ employee: employeeId })
      .populate('employee')
      .select({
        reports: {
          $elemMatch: {
            date: { $gte: start, $lte: end } // Query for reports within date range
          }
        }
      });

    if (!report || report.reports.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this period' });
    }

    res.status(200).json(report.reports);
  } catch (error) {
    console.error('Error fetching attendance report by date range:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAttendanceReportByDateRange = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { startDate, endDate } = req.query;

    // Convert start and end dates to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If start and end date are the same, we delete only that specific date's report
    if (start.getTime() === end.getTime()) {
      // Find the attendance report and remove the report for the specific date
      const report = await AttendanceReport.findOneAndUpdate(
        { employee: employeeId },
        {
          $pull: { reports: { date: start } }, // Remove the report for the specific date
        },
        { new: true }
      );

      if (!report) {
        return res.status(404).json({ message: 'No attendance report found for this date' });
      }
    } else {
      // If the date range is different, delete all reports in that range
      const report = await AttendanceReport.findOneAndUpdate(
        { employee: employeeId },
        {
          $pull: {
            reports: { date: { $gte: start, $lte: end } }, // Remove reports in the date range
          },
        },
        { new: true }
      );

      if (!report || report.reports.length === 0) {
        return res.status(404).json({ message: 'No attendance records found for this period' });
      }
    }

    res.status(200).json({ message: 'Attendance report(s) deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance report by date range:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createAttendanceReport,
  getAllAttendanceReports,
  getAttendanceReportById,
  updateAttendanceReport,
  deleteAttendanceReport,
  getAttendanceReportByDateRange,
  deleteAttendanceReportByDateRange, // Export the new function
};

