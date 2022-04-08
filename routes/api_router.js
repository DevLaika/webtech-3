const express = require('express');
const router = express.Router();
const db = require('../database');

// Login
router.get('/auth', (req, res) => {

});

// Get dishes
router.get('/dishes', (req, res) => {
    const auth = true; // Todo: how to check authentication?

    if (auth) {
        // load all (lazy?)
    } else {
        // load 10 (less for lazy loading? should be max 10)
    }

});

// Get dishes
router.post('/dishes', (req, res) => {
    db.run(`--sql
        INSERT INTO dishes (name, price, img, description, category) VALUES (?, ?, ?, ?, ?);
    `, [req.body.name, req.body.price, req.body.img, req.body.description, req.body.category], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.sendStatus(200);
        }
    });
});

// Get dishes
router.put('/dishes:dish_id', (req, res) => {
    // Load 10 without auth, all with
});


// Register a user
router.post('/user', (req, res) => {
    db.run(`--sql
        INSERT INTO users (email, name, password) VALUES (?, ?, ?);
    `, [req.body.email, req.body.name, req.body.password], (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.sendStatus(200);
        }
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