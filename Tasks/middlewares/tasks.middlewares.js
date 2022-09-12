const { Task } = require('../models/task.model');

const taskExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Not found',
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isActive = async (req, res, next) => {
  try {
    const { task } = req;

    const { status } = task;

    if (status != 'active') {
      return res.status(404).json({
        status: 'Error',
        message: 'Not found',
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  taskExists,
  isActive,
};
