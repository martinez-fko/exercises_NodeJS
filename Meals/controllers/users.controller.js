const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const {Order} = require('../models/order.model')

//? Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

//* ====== Login ========
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Wrong credentials', 400));
  }

  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    status: 'success',
    data: { user, token },
  });
});

//* ====== Create new User =======
const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== 'admin' && role !== 'normal') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid role',
    });
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser },
  });
});

//* ==== Update User ======
const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    data: { user },
  });
};

//* ===== Delete User / Inactive
const deleteUser = async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(204).json({
    status: 'succes',
  });
};

//* Get all user orders
const getAllOrders = async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId : sessionUser.id}
  })

   res.status(200).json({
    status: 'success',
    orders
  });
};

//* Get order from user
const getOrder = async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const orders = await Order.findAll({
    where: { userId : sessionUser.id , id }
  })

   res.status(200).json({
    status: 'success',
    orders
  });
};

module.exports = {
  login,
  createUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrder,
};
