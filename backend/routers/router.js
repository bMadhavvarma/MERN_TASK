const express = require('express');
const router = express.Router();
const {
  taskCreated,
  tasks,
  deletetask,
  updatetask,
} = require('../controllers/task');

// Routes
router.put("/task", taskCreated);
router.get("/tasks", tasks);
router.delete("/taskdelete/:_id", deletetask);
router.put("/taskupdate/:_id", updatetask);

module.exports = router;
