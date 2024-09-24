// models/Collaborator.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Ensure correct path
const Task = require('./Task'); // Ensure correct path

const Collaborator = sequelize.define('Collaborator', {});

// Define relationships
Task.belongsToMany(User, { through: Collaborator, as: 'Collaborators' });
User.belongsToMany(Task, { through: Collaborator });

module.exports = Collaborator;
