const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium"
  }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
