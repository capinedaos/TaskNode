// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const activeTaskStatus = catchAsync(async (req, res, next) => {

  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });
  
  if (task.status !== 'active') {
    return next(new AppError('Task status is not active', 404));
  }

  req.task = task;
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

module.exports = { activeTaskStatus, taskExistsById };
