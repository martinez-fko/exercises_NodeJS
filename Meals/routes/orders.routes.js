const express = require('express');

const {
  createorder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller');

//*  Middlewares
const { protectSession ,protectOrdersOwners } = require('../middlewares/auth.middlewares');
const { mealExistsInOrder } = require('../middlewares/meals.middlewares');
const {OrderExists} = require('../middlewares/orders.middlewares')

const ordersRoutes = express.Router();

ordersRoutes.use(protectSession);

ordersRoutes.post('/', mealExistsInOrder, createorder);

ordersRoutes.get('/me', getAllOrders);

ordersRoutes.patch('/:id', OrderExists, protectOrdersOwners , updateOrder);

ordersRoutes.delete('/:id', OrderExists, protectOrdersOwners, deleteOrder);

module.exports = { ordersRoutes };
