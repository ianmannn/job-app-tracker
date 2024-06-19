const express = require('express');
const userController = require('../controllers/userController');
const db = require('../models/userModels');

const routerSignup = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE

routerSignup.get('/', async (req, res) => {
  console.log('GET request to /users');
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

routerSignup.post(
  '/signup',
  userController.hashing,
  userController.createUser,
  (req, res) => {
    console.log('back in router');
    return res.status(200).json(res.locals.createdUser);
  }
);

routerSignup.post('/login', userController.verifyUser, (req, res) => {
  console.log(res.locals.loginPassword + ' end middleware');
  sessionStorage.username = res.locals.userName;
  return res.status(200).json({ message: 'Login successful' });
});
// ADD GET MORE CHARACTERS ROUTE HANDLER HERE

module.exports = routerSignup;
