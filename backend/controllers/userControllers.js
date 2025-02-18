const User = require('../models/user.js');

const getCurrentUser = async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;

    const user = await User.findOne({auth0Id});
    if (!user) {
      const resultInsert = await User.insertOne({auth0Id});
      if (!resultInsert.acknowledged) {
        return res.status(500).json({error: 'Error creating user'});
      }
      const newUser = await User.findOne({auth0Id});
      return res.status(201).json(newUser);
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({error: 'Error creating user'});
  }
};

module.exports = {getCurrentUser};
