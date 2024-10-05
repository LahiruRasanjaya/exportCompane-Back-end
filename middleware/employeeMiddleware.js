// module.exports.calculateAttendanceAllowance = function (next) {
//     const employee = this;
//     console.log("Middleware is triggered for employee:", employee.employeeId);
  
//     // Calculate the attendance allowance based on the working days and otId
//     if (employee.otId === 'JT001' || employee.otId === 'JT002') {
//       if (employee.workingDays >= 25) {
//         if (employee.otId === 'JT001') {
//           employee.attendanceAllowance1 = 12500;
//         } else if (employee.otId === 'JT002') {
//           employee.attendanceAllowance1 = 7500;
//         }
//       } else if (employee.workingDays >= 22 && employee.workingDays <= 24) {
//         employee.attendanceAllowance1 = 5000;
//       } else {
//         employee.attendanceAllowance1 = 0;
//       }
//     } else if (employee.otId === 'JT003') {
//       employee.attendanceAllowance1 = 0; // No attendance allowance for JT003
//     }
  
//     next(); // Proceed to the save operation
//   };
  