const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Collaborator = sequelize.define('Collaborator', {
    userId: { 
        type: DataTypes.INTEGER, 
        references: { model: 'Users', key: 'id' },
        allowNull: false 
    },
    taskId: { 
        type: DataTypes.INTEGER, 
        references: { model: 'Tasks', key: 'id' },
        allowNull: false 
    }
});

module.exports = Collaborator;
