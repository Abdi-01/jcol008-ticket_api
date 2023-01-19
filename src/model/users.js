const { Sequelize } = require('sequelize');
const { dbSequelize } = require('../config/db');

const { DataTypes } = Sequelize;

const UsersModel = dbSequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    failed_counter: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

module.exports = UsersModel;