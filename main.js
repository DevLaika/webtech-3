const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 8022;

// Import api functionality from ./routes/api_router
app.use(cors());

const api_router = require('./routes/api_router');
// Use the static html and css pages located in ./public
app.use(express.static(path.join(__dirname, 'public')));
app.set
app.use(express.json());


// Use the api functionality
app.use('/api', api_router);

// Start the app, listens for requests on port 8022
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});