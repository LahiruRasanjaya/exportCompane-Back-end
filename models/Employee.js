const mongoose = require('mongoose');
const { calculateAttendanceAllowance } = require('../middleware/employeeMiddleware');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },  // Employee ID
  firstName: { type: String, required: true },   // First Name
  secondName: { type: String, required: true },  // Second Name
  district: { type: String, required: true },    // District
  address: { type: String, required: true },     // Address
  phoneNumber: { type: String, required: true }, // Phone Number
  salaryRate: { type: Number, required: true, default: 0.00 },  // Salary Rate
  hasReceivedOTSalaryIncrease: { type: Boolean, default: false },
  otId: { type: String, required: true },        // OT ID
  notes: { type: String, default: "The employee has consistently maintained a positive performance record. No requests for advances, loans, or food allowances have been made, demonstrating responsible financial management." }, // Notes about the employee
  
  // New fields for special allowances
  attendanceAllowance1: { type: Number, default: 0.00 }, // Attendance Allowance 1
  attendanceAllowance2: { type: Number, default: 0.00 }, // Attendance Allowance 2
  riskAllowance1: { type: Number, default: 3000 },    // Risk Allowance 1
  riskAllowance2: { type: Number, default: 0 },       // Risk Allowance 2
  colomboAllowance: { type: Number, default: 0 },     // Colombo Allowance
  
  // References to the loans and advances collections
  advances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advance' }],
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
  foodConsumptionRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodConsumption' }], // Reference to FoodConsumption schema

  // New fields added as requested
  workingDays: { type: Number, default: 0 },                       // Working Days (can be 5, 5.5, 20.5, etc.)
  monthPayment: { type: Number, min: 0, default: 0.00 },              // Monthly Payment with 2 decimals
  OTHrs: { type: Number, default: 0.00 },                             // OT Hours (can be hours and seconds)
  OTRate: { type: Number, min: 0, default: 0.00 },                    // OT Rate like 20.34, 300.00, etc.
  OTEarning: { type: Number, min: 0, default: 0.00 },                 // OT Earnings like 300045.34, etc.
  incomeAllowance: { type: Number, min: 0, default: 0.00 },           // Income Allowance like 200.67, etc.
  doubleShiftDays: { type: Number, min: 0, default: 0.00},           // Double Shift Days
  doubleShiftEarning: { type: Number, min: 0, default: 0.00 },        // Double Shift Earning like 231432.45, etc.
  attendance25: { type: Number, min: 0, default: 0.00 },              // 25 Attendance Days
  grossSalary: { type: Number, min: 0 , default: 0.00},               // Gross Salary like 2324354.34, etc.
  EPF: { type: Number, min: 0, default: 0.00 },                       // EPF like 2342.23, etc.
  totalDeduction: { type: Number, min: 0, default: 0.00 },            // Total Deduction like 324234.34, etc.
  netSalary: { type: Number, min: 0, default: 0.00 }                  // Net Salary like 14543543.78, etc.
});

// Apply the middleware to the employee schema
// employeeSchema.pre('findByIdAndUpdate', calculateAttendanceAllowance);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
