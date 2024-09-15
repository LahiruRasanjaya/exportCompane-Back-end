// controllers/attendanceController.js
const Attendance = require('../models/EmployeeAttendance');
const Employee = require('../models/Employee');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('employee');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance records', error });
  }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate('employee');
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance record', error });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  const { employee, date, entryTime, exitTime, status } = req.body;

  try {
    const existEemployee = await Employee.findById(employee);
    if (!existEemployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    let workingHours = 0;
    let OTHours = 0;

    if (entryTime && exitTime) {
      const entry = new Date(entryTime);
      const exit = new Date(exitTime);
      workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
      OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
    }

    const attendance = new Attendance({
      employee: employee,
      date,
      entryTime,
      exitTime,
      workingHours,
      OTHours,
      status: status || (entryTime && exitTime ? 'Present' : 'Absent')
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance record', error });
  }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { entryTime, exitTime, status } = req.body;

  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    let workingHours = 0;
    let OTHours = 0;

    if (entryTime && exitTime) {
      const entry = new Date(entryTime);
      const exit = new Date(exitTime);
      workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
      OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
    }

    attendance.entryTime = entryTime || attendance.entryTime;
    attendance.exitTime = exitTime || attendance.exitTime;
    attendance.workingHours = workingHours;
    attendance.OTHours = OTHours;
    attendance.status = status || (entryTime && exitTime ? 'Present' : 'Absent');

    await attendance.save();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance record', error });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    await Attendance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance record', error });
  }
};
