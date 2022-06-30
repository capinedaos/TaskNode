// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllTask = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasks = await Task.findAll({ where: { status } });

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
    startDate: new Date(),
  });

  res.status(201).json({
    status: 'success',
    newTask,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });
  const finishDated = new Date();
  const limitDate = task.limitDate;

  if (finishDated.getTime() - limitDate.getTime() < 0) {
    await task.update({
      finishDated: finishDated,
      status: 'complete',
    });
  } else {
    await task.update({
      finishDated: finishDated,
      status: 'late',
    });
  }

  res.status(201).json({ status: 'success', task });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllTask,
  getTaskByStatus,
  createTask,
  updateTask,
  deleteTask,
};
