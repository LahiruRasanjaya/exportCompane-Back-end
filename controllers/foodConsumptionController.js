const FoodConsumption = require('../models/FoodConsumption');
const Employee = require('../models/Employee');

// Create a new food consumption record
exports.createFoodConsumption = async (req, res) => {
    try {
        const foodConsumption = new FoodConsumption(req.body);
        await foodConsumption.save();

        // Update the employee's food consumption records
        const employee = await Employee.findById(req.body.employee);
        if (employee) {
            employee.foodConsumptionRecords.push(foodConsumption._id);
            await employee.save();
        }

        res.status(201).json(foodConsumption);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all food consumption records
exports.getAllFoodConsumptionRecords = async (req, res) => {
    try {
        const foodConsumptions = await FoodConsumption.find().populate('employee').populate('foodItems.item');
        res.status(200).json(foodConsumptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a food consumption record by ID
exports.getFoodConsumptionById = async (req, res) => {
    try {
        const foodConsumption = await FoodConsumption.findById(req.params.id).populate('employee').populate('foodItems.item');
        if (!foodConsumption) {
            return res.status(404).json({ message: 'Food consumption record not found' });
        }
        res.status(200).json(foodConsumption);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a food consumption record by ID
exports.updateFoodConsumption = async (req, res) => {
    try {
        const foodConsumption = await FoodConsumption.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!foodConsumption) {
            return res.status(404).json({ message: 'Food consumption record not found' });
        }
        res.status(200).json(foodConsumption);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a food consumption record by ID
exports.deleteFoodConsumption = async (req, res) => {
    try {
        const foodConsumption = await FoodConsumption.findByIdAndDelete(req.params.id);
        if (!foodConsumption) {
            return res.status(404).json({ message: 'Food consumption record not found' });
        }
        res.status(200).json({ message: 'Food consumption record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
