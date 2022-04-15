const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const sqliteStoreFactory = require('express-session-sqlite')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 8022;
// const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const SqliteStore = sqliteStoreFactory.default(session);

// Import api functionality from ./routes/api_router
app.use(cors());

app.use(session({
  store: new SqliteStore({
    driver: sqlite3.Database,
    path: "./sessionstore.db",
    ttl: 1234
  }),
  secret: "webtech-secret",
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

app.use(cookieParser());

const api_router = require('./routes/api_router');
const { ppid } = require('process');
const res = require('express/lib/response');

// Use the static html and css pages located in ./public
app.use(express.static(path.join(__dirname, 'public')));
app.set;
app.use(express.json());



// Use the api functionality
app.use('/api', api_router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the app, listens for requests on port 8022
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
