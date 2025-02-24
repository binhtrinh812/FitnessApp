const ServiceSaved = require('../models/service_saved');
const Service = require('../models/Service');
const {ObjectId} = require('mongodb');

const saveService = async (req, res) => {
  try {
    const savedService = await ServiceSaved.findOne({
      serviceId: req.body.serviceId,
      userId: req.auth.payload.sub,
    });
    if (savedService) {
      return res.status(400).json({error: 'Service already saved'});
    }
    const resultInsert = await ServiceSaved.insertOne({
      serviceId: req.body.serviceId,
      userId: req.auth.payload.sub,
    });
    if (!resultInsert.acknowledged) {
      return res.status(500).json({error: 'Error saving service'});
    }
    res.status(201).json({message: 'Service saved successfully'});
  } catch (error) {
    res.status(500).json({error: 'Error saving service'});
  }
};

const getSavedServices = async (req, res) => {
  try {
    const savedServices = await ServiceSaved.find({
      userId: req.auth.payload.sub,
    }).toArray();
    const serviceIds = savedServices.map(s => new ObjectId(s.serviceId));
    const services = await Service.find({_id: {$in: serviceIds}}).toArray();

    res.status(200).json(services);
  } catch (error) {
    console.log(error);

    res.status(500).json({error: 'Error fetching saved services'});
  }
};

const deleteSavedService = async (req, res) => {
  try {
    const result = await ServiceSaved.deleteOne({
      serviceId: req.params.serviceId,
      userId: req.auth.payload.sub,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({error: 'Saved service not found'});
    }
    await ServiceSaved.deleteMany({serviceId: req.params.id});
    res.status(200).json({message: 'Saved service deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'Error deleting saved service'});
  }
};

module.exports = {saveService, getSavedServices, deleteSavedService};
