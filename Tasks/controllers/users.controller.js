const bcrypt = require('bcryptjs');

//* Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

//* ====== Create User ===========
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //* Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //? Remove password from response
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Get all Users ========
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active'},
      attributes: { exclude: ['password'] },
      include: [{ model: Task }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Update User ========
const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    //* res middleware
    const { user } = req;

    await user.update({ name });

    //? Remove password from response
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== delete user / inactive =====
const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'inactive' });

    //? Remove password from response
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
