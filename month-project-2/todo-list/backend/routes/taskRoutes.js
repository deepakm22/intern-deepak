const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authenticateToken, createTask);
router.get('/get', authenticateToken, getTasks);
router.put('/update/:id', authenticateToken, updateTask);
router.delete('/delete/:id', authenticateToken, deleteTask);

module.exports = router;