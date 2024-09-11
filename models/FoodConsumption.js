const mongoose = require('mongoose');

const foodConsumptionSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, // Reference to the Employee schema
  date: { type: Date, required: true },          // Date when food was consumed
  foodItems: [{ 
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true }, // Reference to the FoodItem schema
    quantity: { type: Number, required: true },  // Quantity of the food item consumed
  }],
  totalAmount: { type: Number, required: true }, // Total amount debited for food on that date
});

const FoodConsumption = mongoose.model('FoodConsumption', foodConsumptionSchema);

module.exports = FoodConsumption;
