const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./department');

const StudentsEnrollment = sequelize.define('StudentsEnrollment', {
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
    model: Department,
    key: 'id'
    }
    }
}, {
    tableName: 'StudentsEnrollments'
});

module.exports = StudentsEnrollment;
