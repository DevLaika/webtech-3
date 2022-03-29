const express = require('express');
const router = express.Router();
const db = require('../database');

// Register a user
router.post('/user', (err, req, res) => {

})

// Edit user info
router.patch('/user', (err, req, res) => {

})

// Get user info
router.get('/user', (req, res) => {

})

// Export api routes
module.exports = router;