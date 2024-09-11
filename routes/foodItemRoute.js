const express = require('express');
const foodItemController = require('../controllers/foodItemController');

const router = express.Router();

// Create a new food item
router.post('/', foodItemController.createFoodItem);

// Get all food items
router.get('/', foodItemController.getAllFoodItems);

// Get a food item by ID
router.get('/:id', foodItemController.getFoodItemById);

// Update a food item by ID
router.put('/:id', foodItemController.updateFoodItem);

// Delete a food item by ID
router.delete('/:id', foodItemController.deleteFoodItem);

module.exports = router;
