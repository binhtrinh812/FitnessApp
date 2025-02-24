const express = require('express');
const app = express();
require('dotenv').config();
const {upload, uploadMultipleToCloudinary} = require('./middleware/upload.js');
const {connectDB} = require('./config/mongoDB.js');
const {checkJwt} = require('./middleware/auth.js');
const {
  getCurrentUser,
  createNewUser,
} = require('./controllers/userControllers.js');
var cors = require('cors');
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  getAllServices,
  getServicesByCategory,
  deleteService,
} = require('./controllers/serviceControllers.js');

const {
  saveService,
  getSavedServices,
  deleteSavedService,
} = require('./controllers/serviceSavedControllers');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();

app.get('/api/getCurrentUser', checkJwt, getCurrentUser);

app.post('/api/createNewUser', checkJwt, createNewUser);

app.post(
  '/api/services',
  checkJwt,
  upload.array('images', 5),
  uploadMultipleToCloudinary,
  createService,
);
app.get('/api/services', checkJwt, getServices);
app.get('/api/services/all', getAllServices);
app.get('/api/services/category/:category', getServicesByCategory);
app.get('/api/services/:id', checkJwt, getServiceById);
app.put(
  '/api/services/:id',
  checkJwt,
  upload.array('images', 5),
  uploadMultipleToCloudinary,
  updateService,
);
app.delete('/api/services/:id', checkJwt, deleteService);

// CRD Routes for saved services
app.post('/api/service-saved', checkJwt, saveService);
app.get('/api/service-saved', checkJwt, getSavedServices);
app.delete('/api/service-saved/:serviceId', checkJwt, deleteSavedService);

app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
