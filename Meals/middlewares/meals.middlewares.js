const { Meal } = require('../models/meal.models');
const { Restaurant } = require('../models/restaurant.models');

//? Utils
const { catchAsync } = require('../utils/catchAsync.util');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: 'active' },
    include: { model: Restaurant, where: { status: 'active' } },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal not found',
    });
  }

  req.meal = meal;
  next();
});

const mealExistsInOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: { id : mealId, status: 'active' },
    include: { model: Restaurant, where: { status: 'active' } },
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal not found',
    });
  }

  req.meal = meal;
  next();
});

module.exports = { mealExists, mealExistsInOrder };
