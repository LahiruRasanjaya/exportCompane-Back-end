const mongoose = require('mongoose');

const advanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  amount: { type: Number, required: true },           // Advance Amount
  date: { type: Date, required: true },               // Date of Advance
  isDeducted: { type: Boolean, default: true },       // Whether it should be deducted from salary
  remainingAmount: { type: Number, required: true }   // Remaining amount to be deducted
});

const Advance = mongoose.model('Advance', advanceSchema);

module.exports = Advance;
