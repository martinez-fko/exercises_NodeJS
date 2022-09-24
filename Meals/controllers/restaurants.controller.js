const { Restaurant } = require('../models/restaurant.models');
const { Review } = require('../models/review.model');

//? Utils
const { catchAsync } = require('../utils/catchAsync.util');

//* ==== Create new Restaurant =====
//ToDo Solo aceptar del 1 al 5 en Rating
const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });
  return res.status(201).json({
    status: 'createRestaurant',
    data: {
      newRestaurant,
    },
  });
});

//* === Get All restaunrants =======
const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: { model: Review },
  });

  return res.status(200).json({
    status: 'success',
    data: { restaurants },
  });
});

//* ===== Get restaurant by Id =====
const getRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'getRestaurant',
    restaurant,
  });
});

//* ===== Update Restaurant ======
const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    data: { restaurant },
  });
});

//* ===== Delete Restaurant =====
const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'inactive' });

  return res.status(204).json({
    status: 'success',
  });
});

//* ====== Create new Review ======
const createReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId } = req.params;
  const { comment, rating } = req.body;

  const newReview = await Review.create({
    userId: sessionUser.id,
    restaurantId,
    comment,
    rating,
  });

  return res.status(200).json({
    status: 'createReview',
    data: { newReview },
  });
});

//* ==== Update Review ======
const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  return res.status(200).json({
    status: 'updateReview',
    data: { review },
  });
});

//* ===== Delete Review ========
const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  return res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  updateReview,
};
