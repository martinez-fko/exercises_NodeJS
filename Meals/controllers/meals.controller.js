const { Meal } = require('../models/meal.models');
const { Restaurant } = require('../models/restaurant.models');

//? Utils
const { catchAsync } = require('../utils/catchAsync.util');

//* ===== Create new Meal of the Restaurant ======
const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { quantity, mealId } = req.body;

  const newMeal = await Meal.create({ name, price, restaurantId: id });

  return res.status(200).json({
    status: 'success',
    menssage: 'createMeal',
    data: {
      newMeal,
    },
  });
});

//* ==== Get all meals only active =====
const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: 'active' },
    include: { model: Restaurant, where: { status: 'active' } },
  });

  return res.status(200).json({
    status: 'success',
    data: {
      meals,
    },
  });
});

//* ==== Get meal by Id ======
const getMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    status: 'success',
    data: { meal },
  });
});

//* ==== Update meal ======
const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  return res.status(200).json({
    status: 'success',
    data: { meal },
  });
});

//* ==== Delete Meal =====
const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'inactive' });

  return res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
};
