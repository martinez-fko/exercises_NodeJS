const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

//* ===== Create Task =====
const createTask = async (req, res) => {
  const { title, userId, startDate, limitDate } = req.body;

  const newTask = await Task.create({
    title,
    userId,
    startDate,
    limitDate,
  });

  try {
    res.status(201).json({
      status: 'success',
      data: {
        newTask,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Get all task with user ======
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User, attributes: ['id', 'name'] }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Get task by Status ======
const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    let statusAvailable = false;

    if (status === 'active') statusAvailable = true;
    if (status === 'completed') statusAvailable = true;
    if (status === 'late') statusAvailable = true;
    if (status === 'cancelled') statusAvailable = true;

    if (!statusAvailable) {
      return res.status(404).json({
        status: 'error',
        message: 'Not found',
      });
    }

    const tasks = await Task.findAll({
      where: { status },
      include: [{ model: User, attributes: ['id', 'name'] }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Update Task ======
const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;
    const { limitDate } = task;
    let status = 'completed';
    const finish = new Date(finishDate);

    if (limitDate < finish) {
      status = 'late';
    }

    await task.update({ finishDate, status });

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* ===== Delete Task =======
const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    await task.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
  deleteTask,
};
