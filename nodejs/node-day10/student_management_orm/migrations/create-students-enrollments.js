const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const up = async () => {
    await sequelize.getQueryInterface().createTable('StudentsEnrollments', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false
    },
    phone_no: {
    type: DataTypes.STRING,
    allowNull: false
    },
    address: {
    type: DataTypes.STRING,
    allowNull: false
    },
    dept_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Departments',
        key: 'id'
    }
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
    await sequelize.getQueryInterface().dropTable('StudentsEnrollments');
};

module.exports = { up, down };
