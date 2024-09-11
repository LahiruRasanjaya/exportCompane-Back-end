const express = require('express');
const foodConsumptionController = require('../controllers/foodConsumptionController');

const router = express.Router();

// Create a new food consumption record
router.post('/', foodConsumptionController.createFoodConsumption);

// Get all food consumption records
router.get('/', foodConsumptionController.getAllFoodConsumptionRecords);

// Get a food consumption record by ID
router.get('/:id', foodConsumptionController.getFoodConsumptionById);

// Update a food consumption record by ID
router.put('/:id', foodConsumptionController.updateFoodConsumption);

// Delete a food consumption record by ID
router.delete('/:id', foodConsumptionController.deleteFoodConsumption);

module.exports = router;
