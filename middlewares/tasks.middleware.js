// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const taskStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasks = await Task.findAll({ where: { status } });
  const statusValues = ['active', 'completed', 'late', 'cancelled'];
  const indexStatus = statusValues.indexOf(req.params.status);

  if (indexStatus === -1) {
    return next(new AppError('Undefined state', 404));
  }

  req.tasks = tasks;
  next();
});

const taskExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (task.status !== 'active') {
    return next(new AppError('Task status is not active', 404));
  }
  req.task = task;
  next();
});

module.exports = { taskStatus, taskExistsById };
