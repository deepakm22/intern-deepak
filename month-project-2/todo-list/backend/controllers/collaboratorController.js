// controllers/collaboratorController.js
const { User } = require('../models/User');
const { Task } = require('../models/Task');
const { Collaborator } = require('../models/Collaborator');

// Add a collaborator to a task
const addCollaborator = async (req, res) => {
    try {
        const { taskId, collaboratorId } = req.body;

        // Fetch the task and user (collaborator) to ensure they exist
        const task = await Task.findByPk(taskId);
        const collaborator = await User.findByPk(collaboratorId);

        if (!task || !collaborator) {
            return res.status(404).json({ error: 'Task or Collaborator not found' });
        }

        // Add collaborator to the task
        await task.addCollaborator(collaborator);
        
        return res.status(201).json({ message: 'Collaborator added successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add collaborator', details: error.message });
    }
};

// Get collaborators for a specific task
const getCollaborators = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findByPk(taskId, {
            include: [{ model: User, as: 'Collaborators', attributes: ['id', 'name', 'email'] }]
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task.Collaborators);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve collaborators', details: error.message });
    }
};

module.exports = { addCollaborator, getCollaborators };
