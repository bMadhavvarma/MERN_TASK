const Task = require('../models/taskModel');

const taskCreated = (req, res) => {
  const task = req.body;
  if (!task.title || !task.description || !task.status || !task.priority) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }

  if (!["pending", "completed"].includes(task.status)) {
    return res.status(400).json({ message: "Please provide a valid status" });
  }

  if (!["high", "medium", "low"].includes(task.priority)) {
    return res.status(400).json({ message: "Please provide a valid priority" });
  }

  const newTask = new Task(task);
  newTask.save()
    .then(() => {
      res.status(201).json({ message: 'Task created successfully', data: newTask });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error creating task', error });
    });
};

const tasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ message: "Tasks fetched successfully", data: allTasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const deletetask = async (req, res) => {
  const task_id = req.params._id;
  try {
    const task = await Task.findByIdAndDelete(task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully", data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error });
  }
};

const updatetask = async (req, res) => {
  const task_id = req.params._id;
  try {
    const task = await Task.findByIdAndUpdate(task_id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully", data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error });
  }
};

module.exports = {
  taskCreated,
  tasks,
  deletetask,
  updatetask,
};
