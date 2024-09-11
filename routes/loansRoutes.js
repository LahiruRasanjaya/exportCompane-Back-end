const express = require('express');
const loanController = require('../controllers/loansController');

const router = express.Router();

// Create a new loan
router.post('/api/loans', loanController.createLoan);

// Get all loans
router.get('/api/loans', loanController.getAllLoans);

// Get a loan by ID
router.get('/api/loans/:id', loanController.getLoanById);

// Update a loan by ID
router.put('/api/loans/:id', loanController.updateLoan);

// Delete a loan by ID
router.delete('/api/loans/:id', loanController.deleteLoan);

module.exports = router;
