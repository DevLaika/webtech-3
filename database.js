const sqlite3 = require("sqlite3").verbose();

// Create database file
const file = "database.db";
const db = new sqlite3.Database(file);

// Create tables (users, dishes, orders) in database
db.serialize(() => {
    db
    .run(`--sql
        CREATE TABLE if NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            country TEXT NOT null,
            city TEXT NOT null,
            postalcode TEXT NOT null,
            street TEXT NOT null,
            number TEXT NOT null
    );`)
    .run(`--sql
        CREATE TABLE if NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT null,
            name TEXT NOT null,
            password TEXT NOT null,
            address_id INTEGER,
            FOREIGN KEY (address_id) REFERENCES addresses(id)
    );`)
    .run(`--sql
        CREATE TABLE if NOT EXISTS dishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT null,
            price INTEGER NOT null,
            img TEXT,
            category TEXT
        );`)
    .run(`--sql
        CREATE TABLE if NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT null,
            total INTEGER NOT null,
            datetime INTEGER NOT null,
            address_id INTEGER NOT null,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (address_id) REFERENCES addresses(id)
        );
    `)
    .run(`--sql
        create table if NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT null,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );`
    )
    .run(`--sql
        create table if NOT EXISTS orderdishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantity INTEGER NOT null,
            order_id INTEGER NOT null,
            dish_id INTEGER NOT null,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (dish_id) REFERENCES dishes(id)
        );
    `)
    .run(`--sql
        create table if NOT EXISTS cartdishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantity INTEGER NOT null,
            cart_id INTEGER NOT null,
            dish_id INTEGER NOT null,
            FOREIGN KEY (cart_id) REFERENCES carts(id),
            FOREIGN KEY (dish_id) REFERENCES dishes(id)
        );
    `)
});

// Export the database object for use elsewhere
module.exports = db;