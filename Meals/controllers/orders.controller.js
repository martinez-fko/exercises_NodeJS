const { Meal } = require('../models/meal.models');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.models');

const { catchAsync } = require('../utils/catchAsync.util');

//* ==== Create Order if exists meal =======
const createorder = catchAsync(async (req, res, next) => {
  const { sessionUser, meal } = req;
  const { quantity, mealId } = req.body;

  const totalPrice = quantity * meal.price;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice,
  });

  return res.status(200).json({
    status: ' success',
    data: { newOrder },
  });
});

//* ==== Get all order of user =====
const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: {
      model: Meal,
      include: { model: Restaurant, attributes: ['name', 'address', 'rating'] },
      attributes: ['name', 'price'],
    },
  });

  return res.status(200).json({
    status: ' success',
    data: { orders },
  });
});

//* ===== Update Order ======
const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'Completed'})

  return res.status(200).json({
    status: ' success',
    data: { order },
  });
});
const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'Cancelled'})

  return res.status(200).json({
    status: ' success',
    data: { order },
  });
});

module.exports = {
  createorder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
