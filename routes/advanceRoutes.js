const express = require('express');
const advanceController = require('../controllers/advanceController');

const router = express.Router();

// Create a new advance
router.post('/api/advances', advanceController.createAdvance);

// Get all advances
router.get('/api/advances', advanceController.getAllAdvances);

// Get an advance by ID
router.get('/api/advances/:id', advanceController.getAdvanceById);

// Update an advance by ID
router.put('/api/advances/:id', advanceController.updateAdvance);

// Delete an advance by ID
router.delete('/api/advances/:id', advanceController.deleteAdvance);

module.exports = router;
