const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 8022;
// const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const Database = require('better-sqlite3');

// Import api functionality from ./routes/api_router
app.use(cors());

const api_router = require('./routes/api_router');
const { ppid } = require('process');
const res = require('express/lib/response');

// Use the static html and css pages located in ./public
app.use(express.static(path.join(__dirname, 'public')));
app.set
app.use(express.json());



// Use the api functionality
app.use('/api', api_router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the app, listens for requests on port 8022
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
