const express = require('express');

//? Controllers
const {
  createUser,
  deleteUser,
  getAllOrders,
  getOrder,
  login,
  updateUser,
} = require('../controllers/users.controller');

//? Middlewares
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');
const {
  protectSession,
  protectUsersAccount,
} = require('../middlewares/auth.middlewares');
const { userExists } = require('../middlewares/users.middlewares');

const usersRoutes = express.Router();

usersRoutes.post('/signup', createUserValidators, createUser);

usersRoutes.post('/login', login);

usersRoutes.use(protectSession);

usersRoutes.patch('/:id', userExists, protectUsersAccount, updateUser);

usersRoutes.delete('/:id', userExists, protectUsersAccount, deleteUser);

usersRoutes.get('/orders', getAllOrders);

usersRoutes.get('/orders/:id', getOrder);

module.exports = { usersRoutes };
