// controllers/userController.js
const mongoose = require('mongoose');
const User = require('../model/userModel');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    //res.status(201).send(user);
    res.status(201).send({ message: "Usuario creado exitosamente"});

  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserById = async (req, res) => {
  console.log(`Fetching user with ID: ${req.params.id}`);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log('Invalid ID');
    return res.status(400).send({ message: 'Invalid user ID' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
    console.log(`Deleting user with ID: ${req.params.id}`);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ID');
      return res.status(400).send({ message: 'Invalid user ID' });
    }
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        console.log('User not found');
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(400).send(error);
    }
  };

  exports.updateUser = async (req, res) => {
    console.log(`Updating user with ID: ${req.params.id}`);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ID');
      return res.status(400).send({ message: 'Invalid user ID' });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        console.log('User not found');
        return res.status(404).send({ message: 'User no encontrado!' });
      }
      //res.status(200).send(updatedUser);
      res.status(200).send({ message: "Usuario actualizado exitosamente"});
    } catch (error) {
      console.log('Error:', error);
      res.status(400).send(error);
    }
  };
