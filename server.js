

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const { deleteOldAttendanceRecords } = require('./utils/attendanceReset');

// Use environment variables
const port = process.env.PORT || 5000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_management';

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' // Your frontend URL
}));

// Connect to MongoDB
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Define a test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Import and use routes
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const loansRoute = require('./routes/loansRoutes');
const advanceRoutes = require('./routes/advanceRoutes');
const foodItemRoutes = require('./routes/foodItemRoute');
const foodConsumptionRoutes = require('./routes/foodConsumptionRoute');
const attendanceRoutes = require('./routes/employeeAttendanceRoute');
const attendanceReportRoutes = require('./routes/attendanceReportRoute');
const allowanceRoute = require('./routes/allowanceRoute');

app.use('/api', employeeRoutes);
app.use('/api/users', userRoutes);
app.use('/', loansRoute);
app.use('/', advanceRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/food-consumptions', foodConsumptionRoutes);
app.use('/api/attendance', attendanceRoutes); // Attendance routes
app.use('/api/allowance', allowanceRoute);    // Employee routes
app.use('/api/attendance-reports', attendanceReportRoutes); // Attendance report routes

// Import and start the attendance reset cron job
// const resetAttendanceDaily = require('./utils/attendanceReset');
// resetAttendanceDaily(); // This will schedule the reset job to run every midnight
deleteOldAttendanceRecords();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

