const express = require('express');
const app = express();
require('dotenv').config();
const {connectDB} = require('./config/mongoDB.js');
const {checkJwt} = require('./middleware/auth.js');
const {getCurrentUser} = require('./controllers/userControllers.js');
var cors = require('cors');
app.use(cors());
connectDB();

app.get(
  '/api/getCurrentUser',
  (req, res, next) => {
    console.log(req.headers);
    next();
  },
  checkJwt,
  getCurrentUser,
);

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
