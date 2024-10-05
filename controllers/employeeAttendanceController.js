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

// // Create a new attendance record
// exports.createAttendance = async (req, res) => {
//   const { employee, date, entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

//   try {
//     const existEemployee = await Employee.findById(employee);
//     if (!existEemployee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     let workingHours = 0;
//     let OTHours = 0;

//     if (entryTime && exitTime) {
//       const entry = new Date(entryTime);
//       const exit = new Date(exitTime);
//       workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
//       OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
//     }

//     const attendance = new Attendance({
//       employee: employee,
//       date,
//       entryTime,
//       exitTime,
//       workingHours,
//       OTHours,
//       status: status || (entryTime && exitTime ? 'Present' : 'Absent'),
//       specialDate,
//       entryTimeMarked,
//       exitTimeMarked
//     });

//     await attendance.save();
//     res.status(201).json(attendance);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating attendance record', error });
//   }
// };

// // Update an attendance record
// exports.updateAttendance = async (req, res) => {
//   const { id } = req.params;
//   const { entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

//   try {
//     const attendance = await Attendance.findById(id);
//     if (!attendance) {
//       return res.status(404).json({ message: 'Attendance record not found' });
//     }

//     let workingHours = 0;
//     let OTHours = 0;

//     if (entryTime && exitTime) {
//       const entry = new Date(entryTime);
//       const exit = new Date(exitTime);
//       workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
//       OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
//     }

//     attendance.entryTime = entryTime || attendance.entryTime;
//     attendance.exitTime = exitTime || attendance.exitTime;
//     attendance.workingHours = workingHours;
//     attendance.OTHours = OTHours;
//     attendance.status = status || (entryTime && exitTime ? 'Present' : 'Absent');
//     attendance.specialDate = specialDate || attendance.specialDate;
//     attendance.entryTimeMarked = entryTimeMarked || attendance.entryTimeMarked;
//     attendance.exitTimeMarked = exitTimeMarked || attendance.exitTimeMarked;

//     await attendance.save();
//     res.status(200).json(attendance);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating attendance record', error });
//   }
// };

//---------------------------------------2

// // Create a new attendance record
// exports.createAttendance = async (req, res) => {
//   const { employee, date, entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

//   try {
//     const existEmployee = await Employee.findById(employee);

//     if (!existEmployee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     let workingHours = 0;
//     let OTHours = 0;

//     if (entryTime && exitTime) {
//       const entry = new Date(entryTime);
//       const exit = new Date(exitTime);
//       workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
//       OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
//     }

//     // Update OTHrs for the employee
//     existEmployee.OTHrs = (existEmployee.OTHrs || 0) + OTHours;

//     // If total OTHrs equals or exceeds 50, add 50 to salaryRate
//     if (existEmployee.OTHrs >= 50) {
//       existEmployee.salaryRate += 50;
//     }

//     // Calculate monthPayment
//     existEmployee.monthPayment = existEmployee.workingDays * existEmployee.salaryRate;

//     const attendance = new Attendance({
//       employee: employee,
//       date,
//       entryTime,
//       exitTime,
//       workingHours,
//       OTHours,
//       status: status || (entryTime && exitTime ? 'Present' : 'Absent'),
//       specialDate,
//       entryTimeMarked,
//       exitTimeMarked
//     });

//     // Adjust workingDays based on status
//     if (attendance.status === 'Present') {
//       existEmployee.workingDays += 1;
//     } 

//     await attendance.save();
//     await existEmployee.save(); // Save employee updates

//     res.status(201).json(attendance);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating attendance record', error });
//   }
// };

// // Update an attendance record
// exports.updateAttendance = async (req, res) => {
//   const { id } = req.params;
//   const { entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

//   try {
//     const attendance = await Attendance.findById(id);
//     if (!attendance) {
//       return res.status(404).json({ message: 'Attendance record not found' });
//     }

//     const existEmployee = await Employee.findById(attendance.employee);

   

//     let workingHours = 0;
//     let OTHours = 0;

//     if (entryTime && exitTime) {
//       const entry = new Date(entryTime);
//       const exit = new Date(exitTime);
//       workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
//       OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
//     }

//     console.log(existEmployee)
//     console.log("_________________________________________")
//     console.log(existEmployee.OTHrs)
//     // Update OTHrs for the employee
//     existEmployee.OTHrs = (existEmployee.OTHrs || 0) + OTHours;
//     console.log(existEmployee.OTHrs)

//     // If total OTHrs equals or exceeds 50, add 50 to salaryRate
//     // Check if OTHrs reached 50 and salary adjustment hasn't been applied
//     if (existEmployee.OTHrs >= 50 && !existEmployee.hasReceivedOTSalaryIncrease) {
//       existEmployee.salaryRate += 50;
//       existEmployee.hasReceivedOTSalaryIncrease = true; // Set to true after increase
//     }

//     // Calculate monthPayment
//     existEmployee.monthPayment = existEmployee.workingDays * existEmployee.salaryRate;

//     const previousStatus = attendance.status;
//     const previousDate = attendance.date.toISOString().split('T')[0];
//     const currentDate = new Date().toISOString().split('T')[0];

//     // Update attendance record
//     attendance.entryTime = entryTime || attendance.entryTime;
//     attendance.exitTime = exitTime || attendance.exitTime;
//     attendance.workingHours = workingHours;
//     attendance.OTHours = OTHours;
//     attendance.status = status || (entryTime && exitTime ? 'Present' : 'Absent');
//     attendance.specialDate = specialDate || attendance.specialDate;
//     attendance.entryTimeMarked = entryTimeMarked || attendance.entryTimeMarked;
//     attendance.exitTimeMarked = exitTimeMarked || attendance.exitTimeMarked;

//     // Update workingDays based on status change
//     if (currentDate === previousDate) {
//       if (attendance.status === 'Present' && previousStatus === 'Absent') {
//         existEmployee.workingDays += 1; // Increment if changing from Absent to Present
//       } else if (attendance.status === 'Absent' && previousStatus === 'Present') {
//         existEmployee.workingDays = Math.max(existEmployee.workingDays - 1, 0); // Decrement if changing from Present to Absent
//       }
//     }

//     await attendance.save();
//     await existEmployee.save(); // Save employee updates

//     res.status(200).json(attendance);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating attendance record', error });
//   }
// };

//3------------------------------------------------------

exports.createAttendance = async (req, res) => {
  const { employee, date, entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

  try {
    const existEmployee = await Employee.findById(employee);

    if (!existEmployee) {
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

    // Update OTHrs for the employee
    existEmployee.OTHrs = (existEmployee.OTHrs || 0) + OTHours;

    // If total OTHrs equals or exceeds 50, add 50 to salaryRate
    if (existEmployee.OTHrs >= 50 && !existEmployee.hasReceivedOTSalaryIncrease) {
      existEmployee.salaryRate += 50;
      existEmployee.hasReceivedOTSalaryIncrease = true; // Set to true after increase
    }

    // Update workingDays and calculate monthPayment
    existEmployee.workingDays += (status === 'Present' ? 1 : 0);
    existEmployee.monthPayment = existEmployee.workingDays * existEmployee.salaryRate;

    // Update attendanceAllowance1 based on workingDays and otId
    if (existEmployee.workingDays === 22) {
      if (existEmployee.otId === 'JT001' || existEmployee.otId === 'JT002') {
        existEmployee.attendanceAllowance1 = (existEmployee.otId === 'JT001') ? 5000 : 5000; // JT001 and JT002 both get 5000 at 22 days
      }
    } else if (existEmployee.workingDays === 25) {
      if (existEmployee.otId === 'JT001') {
        existEmployee.attendanceAllowance1 = 12500; // JT001 gets 12500 at 25 days
      } else if (existEmployee.otId === 'JT002') {
        existEmployee.attendanceAllowance1 = 7500; // JT002 gets 7500 at 25 days
      }
    }

    const attendance = new Attendance({
      employee: employee,
      date,
      entryTime,
      exitTime,
      workingHours,
      OTHours,
      status: status || (entryTime && exitTime ? 'Present' : 'Absent'),
      specialDate,
      entryTimeMarked,
      exitTimeMarked
    });

    await attendance.save();
    await existEmployee.save(); // Save employee updates

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance record', error });
  }
};

exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { entryTime, exitTime, status, specialDate, entryTimeMarked, exitTimeMarked } = req.body;

  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    const existEmployee = await Employee.findById(attendance.employee);

    let workingHours = 0;
    let OTHours = 0;

    if (entryTime && exitTime) {
      const entry = new Date(entryTime);
      const exit = new Date(exitTime);
      workingHours = (exit - entry) / (1000 * 60 * 60); // Convert milliseconds to hours
      OTHours = workingHours > 8 ? workingHours - 8 : 0; // Calculate OT hours if more than 8 hours
    }

    // Update OTHrs for the employee
    existEmployee.OTHrs = (existEmployee.OTHrs || 0) + OTHours;

    // Check if OTHrs reached 50 and salary adjustment hasn't been applied
    if (existEmployee.OTHrs >= 50 && !existEmployee.hasReceivedOTSalaryIncrease) {
      existEmployee.salaryRate += 50;
      existEmployee.hasReceivedOTSalaryIncrease = true; // Set to true after increase
    }

    const previousStatus = attendance.status;
    const previousDate = attendance.date.toISOString().split('T')[0];
    const currentDate = new Date().toISOString().split('T')[0];

    // Update attendance record
    attendance.entryTime = entryTime || attendance.entryTime;
    attendance.exitTime = exitTime || attendance.exitTime;
    attendance.workingHours = workingHours;
    attendance.OTHours = OTHours;
    attendance.status = status || (entryTime && exitTime ? 'Present' : 'Absent');
    attendance.specialDate = specialDate || attendance.specialDate;
    attendance.entryTimeMarked = entryTimeMarked || attendance.entryTimeMarked;
    attendance.exitTimeMarked = exitTimeMarked || attendance.exitTimeMarked;

    // Update workingDays based on status change
    if (currentDate === previousDate) {
      if (attendance.status === 'Present' && previousStatus === 'Absent') {
        existEmployee.workingDays += 1; // Increment if changing from Absent to Present
      } else if (attendance.status === 'Absent' && previousStatus === 'Present') {
        existEmployee.workingDays = Math.max(existEmployee.workingDays - 1, 0); // Decrement if changing from Present to Absent
      }
    }

    // Update attendanceAllowance1 based on workingDays and otId
    if (existEmployee.workingDays === 22) {
      if (existEmployee.otId === 'JT001' || existEmployee.otId === 'JT002') {
        existEmployee.attendanceAllowance1 = (existEmployee.otId === 'JT001') ? 5000 : 5000; // JT001 and JT002 both get 5000 at 22 days
      }
    } else if (existEmployee.workingDays === 25) {
      if (existEmployee.otId === 'JT001') {
        existEmployee.attendanceAllowance1 = 12500; // JT001 gets 12500 at 25 days
      } else if (existEmployee.otId === 'JT002') {
        existEmployee.attendanceAllowance1 = 7500; // JT002 gets 7500 at 25 days
      }
    }

    // Calculate OTRate and OTEarning
    const attendanceAllowance1 = existEmployee.attendanceAllowance1 || 0;
    const OTRate = (existEmployee.salaryRate + 140 + (attendanceAllowance1 / 25)) / 8;
    const OTEarning = OTRate * OTHours;

    existEmployee.OTRate = OTRate;
    existEmployee.OTEarning = OTEarning;

    // Calculate doubleShiftEarning
    existEmployee.doubleShiftEarning = existEmployee.doubleShiftDays * existEmployee.salaryRate;

    console.log(existEmployee.workingDays)
    // Update attendance25 based on workingDays
    if (existEmployee.workingDays === 26) {
      existEmployee.attendance25 = 500;
    } else if (existEmployee.workingDays === 27) {
      existEmployee.attendance25 = 1000;
    } else if (existEmployee.workingDays === 28) {
      existEmployee.attendance25 = 1500;
    } else if (existEmployee.workingDays === 29) {
      existEmployee.attendance25 = 2000;
    } else if (existEmployee.workingDays >= 30 && existEmployee.workingDays <= 31) {
      existEmployee.attendance25 = 2500;
    } else {
      existEmployee.attendance25 = 0; // Reset if workingDays are below 26
    }


    // Calculate grossSalary
    existEmployee.grossSalary = (
      existEmployee.attendanceAllowance1 +
      (existEmployee.attendanceAllowance2 || 0) +
      (existEmployee.riskAllowance1 || 0) +
      (existEmployee.riskAllowance2 || 0) +
      (existEmployee.colomboAllowance || 0) +
      (existEmployee.monthPayment || 0) +
      existEmployee.OTEarning +
      (existEmployee.incomeAllowance || 0) +
      existEmployee.doubleShiftEarning +
      existEmployee.attendance25
    );


    await attendance.save();
    await existEmployee.save(); // Save employee updates

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
