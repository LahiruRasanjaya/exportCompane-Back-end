const Loan = require('../models/Loans');
const Employee = require('../models/Employee');


// Create a new loan
exports.createLoan = async (req, res) => {
    try {
        // Create the loan
        const loan = new Loan(req.body);
        await loan.save();

        // Update the employee (or notify them)
        const UpdateEmployee = await Employee.findById(req.body.employee);
        if (UpdateEmployee) {
            // Example: adding a reference or notification (you can adjust this as needed)
            UpdateEmployee.loans.push(loan._id);
            await UpdateEmployee.save();
        }

        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all loans
exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('employee');
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a loan by ID
exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id).populate('employee');
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a loan by ID
exports.updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a loan by ID
exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
