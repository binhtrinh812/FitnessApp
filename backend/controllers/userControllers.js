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

const getUserById = async (req, res) => {
  try {
    const auth0Id = req.params.id;

    const user = await User
      .findOne({auth0Id})
    return res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error getting user:', error);
    res.status(500).json({error: 'Error getting user'});
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

const updateUser = async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;    

    const user = await User.findOne({auth0Id});
    
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const resultUpdate = await User.updateOne(
      {auth0Id},
      {
        $set: {
          ...req.body,
          updatedAt: new Date(),
        },
      },
    );

    if (!resultUpdate.acknowledged) {
      return res.status(500).json({error: 'Error updating user'});
    }

    const updatedUser = await User.findOne({auth0Id});
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({error: 'Error updating user'});
  }
}

module.exports = {getCurrentUser, getUserById, createNewUser, updateUser};
