const {client} = require('../config/mongoDB.js');

const db = client.db('mydatabase');
const ServiceSaved = db.collection('serviceSaveds'); // Collection 'serviceSaveds'

module.exports = ServiceSaved;
