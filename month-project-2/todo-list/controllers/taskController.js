const Task = require('../models/Task');

exports.createTask = async (req, res) => {
try {
const task = await Task.create({ ...req.body, userId: req.user.id });
res.status(201).json(task);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

exports.getTasks = async (req, res) => {
try {
const tasks = await Task.findAll({ where: { userId: req.user.id } });
res.status(200).json(tasks);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

exports.updateTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findOne({ where: { id, userId: req.user.id } });
if (!task) return res.status(404).json({ message: 'Task not found' });

await task.update(req.body);
res.status(200).json(task);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

exports.deleteTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findOne({ where: { id, userId: req.user.id } });
if (!task) return res.status(404).json({ message: 'Task not found' });

await task.destroy();
res.status(204).json({ message: 'Task deleted' });
} catch (error) {
res.status(500).json({ error: error.message });
}
};
