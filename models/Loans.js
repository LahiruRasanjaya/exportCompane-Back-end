const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  name: {type: String, required: true},                 // Loan Name
  amount: { type: Number, required: true },             // Loan Amount
  date: { type: Date, required: true },                 // Date of Loan
  duration: { type: Number, required: true },           // Loan Duration (e.g., in months)
  monthlyDeduction: { type: Number, required: true },   // Monthly Deduction Amount
  isDeductionActive: { type: Boolean, default: true },  // Whether the monthly deduction is active
  remainingAmount: { type: Number, required: true },    // Remaining amount to be deducted
  checkMonth: { type: Date },                           // Last deduction check date
  zeroedMonth: { type: Date },                          // Month when the remainingAmount became zero
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
