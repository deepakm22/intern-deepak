const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const up = async () => {
    await sequelize.getQueryInterface().createTable('Departments', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    institution: {
    type: DataTypes.STRING,
    allowNull: false
    },
    createdAt: {
    type: DataTypes.DATE,
    allowNull: false
    },
    updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
    }
});
};

const down = async () => {
    await sequelize.getQueryInterface().dropTable('Departments');
};

module.exports = { up, down };
