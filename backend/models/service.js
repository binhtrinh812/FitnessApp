const {client} = require('../config/mongoDB.js');

const db = client.db('mydatabase');
const Service = db.collection('services'); // Collection 'services'

module.exports = Service;
