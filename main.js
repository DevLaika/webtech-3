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

// register functionality
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('./public/register.html', (req, res) =>
  {res.render('./public/register.html');
  })
app.post('/register', async (req, res) => {
  try{
    const {email, name, password} = await req.body;
    const hash = await bcrypt.hash(password, 10);
    res.status(200); 
    const insert = db.prepare('INSERT INTO users(email, name, password) VALUES(?, ?, ?)');
    insert.run(email, name, hash);
    res.redirect("/login.html");
  }catch(e) {
    console.log(e);
    res.status(500).send('something broke');
  }
});

// login functionality
app.post('/login', async (req, res) => {
  try { 
    const {email, password} = req.body;
    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    const validpass =  await bcrypt.compare(password, row.password);
    if(validpass){
      res.status(200).json('valid login credentials');
    }
  } catch(e){
    console.log(e)
    res.status(500).send('Wrong name or password!');
  }
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the app, listens for requests on port 8022
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
