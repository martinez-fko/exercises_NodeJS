const express = require('express');

//* import Controllers Users
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

//* middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
