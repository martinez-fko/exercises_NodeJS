const express = require('express');

//* import Controllers Users
const {
  createTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

//* Middleware
const { taskExists, isActive } = require('../middlewares/tasks.middlewares');

const tasksRouter = express.Router();

tasksRouter.post('/', createTask);

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', getTasksByStatus);

tasksRouter.patch('/:id', taskExists, isActive, updateTask);

tasksRouter.delete('/:id',taskExists, deleteTask);

module.exports = {
  tasksRouter,
};
