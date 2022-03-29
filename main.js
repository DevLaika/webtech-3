const express = require('express');
const app = express()
const port = 3000;
const path = require('path');

const api_router = require('./routes/api_router')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api_router);


app.get('/', function (req, res) {
  res.sendFile("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

db.close()