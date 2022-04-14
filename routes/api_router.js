const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

router.post('/user', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const insert = db.prepare('INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)');
        insert.run(uuid.v4(), email, name, hash);
        res.status(200);
        res.redirect("/login.html");
    } catch (e) {
        console.log(e);
        res.status(500).send('something broke');
    }
});

// login functionality
router.post('/auth', async (req, res) => {
    try {
        db.get('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, row) => {
            if (err) {
                throw err;
            }
            if (!row) {
                throw new Error("No user exists with these login details.");
            }
            if (await bcrypt.compare(req.body.password, row.password)) {
                res.status(200).json('Valid login credentials!');
            } else {
                res.sendStatus(403);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong on our end.');
    }
});

// Get dishes
router.get('/dish', (req, res) => {
    const auth = true; // Todo: how to check authentication?

    if (auth) {
        // Temporary: needs lazy loading, or pagination implemented.
        db.all("SELECT * FROM dishes", (err, rows) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.sendStatus(418);
    }

});

// Create new dishes
router.post('/dish', (req, res) => {
    console.log("POST: Dishes");
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

// Alter dish?
router.put('/dish', (req, res) => {

});

// Edit user info
router.put('/user', (req, res) => {

});

// Get user info
router.get('/user', (req, res) => {
    // !!!! userID is currently undefined. this will not work until sessions are figured out.
    res.sendStatus(418);
    throw new Error("UserID is not defined yet, fix sessions!!!");

    db.get("SELECT (name, email) FROM users WHERE id = ?", [userID], (err, row) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Something went wrong getting user '${userID}'!`);
        }
        res.json(row);
    });
});

// Delete user
router.delete('/user', (req, res) => {

});

// Get order history
router.get('/oderhistory', (req, res) => {
    // !!!! userID is currently undefined. this will not work until sessions are figured out.

    res.sendStatus(418);
    throw new Error("UserID is not defined yet, fix sessions!!!");


    db.all("SELECT * FROM orders WHERE user_id = ?", [userID], (err, rows) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Something went wrong receiving orders for user '${userID}'`);
        }
        if (rows) {
            for (const row of rows) {
                delete row.id;
            }
        }
        res.json(rows);
    });
});

// Delete order history
router.delete('/oderhistory', (req, res) => {

});

router.get('/cart', (req, res) => {
    // !!!! userID is currently undefined. this will not work until sessions are figured out.
    res.sendStatus(418);
    throw new Error("UserID is not defined yet, fix sessions!!!");

    db.all("SELECT (dish_id, quantity) FROM cartdishes WHERE cart_id IN (SELECT id FROM carts WHERE user_id = ?)", [userID], (err, rows) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Error in getting cart of user ${userID}!`);
        }
        res.json(rows);    
    })
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

// Create order
// res.body contains:
// "items": {"id": number, "quantity": number},
// "address": {"country": string ... etc.}
router.post('/order', (req, res) => {
    // !!!! userID is currently undefined. this will not work until sessions are figured out.

    res.sendStatus(418);
    throw new Error("UserID is not defined yet, fix sessions!!!");


    let total = 0;
    for (const item of req.body.items) {
        db.get("SELECT price FROM dishes WHERE dish_id=?", [item.id], (err, row) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (!row) {
                throw new Error(`Dish ID: "${item.id}" not found in database`);
            }
            console.log(row);
            total += row * quantity;
        });
    }

    let addressID = null;

    db.run("INSERT INTO addresses (country, city, postalcode, street, number) VALUES (?,?,?,?,?)", [req.body.address.coutry, req.body.address.city, req.body.address.postalcode, req.body.address.street, req.body.address.coutry, number], (err) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Something went wrong creating an address!`);
        }
        addressID = this.lastID;
    });

    db.run("UPDATE users SET address_id = ? WHERE id = ?", [addressID, userID], (err) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Something went wrong attaching address '${addressID}' to user ${userID}!`);
        }
    });

    let orderID = null;

    db.run("INSERT INTO orders (user_id, total, datetime, address_id) VALUES (?, ?, ?, ?)", [userID, total, Date.now(), addressID], (err) => {
        if (err) {
            res.sendStatus(500);
            throw new Error(`Something went wrong ordering for user '${userID}'!`);
        }
        orderID = this.lastID;
    });

    for (const item of req.body.items) {
        db.run("INSERT INTO orderdishes (order_id, dish_id, quantity) VALUES (?,?,?)", [orderID, item.id, item.quantity], (err) => {
            if (err) {
                res.sendStatus(500);
                throw new Error(`Something went wrong inserting orderdishes for order '${orderID}'!`);
            }
        });
    }
});


router.get('/review', (req, res) => {

})

// Export api routes
module.exports = router;