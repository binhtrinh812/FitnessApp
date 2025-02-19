const express = require('express');
const app = express();
require('dotenv').config();
const {connectDB} = require('./config/mongoDB.js');
const {checkJwt} = require('./middleware/auth.js');
const {
  getCurrentUser,
  createNewUser,
} = require('./controllers/userControllers.js');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();

app.get('/api/getCurrentUser', checkJwt, getCurrentUser);

app.post(
  '/api/createNewUser',
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  checkJwt,
  createNewUser,
);

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
