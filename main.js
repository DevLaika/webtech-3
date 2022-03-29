const express = require('express');
const app = express()
const port = 3000;
const path = require('path');

const fs = require("fs");
const file = "database.db";
const exists = fs.existsSync(file);

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

const api_router = require('./routes/api_router')

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Stuff (thing TEXT)");
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api_router);


app.get('/', function (req, res) {
  res.sendFile("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})