const express = require('express');
const router = express.Router();
const db = require('../database');

// Login
router.get('/auth', (err, req, res) => {

})

// Get dishes
router.get('/dishes', (err, req, res) => {
    // Load 10 without auth, all with
})

// Register a user
router.post('/user', (err, req, res) => {

})

// Edit user info
router.patch('/user', (err, req, res) => {

})

// Get user info
router.get('/user', (req, res) => {

})

// Delete user
router.delete('/user', (err, req, res) => {

})

// Get order history
router.get('/oderhistory', (err, req, res) => {

})

// Delete order history
router.delete('/oderhistory', (err, req, res) => {

})

router.get('/cart', (err, req, res) => {
    // Get userid's cart if exists
})

router.post('/cart', (err, req, res) => {
    // Add item to cart, create new cart row if nescesary
})

router.patch('/cart', (err, req, res) => {
    // Change amount of item in cart of userid.
})

router.delete('/cart', (err, req, res) => {
    // Delete item from cart of userid if specified, otherwise clear cart of userid.
})

// Export api routes
module.exports = router;