const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/register', userController.registerUser);

// Route to authenticate a user
router.post('/login', userController.loginUser);

module.exports = router;
