require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//cors Requirement and fixation
const cors = require('cors');
const path = require('path');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Connection string to MongoDB
const uri =
  'mongodb+srv://faysaljafry:faisal0341!@vuejs.yelyi.mongodb.net/CubeSurvey?retryWrites=true&w=majority';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => console.log(err));

// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use this after the variable declaration
//Adding following code to App.js will enable the system to serve on
//Static Ports. This will help heroku to serve pages easily

app.use(express.static(path.join(__dirname, './dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});
// routes
app.get('/', (req, res) => {
  res.send('Express Server for Survey Application');
});
//Route for Admin Login
app.post('/login?', (req, res) => {
  const EMAIL = 'faysaljafry@gmail.com';
  const PASSWORD = '12345';
  console.log('The Body is', req.body);
  const { email, password } = req.body;
  if (email === EMAIL && password === PASSWORD) {
    const user = {
      id: 1,
      name: 'Muhammad Faisal',
      email: 'faysaljafry@gmail.com',
      isAuthenticated: true,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    res.json({
      token,
      user,
    });
  } else {
    res.status(404);
    res.json({
      message: 'Wrong Login Information',
    });
  }
});
const port = process.env.PORT;
//start server
app.listen(port, () => {
  console.log(`listeniing at port: ${port}`);
});
