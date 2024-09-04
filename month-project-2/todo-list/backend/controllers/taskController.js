
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, priority, isPinned } = req.body;
        console.log(req.body);
        
        if (!title || !dueDate) {
            return res.status(400).json({ error: 'Title and due date are required' });
        }

        if (isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        console.log("Creating new task..."); 

        const newTask = await Task.create({ 
            title, 
            description, 
            status, 
            dueDate, 
            priority, 
            isPinned,
            userId: req.user.id 
        });

        console.log("Task created successfully:", newTask); 

        return res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error); 
        return res.status(500).json({ error: 'Failed to create task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate, priority, isPinned } = req.body;

        const existingTask = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const updatedTask = await existingTask.update({ 
            title, 
            description, 
            status, 
            dueDate, 
            priority, 
            isPinned 
        });

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        return res.status(200).json({status :'task deleted successfully'});  
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ error: 'Failed to delete task' });
    }


};