const file = "database.db";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

db.run(`--sql
    create table users (
        id int primary key not null,
        email text not null,
        password text not null,
        address text
    )

    create table dishes (
        id int not null,
        name text not null,
        price int not null,
        img text
    )

    create table orders (
        id int primary key not null,
        user_id int not null,
        total int not null,
        orderdata text not null
    )
`);

module.exports = db;