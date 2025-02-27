const Service = require('../models/service');
const {ObjectId} = require('mongodb');

const createService = async (req, res) => {
  try {
    const resultInsert = await Service.insertOne({
      ...req.body,
      images: req.imageUrls || [],
      userId: req.auth.payload.sub,
    });
    if (!resultInsert.acknowledged) {
      return res.status(500).json({error: 'Error creating service'});
    }
    const newService = await Service.findOne({userId: req.auth.payload.sub});
    return res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({error: 'Error creating service'});
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      userId: req.auth.payload.sub,
    }).toArray();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({error: 'Error fetching services'});
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).toArray();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({error: 'Error fetching all services'});
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: new ObjectId(req.params.id),
      userId: req.auth.payload.sub,
    });
    if (!service) {
      return res.status(404).json({error: 'Service not found'});
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({error: 'Error fetching service'});
  }
};

const getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({
      category: req.params.category,
    }).toArray();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({error: 'Error fetching services by category'});
  }
};

const updateService = async (req, res) => {
  try {
    const imagesUrls = req.imageUrls ? req.imageUrls.push(req.body.imageUrls) : req.body.imageUrls;
    
    const updatedService = await Service.findOneAndUpdate(
      {_id: new ObjectId(req.params.id), userId: req.auth.payload.sub},
      {$set: {...req.body, images: imagesUrls}},
      {returnDocument: 'after'},
    );
    if (!updatedService) {
      return res.status(404).json({error: 'Service not found'});
    }
    return res.status(200).json(updatedService);
  } catch (error) {
    return res.status(500).json({error: 'Error updating service'});
  }
};

const deleteService = async (req, res) => {
  try {
    const result = await Service.deleteOne({
      _id: new ObjectId(req.params.id),
      userId: req.auth.payload.sub,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({error: 'Service not found'});
    }
    res.status(200).json({message: 'Service deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'Error deleting service'});
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getAllServices,
  getServicesByCategory,
};
