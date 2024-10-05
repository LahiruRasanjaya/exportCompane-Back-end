const Employee = require('../models/Employee');

// Create a new employee
exports.createEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.getAllEmployees = async (req, res) => {
//   try {
//     // Get current month and year
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     // Get all employees with populated advances and loans
//     const employees = await Employee.find()
//       .populate('foodConsumptionRecords')
//       .populate({
//         path: 'advances',
//         populate: {
//           path: 'employee'
//         }
//       })
//       .populate('loans');

//     // Adjust advances based on the logic
//     for (const employee of employees) {
//       if (employee.advances && employee.advances.length > 0) {
//         for (const advance of employee.advances) {
//           // Extract date and checkMonth
//           const advanceDate = new Date(advance.date);
//           const advanceMonth = advanceDate.getMonth();
//           const advanceYear = advanceDate.getFullYear();

//           let checkMonthDate = advance.checkMonth;
//           let zeroedMonthDate = advance.zeroedMonth;
//           let monthGap = 0;

//           if (!checkMonthDate) {
//             checkMonthDate = advanceDate; // First time, set checkMonth as advanceDate
//           } else {
//             checkMonthDate = new Date(checkMonthDate);
//           }

//           const checkMonth = checkMonthDate.getMonth();
//           const checkYear = checkMonthDate.getFullYear();

//           // If isDeducted is false, don't apply any logic
//           if (!advance.isDeducted) {
//             advance.monthlyDeduction = 0;
//             continue; // Skip to the next advance
//           }

//           // If current month is the same as checkMonth, no change
//           if (currentMonth === checkMonth && currentYear === checkYear) {
//             continue; // Skip to the next advance
//           }

//           // Calculate month gap (difference between current and last check)
//           monthGap = (currentYear - checkYear) * 12 + (currentMonth - checkMonth);

//           // If there's a gap, adjust the remaining amount
//           let isUpdated = false; // Flag to track if an update is needed
//           if (monthGap > 0 && advance.remainingAmount > 0 && advance.isDeducted) {
//             advance.remainingAmount -= (advance.monthlyDeduction * monthGap);

//             // If remainingAmount becomes 0, mark the current month as zeroedMonth
//             if (advance.remainingAmount <= 0) {
//               advance.remainingAmount = 0;
//               advance.zeroedMonth = currentDate; // Mark the month when remainingAmount becomes 0
//             }

//             // Update checkMonth to current date
//             advance.checkMonth = currentDate;
//             isUpdated = true; // Mark that an update is needed
//           }

//           // If remainingAmount is already 0, apply the logic for zeroedMonth
//           if (advance.remainingAmount === 0) {
//             if (zeroedMonthDate) {
//               zeroedMonthDate = new Date(zeroedMonthDate);
//               const zeroedMonth = zeroedMonthDate.getMonth();
//               const zeroedYear = zeroedMonthDate.getFullYear();

//               // If it's not the same month as when remainingAmount became 0, set monthlyDeduction to 0
//               if (currentMonth !== zeroedMonth || currentYear !== zeroedYear) {
//                 advance.monthlyDeduction = 0;
//                 isUpdated = true;
//               }
//             }
//           }

//           // If any changes were made, save the advance to the database
//           if (isUpdated) {
//             await advance.save(); // Persist the changes to the database
//           }
//         }
//       }
//     }

//     // Send modified employee data
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const Advance = require('../models/Advance'); // Adjust the path as necessary
// const Loan = require('../models/Loan');       // Adjust the path as necessary
// const Employee = require('../models/Employee'); // Adjust the path as necessary

// exports.getAllEmployees = async (req, res) => {
//   try {
//     // Get current date details
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     // Fetch all employees with populated fields
//     const employees = await Employee.find()
//       .populate('foodConsumptionRecords')
//       .populate({
//         path: 'advances',
//         populate: {
//           path: 'employee'
//         }
//       })
//       .populate({
//         path: 'loans',
//         populate: {
//           path: 'employee'
//         }
//       });

//     // Iterate through each employee
//     for (const employee of employees) {
//       // ------------------- Process Advances -------------------
//       if (employee.advances && employee.advances.length > 0) {
//         for (const advance of employee.advances) {
//           // Extract and parse dates
//           const advanceDate = new Date(advance.date);
//           let checkMonthDate = advance.checkMonth ? new Date(advance.checkMonth) : new Date(advanceDate);
//           let zeroedMonthDate = advance.zeroedMonth ? new Date(advance.zeroedMonth) : null;

//           const checkMonth = checkMonthDate.getMonth();
//           const checkYear = checkMonthDate.getFullYear();

//           // Handle isDeducted flag
//           if (!advance.isDeducted) {
//             if (advance.monthlyDeduction !== 0) {
//               advance.monthlyDeduction = 0;
//               await advance.save();
//             }
//             continue; // Skip further processing for this advance
//           }

//           // Check if deductions for the current month have already been applied
//           if (currentMonth === checkMonth && currentYear === checkYear) {
//             continue; // No update needed for this month
//           }

//           // Calculate the number of months passed since last check
//           const monthGap = (currentYear - checkYear) * 12 + (currentMonth - checkMonth);

//           // If there's a gap, adjust remainingAmount
//           if (monthGap > 0 && advance.remainingAmount > 0) {
//             const totalDeduction = advance.monthlyDeduction * monthGap;
//             advance.remainingAmount -= totalDeduction;

//             // Ensure remainingAmount doesn't go below 0
//             if (advance.remainingAmount <= 0) {
//               advance.remainingAmount = 0;
//               advance.zeroedMonth = currentDate; // Mark the month when remainingAmount becomes 0
//             }

//             // Update checkMonth to current date
//             advance.checkMonth = currentDate;
//             await advance.save();
//           }

//           // Handle zeroedMonth logic
//           if (advance.remainingAmount === 0 && zeroedMonthDate) {
//             const zeroedMonth = zeroedMonthDate.getMonth();
//             const zeroedYear = zeroedMonthDate.getFullYear();

//             // If it's not the same month as zeroedMonth, set monthlyDeduction to 0
//             if (currentMonth !== zeroedMonth || currentYear !== zeroedYear) {
//               if (advance.monthlyDeduction !== 0) {
//                 advance.monthlyDeduction = 0;
//                 await advance.save();
//               }
//             }
//           }
//         }
//       }

//       // ------------------- Process Loans -------------------
//       if (employee.loans && employee.loans.length > 0) {
//         for (const loan of employee.loans) {
//           // Extract and parse dates
//           const loanDate = new Date(loan.date);
//           let checkMonthDate = loan.checkMonth ? new Date(loan.checkMonth) : new Date(loanDate);
//           let zeroedMonthDate = loan.zeroedMonth ? new Date(loan.zeroedMonth) : null;

//           const checkMonth = checkMonthDate.getMonth();
//           const checkYear = checkMonthDate.getFullYear();

//           // Handle isDeductionActive flag
//           if (!loan.isDeductionActive) {
//             if (loan.monthlyDeduction !== 0) {
//               loan.monthlyDeduction = 0;
//               await loan.save();
//             }
//             continue; // Skip further processing for this loan
//           }

//           // Check if deductions for the current month have already been applied
//           if (currentMonth === checkMonth && currentYear === checkYear) {
//             continue; // No update needed for this month
//           }

//           // Calculate the number of months passed since last check
//           const monthGap = (currentYear - checkYear) * 12 + (currentMonth - checkMonth);

//           // If there's a gap, adjust remainingAmount
//           if (monthGap > 0 && loan.remainingAmount > 0) {
//             const totalDeduction = loan.monthlyDeduction * monthGap;
//             loan.remainingAmount -= totalDeduction;

//             // Ensure remainingAmount doesn't go below 0
//             if (loan.remainingAmount <= 0) {
//               loan.remainingAmount = 0;
//               loan.zeroedMonth = currentDate; // Mark the month when remainingAmount becomes 0
//             }

//             // Update checkMonth to current date
//             loan.checkMonth = currentDate;
//             await loan.save();
//           }

//           // Handle zeroedMonth logic
//           if (loan.remainingAmount === 0 && zeroedMonthDate) {
//             const zeroedMonth = zeroedMonthDate.getMonth();
//             const zeroedYear = zeroedMonthDate.getFullYear();

//             // If it's not the same month as zeroedMonth, set monthlyDeduction to 0
//             if (currentMonth !== zeroedMonth || currentYear !== zeroedYear) {
//               if (loan.monthlyDeduction !== 0) {
//                 loan.monthlyDeduction = 0;
//                 await loan.save();
//               }
//             }
//           }
//         }
//       }
//     }

//     // After processing, re-fetch the employees to get updated data
//     const updatedEmployees = await Employee.find()
//       .populate('foodConsumptionRecords')
//       .populate({
//         path: 'advances',
//         populate: {
//           path: 'employee'
//         }
//       })
//       .populate({
//         path: 'loans',
//         populate: {
//           path: 'employee'
//         }
//       });

//     // Send modified employee data
//     res.json(updatedEmployees);
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: err.message });
//   }
// };

//////////////////////////////////////////////////////////////////////////
// exports.getAllEmployees = async (req, res) => {
//   try {
//     // Get current month and year
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     // Get all employees with populated advances and loans
//     const employees = await Employee.find()
//       .populate('foodConsumptionRecords')
//       .populate({
//         path: 'advances',
//         populate: {
//           path: 'employee'
//         }
//       })
//       .populate({
//         path: 'loans',
//         populate: {
//           path: 'employee'
//         }
//       });

//     // Helper function to handle both advances and loans
//     const processDeductions = async (item, currentDate, currentMonth, currentYear) => {
//       const itemDate = new Date(item.date);
//       const itemMonth = itemDate.getMonth();
//       const itemYear = itemDate.getFullYear();

//       let checkMonthDate = item.checkMonth;
//       let zeroedMonthDate = item.zeroedMonth;
//       let monthGap = 0;

//       if (!checkMonthDate) {
//         checkMonthDate = itemDate; // First time, set checkMonth as itemDate
//       } else {
//         checkMonthDate = new Date(checkMonthDate);
//       }

//       const checkMonth = checkMonthDate.getMonth();
//       const checkYear = checkMonthDate.getFullYear();

//       // Deduction is active if either of the fields is true
//       const isDeductionActive = item.isDeducted !== undefined ? item.isDeducted : item.isDeductionActive;

//       // If deduction is not active, skip further logic
//       if (!isDeductionActive) {
//         item.monthlyDeduction = 0;
//         return; // Skip to the next item
//       }

//       // If current month is the same as checkMonth, no change
//       if (currentMonth === checkMonth && currentYear === checkYear) {
//         return; // Skip to the next item
//       }

//       // Calculate month gap (difference between current and last check)
//       monthGap = (currentYear - checkYear) * 12 + (currentMonth - checkMonth);

//       let isUpdated = false; // Flag to track if an update is needed
//       if (monthGap > 0 && item.remainingAmount > 0) {
//         item.remainingAmount -= (item.monthlyDeduction * monthGap);

//         // If remainingAmount becomes 0, mark the current month as zeroedMonth
//         if (item.remainingAmount <= 0) {
//           item.remainingAmount = 0;
//           item.zeroedMonth = currentDate; // Mark the month when remainingAmount becomes 0
//         }

//         // Update checkMonth to current date
//         item.checkMonth = currentDate;
//         isUpdated = true; // Mark that an update is needed
//       }

//       // If remainingAmount is already 0, apply the logic for zeroedMonth
//       if (item.remainingAmount === 0) {
//         if (zeroedMonthDate) {
//           zeroedMonthDate = new Date(zeroedMonthDate);
//           const zeroedMonth = zeroedMonthDate.getMonth();
//           const zeroedYear = zeroedMonthDate.getFullYear();

//           // If it's not the same month as when remainingAmount became 0, set monthlyDeduction to 0
//           if (currentMonth !== zeroedMonth || currentYear !== zeroedYear) {
//             item.monthlyDeduction = 0;
//             isUpdated = true;
//           }
//         }
//       }

//       // If any changes were made, save the item to the database
//       if (isUpdated) {
//         await item.save(); // Persist the changes to the database
//       }
//     };

//     // Adjust advances and loans based on the logic
//     for (const employee of employees) {
//       // Process Advances
//       if (employee.advances && employee.advances.length > 0) {
//         for (const advance of employee.advances) {
//           await processDeductions(advance, currentDate, currentMonth, currentYear);
//         }
//       }

//       // Process Loans
//       if (employee.loans && employee.loans.length > 0) {
//         for (const loan of employee.loans) {
//           await processDeductions(loan, currentDate, currentMonth, currentYear);
//         }
//       }
//     }

//     // Send modified employee data
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const processDeductions = async (item, currentDate, currentMonth, currentYear) => {
  const itemDate = new Date(item.date);
  let checkMonthDate = item.checkMonth;
  let zeroedMonthDate = item.zeroedMonth;
  let monthGap = 0;

  if (!checkMonthDate) {
    checkMonthDate = itemDate; // First time, set checkMonth as itemDate
  } else {
    checkMonthDate = new Date(checkMonthDate);
  }

  const checkMonth = checkMonthDate.getMonth();
  const checkYear = checkMonthDate.getFullYear();

  // Check for deduction activity based on item type
  const isDeductionActive =
    (item.isDeducted !== undefined && item.isDeducted) || 
    (item.isDeductionActive !== undefined && item.isDeductionActive);

  // If deduction is not active, skip further logic
  if (!isDeductionActive) {
    item.monthlyDeduction = 0;
    return; // Skip to the next item
  }

  // If current month is the same as checkMonth, no change
  if (currentMonth === checkMonth && currentYear === checkYear) {
    return; // Skip to the next item
  }

  // Calculate month gap (difference between current and last check)
  monthGap = (currentYear - checkYear) * 12 + (currentMonth - checkMonth);

  let isUpdated = false; // Flag to track if an update is needed
  if (monthGap > 0 && item.remainingAmount > 0) {
    item.remainingAmount -= (item.monthlyDeduction * monthGap);

    // If remainingAmount becomes 0, mark the current month as zeroedMonth
    if (item.remainingAmount <= 0) {
      item.remainingAmount = 0;
      item.zeroedMonth = currentDate; // Mark the month when remainingAmount becomes 0
    }

    // Update checkMonth to current date
    item.checkMonth = currentDate;
    isUpdated = true; // Mark that an update is needed
  }

  // If remainingAmount is already 0, apply the logic for zeroedMonth
  if (item.remainingAmount === 0) {
    if (zeroedMonthDate) {
      zeroedMonthDate = new Date(zeroedMonthDate);
      const zeroedMonth = zeroedMonthDate.getMonth();
      const zeroedYear = zeroedMonthDate.getFullYear();

      // If it's not the same month as when remainingAmount became 0, set monthlyDeduction to 0
      if (currentMonth !== zeroedMonth || currentYear !== zeroedYear) {
        item.monthlyDeduction = 0;
        isUpdated = true; // Mark that an update is needed
      }
    }
  }

  // If any changes were made, save the item to the database
  if (isUpdated) {
    // Save the original Mongoose model instance
    await item.constructor.findByIdAndUpdate(item._id, item.toObject(), { new: true });
  }
};


// exports.getAllEmployees = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const currentYear = currentDate.getFullYear();

//     const employees = await Employee.find()
//       .populate('foodConsumptionRecords')
//       .populate({
//         path: 'advances',
//         populate: {
//           path: 'employee'
//         }
//       })
//       .populate({
//         path: 'loans',
//         populate: {
//           path: 'employee'
//         }
//       });

//     // Process each employee's advances, loans, and EPF
//     for (const employee of employees) {
//       // Ensure working days do not exceed 25
//       let workingDays = employee.workingDays > 25 ? 25 : employee.workingDays;

//       // Calculate EPF using the formula
//       const epf = ((employee.salaryRate * workingDays) + (140 * workingDays)) / 100 * 8;

//       // Update the EPF in the employee record
//       employee.EPF = epf;

//       // Save the updated employee record to the database
//       await employee.save();

//       // Process Advances
//       if (employee.advances && employee.advances.length > 0) {
//         for (const advance of employee.advances) {
//           await processDeductions(advance, currentDate, currentMonth, currentYear);
//         }
//       }

//       // Process Loans
//       if (employee.loans && employee.loans.length > 0) {
//         for (const loan of employee.loans) {
//           await processDeductions(loan, currentDate, currentMonth, currentYear);
//         }
//       }
//     }

//     // Send modified employee data, including calculated EPF
//     res.json(employees);
//   } catch (err) {
//     console.error(err); // Log error details
//     res.status(500).json({ message: "An error occurred while processing your request." });
//   }
// };

exports.getAllEmployees = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const employees = await Employee.find()
      .populate('foodConsumptionRecords')
      .populate({
        path: 'advances',
        populate: {
          path: 'employee'
        }
      })
      .populate({
        path: 'loans',
        populate: {
          path: 'employee'
        }
      });

    for (const employee of employees) {
      // Ensure working days do not exceed 25
      let workingDays = employee.workingDays > 25 ? 25 : employee.workingDays;

      // Calculate EPF using the formula
      const epf = ((employee.salaryRate * workingDays) + (140 * workingDays)) / 100 * 8;
      employee.EPF = epf;

      // Process Advances
      if (employee.advances && employee.advances.length > 0) {
        for (const advance of employee.advances) {
          await processDeductions(advance, currentDate, currentMonth, currentYear);
        }
      }

      // Process Loans
      if (employee.loans && employee.loans.length > 0) {
        for (const loan of employee.loans) {
          await processDeductions(loan, currentDate, currentMonth, currentYear);
        }
      }

      // Calculate grossSalary
      const grossSalary = (
        employee.attendanceAllowance1 +
        employee.attendanceAllowance2 +
        employee.riskAllowance1 +
        employee.riskAllowance2 +
        employee.colomboAllowance +
        employee.monthPayment +
        employee.OTEarning +
        employee.incomeAllowance +
        employee.doubleShiftEarning +
        employee.attendance25
      );
      employee.grossSalary = grossSalary;

      // Calculate totalDeduction
      const totalDeduction = (
        employee.advances.reduce((sum, adv) => sum + adv.monthlyDeduction, 0) +
        employee.loans.reduce((sum, loan) => sum + loan.monthlyDeduction, 0) +
        employee.foodConsumptionRecords.reduce((sum, record) => sum + record.totalAmount, 0) +
        employee.EPF
      );
      employee.totalDeduction = totalDeduction;

      // Calculate netSalary
      employee.netSalary = grossSalary - totalDeduction;

      // Save the updated employee record to the database
      await employee.save();
    }

    // Send the modified employee data, including calculated salaries and deductions
    res.json(employees);
  } catch (err) {
    console.error(err); // Log error details
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};


// Update an employee
exports.updateEmployee = async (req, res) => {
  const { employeeId } = req.params; // Get employeeId from the request parameters
  let updateData = req.body; // Get updated data from request body

  try {
    // Find the current employee by ID before updating
    const employee = await Employee.findById(employeeId);

    // If employee is not found, send a 404 response
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Extract necessary fields from updateData for attendance allowance calculation
    const { workingDays, otId, OTHrs } = updateData;

    // Calculate attendanceAllowance1 
    let attendanceAllowance1 = 0;

    if (otId === 'JT001' || otId === 'JT002') {
      if (workingDays >= 25) {
        attendanceAllowance1 = otId === 'JT001' ? 12500 : 7500;
      } else if (workingDays >= 22 && workingDays <= 24) {
        attendanceAllowance1 = 5000;
      }
    } else if (otId === 'JT003') {
      attendanceAllowance1 = 0; 
    }

    // Update the attendanceAllowance1 in the updateData before performing the update
    updateData.attendanceAllowance1 = attendanceAllowance1;

    // Check if OTHrs reached 50 and salary adjustment hasn't been applied
    if (OTHrs >= 50 && !employee.hasReceivedOTSalaryIncrease) {
      updateData.salaryRate = employee.salaryRate + 50; // Increase salary rate by 50
      updateData.hasReceivedOTSalaryIncrease = true;    // Mark that the increase has been applied
    }

    //calculate monthPayment
    updateData.monthPayment = updateData.workingDays * updateData.salaryRate;

    // Calculate OTRate and OTEarning
    const OTRate = (updateData.salaryRate + 140 + (updateData.attendanceAllowance1 / 25)) / 8;
    const OTEarning = OTRate * OTHrs;

    updateData.OTRate = OTRate;
    updateData.OTEarning = OTEarning;

    // Calculate doubleShiftEarning
    updateData.doubleShiftEarning = updateData.doubleShiftDays * updateData.salaryRate;

    // Attempt to convert to a number
    const workingDaysNumber = workingDays != null ? Number(workingDays) : null;

    // Check if it is a valid number
    if (!isNaN(workingDaysNumber) && workingDaysNumber !== null && workingDaysNumber > 0) {
      if (workingDaysNumber === 26) {
        updateData.attendance25 = 500;
      } else if (workingDaysNumber === 27) {
        updateData.attendance25 = 1000;
      } else if (workingDaysNumber === 28) {
        updateData.attendance25 = 1500;
      } else if (workingDaysNumber === 29) {
        updateData.attendance25 = 2000;
      } else if (workingDaysNumber >= 30 && workingDaysNumber <= 31) {
        updateData.attendance25 = 2500;
      } else {
        updateData.attendance25 = 0;
      }
      console.log('Updated attendance25:', updateData.attendance25);
    } else {
      console.log('workingDays is not a valid number:', workingDays);
    }

    // Calculate grossSalary
    updateData.grossSalary = (
      updateData.attendanceAllowance1 +
      (updateData.attendanceAllowance2 || 0) +
      (updateData.riskAllowance1 || 0) +
      (updateData.riskAllowance2 || 0) +
      (updateData.colomboAllowance || 0) +
      (updateData.monthPayment || 0) +
      updateData.OTEarning +
      (updateData.incomeAllowance || 0) +
      updateData.doubleShiftEarning +
      updateData.attendance25
    );


    // Now proceed to update the employee with the modified updateData
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators run during update
    });

    // Send the updated employee as response
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  const { employeeId } = req.params; // Get employeeId from the request parameters

  try {
    // Find employee by ID and remove it
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    // If employee is not found, send a 404 response
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Send a success response
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Find employees by name with populated advances and loans
exports.findEmployee = async (req, res) => {
  const { name } = req.query; // Get the name from query parameters
  const limit = parseInt(req.query.limit) || 3; // Limit the number of results, default to 3

  try {
    if (!name) {
      return res.status(400).json({ message: 'Please provide a name to search' });
    }

    // Find employees by any part of their name (firstName or secondName)
    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: name, $options: 'i' } },
        { secondName: { $regex: name, $options: 'i' } }
      ]
    })
    .limit(limit)
    .populate('advances') // Populate advances
    .populate('loans')  // Populate loans
    .populate('foodConsumptionRecords');

    // If no employees are found, send a 404 response
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    // Send the employees as a response
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get employee details by ID with populated advances and loans
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params; // Get employee ID from request parameters

  try {
    // Find employee by ID with populated advances and loans
    const employee = await Employee.findById(id)
      .populate('advances') // Populate advances
      .populate('loans')   // Populate loans
      .populate('foodConsumptionRecords');

    // If employee is not found, send a 404 response
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Send the employee details as a response
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Employee details based on employeeId
exports.updateAllowance = async (req, res) => {
  try {
    const employeeId = req.params.employeeId; // Extract employeeId from request params
    const updateData = req.body; // The data to update is sent via the request body

    // Find employee by employeeId and update their data
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: employeeId },  // Find employee by employeeId
      { $set: updateData },        // Set the new data for the employee
      { new: true, runValidators: true } // Return the updated document
    );

    // Check if employee was found and updated
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};