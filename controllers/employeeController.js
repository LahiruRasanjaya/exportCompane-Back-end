
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

// Get all employees with populated advances and loans
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('foodConsumptionRecords')
      .populate('advances')
      .populate('loans');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update an employee
exports.updateEmployee = async (req, res) => {
  const { employeeId } = req.params; // Get employeeId from the request parameters
  const updateData = req.body; // Get updated data from request body

  try {
    // Find employee by ID and update it
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators run during update
    });

    // If employee is not found, send a 404 response
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

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