const express = require('express');

const {
  createMeal,
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

//? Middlewares
const {
  createMealValidators,
} = require('../middlewares/validators.middleware');
const { protectSession , protectAdmin } = require('../middlewares/auth.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { mealExists } = require('../middlewares/meals.middlewares');

const mealsRoutes = express.Router();

mealsRoutes.get('/', getAllMeals);

mealsRoutes.get('/:id', mealExists, getMeal);

mealsRoutes.use(protectSession);

mealsRoutes.post('/:id', createMealValidators, restaurantExists, createMeal);

mealsRoutes.patch('/:id', protectAdmin, mealExists, updateMeal);

mealsRoutes.delete('/:id', protectAdmin, mealExists, deleteMeal);

module.exports = {
  mealsRoutes,
};
