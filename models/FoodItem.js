const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Name of the food item (e.g., Breakfast, Lunch)
  price: { type: Number, required: true },     // Price of the food item
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
