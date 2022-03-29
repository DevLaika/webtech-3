const file = "database.db";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

module.exports = db;