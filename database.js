const sqlite3 = require("sqlite3").verbose();

// Create database file
const file = "database.db";
const db = new sqlite3.Database(file);

// Create tables (users, dishes, orders) in database
db.serialize(() => {
    db
    .run(`--sql
        CREATE TABLE if not exists users (
            id int primary key not null,
            email text not null,
            password text not null,
            address text
    );`)
    .run(`--sql
        CREATE TABLE if not exists dishes (
            id int primary key not null,
            name text not null,
            price int not null,
            img text
        );`)
    .run(`--sql
        CREATE TABLE if not exists orders (
            id int primary key not null,
            userid int not null,
            total int not null,
            orderdata text not null
        );
    `);
});

// Export the database object for use elsewhere
module.exports = db;