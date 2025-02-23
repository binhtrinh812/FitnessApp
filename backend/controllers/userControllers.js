const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const getCurrentUser = async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;

    const user = await User.findOne({auth0Id});

    return res.status(201).json(user);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({error: 'Error creating user'});
  }
};

const createNewUser = async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const idToken = req.body.idToken;
    const auth0_user = jwt.decode(idToken);
    if (auth0_user.sub !== auth0Id) {
      return res.status(401).json({error: 'Invalid token'});
    }

    const user = await User.findOne({auth0Id});
    if (!user) {
      const resultInsert = await User.insertOne({
        auth0Id,
        nickname: auth0_user.nickname,
        email: auth0_user.email,
        picture: auth0_user.picture,
      });
      if (!resultInsert.acknowledged) {
        return res.status(500).json({error: 'Error creating user'});
      }
      const newUser = await User.findOne({auth0Id});
      return res.status(201).json(newUser);
    }

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({error: 'Error creating user'});
  }
};

module.exports = {getCurrentUser, createNewUser};
