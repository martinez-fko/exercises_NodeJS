const express = require('express');

//* Controllers
const {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  updateReview,
} = require('../controllers/restaurants.controller');

//? Middlewares
const {
  protectSession,
  protectAdmin,protectReviewsOwners
} = require('../middlewares/auth.middlewares');
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists , reviewExists } = require('../middlewares/restaurants.middleware');

const restaurantsRoutes = express.Router();

restaurantsRoutes.get('/', getAllRestaurants);

restaurantsRoutes.get('/:id', restaurantExists, getRestaurant);

restaurantsRoutes.use(protectSession);

restaurantsRoutes.post('/', createRestaurantValidators, createRestaurant);

restaurantsRoutes.patch(
  '/:id',
  protectAdmin,
  restaurantExists,
  updateRestaurant
);

restaurantsRoutes.delete(
  '/:id',
  protectAdmin,
  restaurantExists,
  deleteRestaurant
);

restaurantsRoutes.post('/reviews/:restaurantId', createReview);

restaurantsRoutes.patch('/reviews/:id', reviewExists , protectReviewsOwners , updateReview);

restaurantsRoutes.delete('/reviews/:id', protectAdmin, reviewExists , protectReviewsOwners , deleteReview);

module.exports = { restaurantsRoutes };
