const {client} = require('../config/mongoDB.js');

const db = client.db('mydatabase');
const User = db.collection('users'); // Collection 'users'

module.exports = User;
