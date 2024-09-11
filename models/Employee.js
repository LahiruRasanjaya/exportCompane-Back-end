
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },  // Employee ID
  firstName: { type: String, required: true },   // First Name
  secondName: { type: String, required: true },  // Second Name
  district: { type: String, required: true },    // District
  address: { type: String, required: true },     // Address
  phoneNumber: { type: String, required: true }, // Phone Number
  salaryRate: { type: Number, required: true },  // Salary Rate
  otId: { type: String, required: true },        // OT ID
  notes: { type: String, default: "The employee has consistently maintained a positive performance record. No requests for advances, loans, or food allowances have been made, demonstrating responsible financial management." },          // Notes about the employee
  
  // New fields for special allowances
  attendanceAllowance1: { type: Number, default: 0 }, // Attendance Allowance 1
  attendanceAllowance2: { type: Number, default: 0 }, // Attendance Allowance 2
  riskAllowance1: { type: Number, default: 3000 },       // Risk Allowance 1
  riskAllowance2: { type: Number, default: 0 },       // Risk Allowance 2
  colomboAllowance: { type: Number, default: 0 },     // Colombo Allowance
    
  // References to the loans and advances collections
  advances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advance' }],
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
  foodConsumptionRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodConsumption' }], // Reference to FoodConsumption schema
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
