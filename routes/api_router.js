const express = require('express');
const router = express.Router();
const db = require('../database');

// Login
router.get('/auth', (req, res) => {

});

// Get dishes
router.get('/dishes', (req, res) => {
    // Load 10 without auth, all with
});

// Register a user
router.post('/user', (req, res) => {
    console.log(req.body);

    db.serialize(() => {
        // TODO: This sql doesnt work, "column index out of range", what does this mean?
        db.run(`--sql
            INSERT INTO users VALUES (NULL, $email, $name, $password, NULL);
        `, req.body, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.sendStatus(200);
            }
        });
    });
});

// Edit user info
router.put('/user', (req, res) => {

});

// Get user info
router.get('/user', (req, res) => {

});

// Delete user
router.delete('/user', (req, res) => {

});

// Get order history
router.get('/oderhistory', (req, res) => {

});

// Delete order history
router.delete('/oderhistory', (req, res) => {

});

router.get('/cart', (req, res) => {
    // Get userid's cart if exists
});

router.post('/cart', (req, res) => {
    // Add item to cart, create new cart row if nescesary
});

router.put('/cart', (req, res) => {
    // Change amount of item in cart of userid.
});

router.delete('/cart', (req, res) => {
    // Delete item from cart of userid if specified, otherwise clear cart of userid.
});

// Export api routes
module.exports = router;