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
  const { tasks } = req;

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
  const { finishDate } = req.body;
  const task = await Task.findOne({ where: { id } });
  const limitDate = new Date(task.limitDate);
  const finishDateTask = new Date(finishDate);

  if (limitDate > finishDateTask) {
    await task.update({
      finishDate,
      status: 'completed',
    });
  } else {
    await task.update({
      finishDate,
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
