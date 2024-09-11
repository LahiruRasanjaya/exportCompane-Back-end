const Advance = require('../models/Advance');
const Employee = require('../models/Employee');

// // Create a new advance
// exports.createAdvance = async (req, res) => {
//     try {
//         const advance = new Advance(req.body);
//         await advance.save();
//         res.status(201).json(advance);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Create a new advance
exports.createAdvance = async (req, res) => {
    try {

        // Create the advance
        const advance = new Advance(req.body);
        await advance.save();

        // Update the employee (or notify them)
        const upadteEmployee = await Employee.findById(req.body.employee);
        if (upadteEmployee) {
            // Example: adding a reference or notification (you can adjust this as needed)
            upadteEmployee.advances.push(advance._id);
            await upadteEmployee.save();
        }

        res.status(201).json(advance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all advances
exports.getAllAdvances = async (req, res) => {
    try {
        const advances = await Advance.find().populate('employee');
        res.status(200).json(advances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an advance by ID
exports.getAdvanceById = async (req, res) => {
    try {
        const advance = await Advance.findById(req.params.id).populate('employee'); 
        if (!advance) {
            return res.status(404).json({ message: 'Advance not found' });
        }
        res.status(200).json(advance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an advance by ID
exports.updateAdvance = async (req, res) => {
    try {
        const advance = await Advance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!advance) {
            return res.status(404).json({ message: 'Advance not found' });
        }
        res.status(200).json(advance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an advance by ID
exports.deleteAdvance = async (req, res) => {
    try {
        const advance = await Advance.findByIdAndDelete(req.params.id);
        if (!advance) {
            return res.status(404).json({ message: 'Advance not found' });
        }
        res.status(200).json({ message: 'Advance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
