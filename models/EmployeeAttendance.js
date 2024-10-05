const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  entryTime: { type: Date }, // Entry time, can be null if absent
  exitTime: { type: Date },  // Exit time, can be null if absent
  workingHours: { type: Number, default: 0 }, // Calculated working hours
  OTHours: { type: Number, default: 0 },      // Calculated OT hours
  status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' }, // Attendance status
  specialDate: { type: Boolean},
  entryTimeMarked: { type: Boolean},
  exitTimeMarked: { type: Boolean}
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
