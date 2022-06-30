const express = require('express');

// Controllers
const {
  getAllTask,
  getTaskByStatus,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const {
  activeTaskStatus,
  taskExistsById,
} = require('../middlewares/tasks.middleware');

const {
  createTaskValidators,
} = require('../middlewares/validators.middleware');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTask);
tasksRouter.get('/:status', activeTaskStatus, getTaskByStatus);
tasksRouter.post('/', createTaskValidators, createTask);
tasksRouter.patch('/:id', taskExistsById, updateTask);
tasksRouter.delete('/:id', taskExistsById, deleteTask);

module.exports = { tasksRouter };
