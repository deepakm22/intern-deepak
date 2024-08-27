const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    institution: {
    type: DataTypes.STRING,
    allowNull: false
    }
}, {
    tableName: 'Departments'
});

module.exports = Department;
