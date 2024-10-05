const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  amount: { type: Number, required: true },           // Advance Amount
  date: { type: Date, required: true },               // Date of Advance
  isDeducted: { type: Boolean, default: true },       // Whether it should be deducted from salary
  monthlyDeduction: { type: Number, required: true },  // Remaining amount to be deducted
  remainingAmount: { type: Number, required: true },  // Remaining amount to be deducted
  checkMonth: { type: Date, },          // Last checked month for deductions
  zeroedMonth: { type: Date, }          // Month when remainingAmount became 0

});

const Advance = mongoose.model('Advance', advanceSchema);

module.exports = Advance;
