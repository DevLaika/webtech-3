const sqlite3 = require("sqlite3").verbose();

// Create database file
const file = "database.db";
const db = new sqlite3.Database(file);

// Create tables (users, dishes, orders) in database
db.serialize(() => {
    db
    .run(`--sql
        CREATE TABLE if not exists users (
            userid int primary key not null,
            email text not null,
            name text not null,
            password text not null,
            address_id int FOREIGN KEY REFERENCES addresses(id)
    );`)
    .run(`--sql
        CREATE TABLE if not exists addresses (
            id int primary key not null,
            country text not null,
            city text not null,
            postalcode text not null,
            street text not null,
            number text not null
    );`)
    .run(`--sql
        CREATE TABLE if not exists dishes (
            id int primary key not null,
            name text not null,
            price int not null,
            img text,
            category text
        );`)
    .run(`--sql
        CREATE TABLE if not exists orders (
            id int primary key not null,
            userid int not null FOREIGN key REFERENCES users(id),
            total int not null,
            datetime int not null,
            addressId int not null foreign key refrences addresses(id)
        );
    `)
    .run(`--sql
        create table if not exists carts (
            id int primary key not null,
            userid int not null FOREIGN key REFERENCES users(id)
        );`
    )
    .run(`--sql
        create table if not exists orderdishes (
            id int primary key not null,
            order_id int not null FOREIGN key REFERENCES orders(id),
            dish_id int not null FOREIGN key REFERENCES dishes(id),
            quantity int not null
        );
    `)
    .run(`--sql
        create table if not exists cartdishes (
            id int primary key not null,
            cart_id int not null FOREIGN key REFERENCES carts(id),
            dish_id int not null FOREIGN key REFERENCES dishes(id),
            quantity int not null
        );
    `)
});

// Export the database object for use elsewhere
module.exports = db;